import React from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'
import ProductAuditList from './ProductAuditList'
import AuditRelease from './AuditRelease'
import ScrollTopHOC from '../../../components/ScrollTopHOC';
import './style.less';

const ProductAudit = ({match}) => {
    return (
        <Switch>
            <Route path={`${match.url}/list`} component={ProductAuditList}/>
            <Route path={`${match.url}/:productId/:id`} component={ScrollTopHOC(AuditRelease)}/>
            <Redirect from={`${match.url}/`} to={`${match.url}/list`} />
        </Switch>
    )
}

export default ProductAudit