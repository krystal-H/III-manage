import React from 'react'
import { connect } from 'react-redux'
import {Card} from 'antd'
import './style.less'
import ProductCategoryList from './ProductCategoryList';

class ProductCategory extends React.Component{
    state = {
        first:  0,
        second: 0
    }

    changeState = (val) => {
        let _this = this;
        return (active) => {
            console.log(active)
            if(val == "first"){
                _this.setState({
                    second: 0
                })
            }
            _this.setState({
                [val]: active,
            })
        }
    }


    render(){
        const {first, second} = this.state;
        const {allCategoryList} = this.props;
        const allList = Array.from(allCategoryList) || [];
        const subCategoryList = allList[first] ? allList[first].subCategoryList || [] : [];
        const deviceTypeList = subCategoryList[second] ? subCategoryList[second].deviceTypeList || [] : [];

        return (
            <div>
                <Card >
                    <Card.Meta title="产品类目" description="硬件产品的形态分类，开放平台接入产品，终端APP绑定设备时可获取类目数据。" />
                </Card>
                <div className="product-categroy" >
                    <div style={{display: "inline-block"}}>
                        <ProductCategoryList type="top" list={allList} sub={subCategoryList} active={first} name="categoryName" id="categoryId" onChange={this.changeState("first")}/>
                        <ProductCategoryList list={subCategoryList} sub={deviceTypeList} active={second} name="subCategoryName" id="subCategoryId" onChange={this.changeState("second")}/>
                        <ProductCategoryList list={deviceTypeList} name="deviceTypeName" id="deviceTypeId"/>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    let allCategoryList = state.getIn(['globalDeviceInfo', 'deviceCategoryList'])
    return {
        allCategoryList,
    }
}
export default connect(mapStateToProps)(ProductCategory)