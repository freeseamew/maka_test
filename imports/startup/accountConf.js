import { Accounts } from 'meteor/accounts-base';

Accounts.onLogin(() => {
  console.log('login...');
});

Accounts.onLoginFailure(() => {
  console.log('login fail');
});

Accounts.onLogout(() => {
  console.log('logout...');
})