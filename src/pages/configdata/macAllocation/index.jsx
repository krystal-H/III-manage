import React from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'
import MacList from './macList'
import MacDetailList from './macDetailList'
import './style.less'

const MacAllocation = ({match}) => {
    return (
        <Switch>
            <Route path={`${match.url}/list`} component={MacList}/>
            <Route path={`${match.url}/:hetModuleTypeId/:productCode`} component={MacDetailList} />
            <Redirect from={`${match.url}/`} to={`${match.url}/list`} />
        </Switch>
    )
}

export default MacAllocation