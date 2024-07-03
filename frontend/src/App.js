import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CustomerRegister from './CustomerRegister';
import AdminRegister from './AdminRegister';
import Login from './Login';
import VerifyEmail from './VerifyEmail';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/register/customer" component={CustomerRegister} />
        <Route path="/register/admin" component={AdminRegister} />
        <Route path="/login" component={Login} />
        <Route path="/verify-email" component={VerifyEmail} />
      </Switch>
    </Router>
  );
};

export default App;
