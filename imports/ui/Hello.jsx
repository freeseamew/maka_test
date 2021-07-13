import React, { useState } from 'react';
// import Meteor from 'meteor/meteor';

export const Hello = () => {
  const [counter, setCounter] = useState(0);

  const increment = () => {
    setCounter(counter + 1);
  };

  const onLogin = () => {
    Meteor.loginWithPassword('admin@admin.com', '1234', (error) => {
      if(error) console.log(error);
    })
  }

  const onLogout = () => {
    Meteor.logout();
  }

  return (
    <div>
      <button onClick={onLogin}>Login</button>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};
