import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import AccountList from './AccountList';
import AccountDetail from './AccountDetail';
import AccountEdit from './AccountEdit';
import "./style.less";

const AccountManage = ({ match }) => {
    return (
        <Switch>
            <Route exact path={`${match.url}/list`} component={AccountList} />
            <Route exact path={`${match.url}/edit/:id`} component={AccountEdit} />
            <Route exact path={`${match.url}/:id`} component={AccountDetail} />
            <Redirect from={`${match.url}/`} to={`${match.url}/list`} />
        </Switch>
    );
};

export default AccountManage;

