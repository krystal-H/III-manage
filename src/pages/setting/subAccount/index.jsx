import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import SubAccountList from './SubAccountList'
import "./style.less"

const SubAccount = ({ match }) => {
    return (
        <Switch>
            <Route exact path={`${match.url}/list`} component={SubAccountList} />
            {/* <Route exact path={`${match.url}/:modelId`} component={PositionModelEdit} /> */}
            <Redirect from={`${match.url}/`} to={`${match.url}/list`} />
        </Switch>
    )
}

export default SubAccount

