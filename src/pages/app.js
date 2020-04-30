import React, { Component } from 'react';
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import BaseLayout from './layouts/BaseLayout'
import Login from './login/Login'
import { Provider } from 'react-redux';
import store from '../store';
import Loading from '../components/loading/Loading';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Loading />
          <Switch>
            <Route path='/login' exact component={Login}></Route>
            <Route path='/' component={BaseLayout}></Route>
          </Switch>
        </Router>
      </Provider>
    )
  }
}
