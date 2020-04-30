import React from 'react'
import {connect} from 'react-redux'
import { Card, Button, Tabs } from 'antd'
import ProductDetailInfo from './ProductDetailInfo'
import ProductDetailService from './ProductDetailService';
import { actionCreators } from './store';

const { TabPane } = Tabs;

const ProductDetail = (props) => {
    const { productId } = props.match.params;
    return (
        <div className="product">
            <Card >
                <Button type="primary" className="btn-back" onClick={() => props.history.go(-1)}>返回</Button>
                <Tabs defaultActiveKey="1" size="large">
                    <TabPane tab="产品信息" key="1">
                       <ProductDetailInfo productId={productId} clearProductInfo={props.clearProductInfo}/>
                    </TabPane>
                    <TabPane tab="产品服务" key="2">
                       <ProductDetailService productId={productId} />
                    </TabPane>
                </Tabs>
            </Card>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    clearProductInfo: () => dispatch(actionCreators.clearProductInfo())
})

export default connect(null, mapDispatchToProps)(ProductDetail)
