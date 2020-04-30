import React from 'react';
import {Route,Redirect, Switch} from 'react-router-dom';
import EquipmentList from './EquipmentList';
import EquipmentDetail from './EquipmentDetail';

const Equipment = ({match}) => {
    return (
        <Switch>
            <Route path={`${match.url}/list`} component={EquipmentList}/>
            <Route path={`${match.url}/:deviceId`} component={EquipmentDetail}/>
            <Redirect from={`${match.url}/`} to={`${match.url}/list`} />
        </Switch>
    );
};

export default Equipment;

