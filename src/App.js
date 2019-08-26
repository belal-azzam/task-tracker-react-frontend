import React from 'react';
import './App.css';
import TasksPanel from "./components/tasks/TasksPanel.component";
import Message from "./components/general/Message.component";
import Sidenav from "./components/general/Sidenav.component";
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import Login from './components/auth/Login.component';
import Register from './components/auth/Register.component';
import store from "./store";
import jwt_decode from "jwt-decode";

import {Provider} from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from './components/auth/PrivateRoute.component';
import {logout, setAuthUserData} from "./state/users/actions";

// Check for token to keep user logged in
if (localStorage.authToken && localStorage.authToken != 'undefined') {

    // Set auth token header auth
    const token = localStorage.authToken;
    const decoded = jwt_decode(token);
    // Set user and isAuthenticated
    store.dispatch(setAuthUserData({token}));
// Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logout());
        // Redirect to login
        window.location.href = "./login";
    }
}
function App() {
  return (
      <Provider store={store}>
          <Router>
                <div className="App">
                    <Sidenav/>
                    <div id="content">
                        <Message />
                        <Switch>
                            <PrivateRoute exact path="/" component={TasksPanel} />
                        </Switch>
                        <Route path='/login' component={Login}/>
                        <Route path='/register' component={Register}/>
                    </div>

                </div>
          </Router>
      </Provider>
  );
}

export default App;
