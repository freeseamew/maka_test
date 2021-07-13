import { Restivus } from 'meteor/maka:rest';


Items = new Mongo.Collection('items');
Articles = new Mongo.Collection('articles');

if (Meteor.isServer) {
  // Global API configuration
  const Api = new Restivus({
    useDefaultAuth: true,
    prettyJson: true,
    auth: {
      token: 'auth.apiKey',
      user: function () {
        return {
          userId: this.request.headers['user-id'],
          token: this.request.headers['login-token']
        };
      }
    },
    defaultHeaders: {
      'Content-Type': 'application/json'
    },
    onLoggedIn() {
      console.log(this.user.username + ' (' + this.userId + ') logged in');
    },
    onLoggedOut() {
      console.log(this.user.username + ' (' + this.userId + ') logged out');
    },    
  });

  // Generates: GET, POST on /api/items and GET, PUT, PATCH, DELETE on
  // /api/items/:id for the Items collection
  Api.addCollection(Items);

  // Generates: POST on /api/users and GET, DELETE /api/users/:id for
  // Meteor.users collection
  Api.addCollection(Meteor.users, {
    excludedEndpoints: ['getAll', 'put'],
    routeOptions: {
      authRequired: true
    },
    endpoints: {
      post: {
        authRequired: false
      },
      delete: {
        roleRequired: 'admin'
      }
    }
  });

  // Maps to: /api/articles/:id
  Api.addRoute('articles/:id', {authRequired: true}, {
    get() {
      return Articles.findOne(this.urlParams.id);
    },
    delete: {
      roleRequired: ['author', 'admin'],
      action() {
        if (Articles.remove(this.urlParams.id)) {
          return {status: 'success', data: {message: 'Article removed'}};
        }
        return {
          statusCode: 404,
          body: {status: 'fail', message: 'Article not found'}
        };
      }
    }
  });
}