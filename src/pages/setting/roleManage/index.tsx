import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import RoleList from './RoleList';
import "./style.less";

const SubAccount = ({ match }: any) => {
    return (
        <Switch>
            <Route exact path={`${match.url}/list`} component={RoleList} />
            <Redirect from={`${match.url}/`} to={`${match.url}/list`} />
        </Switch>
    );
};

export default SubAccount;

