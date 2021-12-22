import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import SceneLibList from './sceneLibList'

const SchemManagement = ({ match }) => {
  return (
    <Switch>
      <Route path={`${match.url}/list`} component={SceneLibList} />
      <Redirect from={`${match.url}/`} to={`${match.url}/list`} />
    </Switch>
  )
}

export default SchemManagement