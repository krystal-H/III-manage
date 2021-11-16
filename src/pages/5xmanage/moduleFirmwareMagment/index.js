import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import ModuleList from './moduleList'

const SchemManagement = ({ match }) => {
    return (
        <Switch>
            <Route path={`${match.url}/list`} component={ModuleList}/>
            <Redirect from={`${match.url}/`} to={`${match.url}/list`} />
        </Switch>
    )
}

export default SchemManagement