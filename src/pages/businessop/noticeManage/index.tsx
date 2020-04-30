import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import NoticeList from './NoticeList';
import NoticeEdit from './NoticeEdit';
import NoticeView from './NoticeView';
import ScrollTopHOC from '../../../components/ScrollTopHOC';
import "./style.less";

const SubAccount = ({ match }: any) => {
    return (
        <Switch>
            <Route exact path={`${match.url}/list`} component={NoticeList} />
            <Route exact path={`${match.url}/view/:noticeId`} component={NoticeView} />
            <Route exact path={`${match.url}/:noticeId`} component={ScrollTopHOC(NoticeEdit)} />
            <Redirect from={`${match.url}/`} to={`${match.url}/list`} />
        </Switch>
    );
};

export default SubAccount;

