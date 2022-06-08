import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import List from './list'
import Detail  from './info'
import {PrivateRoute} from '../../../routes/PrivateRoute'

export default ({match}) => {
  return (
    <Switch>
      <PrivateRoute exact path={`${match.url}/list`} component={List} />
      {/* <PrivateRoute exact path={`${match.url}/detail/:id`}  component={Detail} /> */}
      <Redirect from={`${match.url}`} to={`${match.url}/list`} ></Redirect>
    </Switch>
  )
}