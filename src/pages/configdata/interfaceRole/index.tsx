import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import RoleList from './RoleList';
import RoleEdit from './RoleEdit';
import "./style.less";
import ScrollTopHOC from '../../../components/ScrollTopHOC';

const InterfaceUser = ({ match }: any) => {
    return (
        <Switch>
            <Route exact path={`${match.url}/list`} component={RoleList} />
            <Route exact path={`${match.url}/:roleId`} component={ScrollTopHOC(RoleEdit)} />
            <Redirect from={`${match.url}/`} to={`${match.url}/list`} />
        </Switch>
    );
};

export default InterfaceUser;

