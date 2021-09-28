import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import SchemeList from './schemeList'

const SchemManagement = ({ match }) => {
    return (
        <Switch>
            <Route path={`${match.url}/list`} component={SchemeList}/>
            {/* <Route path={`${match.url}/:id`} component={SchemeDetail}/> */}
            <Redirect from={`${match.url}/`} to={`${match.url}/list`} />
        </Switch>
    );
}

export default SchemManagement