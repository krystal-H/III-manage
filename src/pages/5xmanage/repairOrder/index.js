import React from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'
import OrderList from './list'
import OrderInfo from './detail'
import ScrollTopHOC from '../../../components/ScrollTopHOC';
// import './style.less';

const ProductAudit = ({match}) => {
    return (
        <Switch>
            <Route path={`${match.url}/list`} component={OrderList}/>
            {/* <Route path={`${match.url}/:productId/:id`} component={ScrollTopHOC(OrderInfo)}/> */}
            <Redirect from={`${match.url}/`} to={`${match.url}/list`} />
        </Switch>
    )
}

export default ProductAudit