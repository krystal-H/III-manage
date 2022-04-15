import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import List from './list'
import Log  from './sceneLog'
import {PrivateRoute} from '../../../routes/PrivateRoute'

export default ({match}) => {
  return (
    <Switch>
      <PrivateRoute exact path={`${match.url}/list`} component={List} />
      <PrivateRoute exact path={`${match.url}/log`}  component={Log} />
      <Redirect from={`${match.url}`} to={`${match.url}/list`} ></Redirect>
    </Switch>
  )
}