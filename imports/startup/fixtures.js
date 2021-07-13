import { Accounts } from 'meteor/accounts-base';

Meteor.setTimeout(() => {

  if(Meteor.users.find().count() === 0) {
    console.log('user create');

    const userValue = {
      email: 'admin@admin.com',
      password: '1234',
      // profile: { role: 'ADMIN' }
    }

    Accounts.createUser(userValue);

  }
  else {
    console.log(`user count: ${Meteor.users.find().count()}`);
  }
}, 3000);