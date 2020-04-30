import React, { Component } from 'react'
import { Table, Icon, Popover } from 'antd'
import { connect } from 'react-redux'
import {actionCreators} from './store'

const dataTypeList = {
    1: '字符',
    2: '数值',
    3: '枚举',
    4: '布尔',
    5: '绝对时间',
    6: '相对时间',
    7: '循环时间',
    8: 'RGB颜色',
    9: '二进制'
}

const statusList = {
    0: '草稿',
    1: '已发布',
    2: '删除'
}


class ProductDetailService extends Component{
    AppColumns = [
        { title: "页面名称", dataIndex: "projectName", width: "20%"},
        { title: "状态", width: "10%", render: (item) => {
            return item.projectStatus ? (item.isGray ? "灰度版本" : '正式') : '草稿';
        }},
        { title: "升级APP", dataIndex: "appName", width: "10%", render: (item) => {
            return item || '--'
        }},
        { title: "状态更新时间", dataIndex: "modifyTime", width: "20%"},
        { title: "链接", dataIndex: "qrcode", width: "20%", render: (item) => (
            <Popover trigger="hover" placement="left" content={(
                item ? <img src={item} width={120} height={120}/> : 
                null
            )}>
                <Icon type="qrcode" style={{fontSize: '32px'}}/>
            </Popover>
        )},
    ];

    CloudColumns = [
        { title: "功能名称", width: "20%", key: "serviceName", render:(item) => {
            const obj = {
                children: item.serviceName,
                props: {}
            };
            if(item.len){
                obj.props.rowSpan = item.len;
            }else{
                obj.props.rowSpan = 0;
            }
            return obj;
        }},
        { title: "关联协议", dataIndex: "propertyName", width: "20%"},
        { title: "协议数据标识", dataIndex: "property", width: "20%"},
        { title: "协议数据类型", dataIndex: "functionDataType", width: "20%", render: (functionDataType) => {
            return dataTypeList[functionDataType] || ''
        }},
        { title: "状态", width: "15%", key: "status", render: (item) => {
            const obj = {
                children: statusList[item.status] || '',
                props: {}
            };
            if(item.len){
                obj.props.rowSpan = item.len;
            }else{
                obj.props.rowSpan = 0;
            }
            return obj;
        }},
    ];

    componentDidMount(){
        const {productId} = this.props;
        this.props.getProductService(productId);
    }

    render(){
        const { productService } = this.props;
        return (
            <div className="product-info">
                <div className="info-item app-list">
                    <h3>APP控制服务</h3>
                    <Table bordered rowKey="projectId" columns={this.AppColumns} dataSource={productService.appProjectList || []} scroll={{ y: 300, x: 1000 }} />
                </div>
                <div className="info-item cloud-list">
                    <h3>云端定时服务</h3>
                    <Table bordered rowKey="property" columns={this.CloudColumns} dataSource={productService.timerServiceList || []} scroll={{ y: 300, x: 1000 }} />
                </div>
              </div> 
        )
    }
}

const mapStateToProps = (state) => ({
    productService: state.getIn(["product", "productService"]).toJS()

})

const mapDispatchToProps = (dispatch) => ({
    getProductService: (productId) => {
        dispatch(actionCreators.getProductService(productId))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailService)