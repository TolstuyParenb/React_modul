import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from './components/ui/navBar';
import Main from './layouts/main';
import Login from './layouts/login';
import Users from './layouts/users';

function App() {
  return (
    <>
      <div>
        <NavBar />
        <Switch>
          <Route path='/login:type?'component={Login}/>
          <Route path='/users/:userId?'component={Users}/>
          <Route path='/' component={Main}/>
        </Switch>
      </div>

    </>
  );
}

export default App;
