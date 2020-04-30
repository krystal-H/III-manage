import * as React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import UserList from './UserList';
import UserEdit from './UserEdit';
import ScrollTopHOC from '../../../components/ScrollTopHOC';
import "./style.less";

const InterfaceUser = ({ match }: any) => {
    return (
        <Switch>
            <Route exact path={`${match.url}/list`} component={UserList} />
            <Route exact path={`${match.url}/:userId`} component={ScrollTopHOC(UserEdit)} />
            <Redirect from={`${match.url}/`} to={`${match.url}/list`} />
        </Switch>
    );
};

export default InterfaceUser;

