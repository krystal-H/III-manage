import React from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'
import ProductList from './ProductList'
import ProductDetail from './ProductDetail'
import ScrollTopHOC from '../../../components/ScrollTopHOC';
import './style.less'

const Product = ({match}) => {
    return (
        <Switch>
            <Route path={`${match.url}/list`} component={ProductList}/>
            <Route path={`${match.url}/:productId`} component={ScrollTopHOC(ProductDetail)}/>
            <Redirect from={`${match.url}/`} to={`${match.url}/list`} />
        </Switch>
    )
}

export default Product

