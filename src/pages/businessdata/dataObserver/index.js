import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import DataObserverList from './dataObserverList'
import DataObserverAdd  from './dataObserverAdd'
import DataObserverDetail from './dataObserverDetail'
import {PrivateRoute} from '../../../routes/PrivateRoute'

export default ({match}) => {
  return (
    <Switch>
      <PrivateRoute exact path={`${match.url}/list`} component={DataObserverList} />
      <PrivateRoute exact path={`${match.url}/add/:id`}  component={DataObserverAdd} />
      <PrivateRoute exact path={`${match.url}/detail/:id`} component={DataObserverDetail} />
      <Redirect from={`${match.url}`} to={`${match.url}/list`} ></Redirect>
    </Switch>
  )
}