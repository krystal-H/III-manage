import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import './PositionModel.less'
import PositionModelList from './PositionModelList'
import PositionModelEdit from './PositionModelEdit'
import ScrollTopHOC from '../../../components/ScrollTopHOC';

const PositionModel = ({ match }) => {
    return (
        <Switch>
            <Route exact path={`${match.url}/list`} component={PositionModelList} />
            <Route exact path={`${match.url}/:modelId`} component={ScrollTopHOC(PositionModelEdit)} />
            <Redirect from={`${match.url}/`} to={`${match.url}/list`} />
        </Switch>
    )
}

export default PositionModel

