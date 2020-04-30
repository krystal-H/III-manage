import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Card, Button, Modal } from 'antd'
import ProductDetailInfo from '../../businessdata/Product/ProductDetailInfo'
import { actionCreators } from './store';
import ProductAuditRadio from './ProductAuditRadio'

class AuditRelease extends Component {
    componentDidMount() {
        const { productId, id } = this.props.match.params;

        // 获取产品
        this.props.getAuditData({ productId, id })
    }

    // 审核
    handleAudit = () => {
        const { id } = this.props.match.params;
        const _this = this;
        Modal.confirm({
            width: 520,
            title: '提交审核',
            centered: true,
            okText: "确定",
            cancelText: "取消",
            maskClosable: true,
            content: (
                <ProductAuditRadio ref={(refDadio) => _this.refDadio = refDadio} />
            ),
            onOk() {
                _this.props.updateAuditStatus({ id, ..._this.refDadio.state })
            },
            onCancel(){}
        });
    }

    render() {
        const { productId } = this.props.match.params;
        const { auditDetail } = this.props;
        const { statu, statuName, remark } = auditDetail;

        return (
            <div className="product-audit">
                <Card>
                    <h2 className="title" >发布产品</h2>
                    <Button type="primary" className="btn-back" onClick={() => this.props.history.go(-1)}>返回</Button>
                </Card>
                <Card>
                    <ProductDetailInfo productId={productId} audit={statu} clearProductInfo={this.props.clearProductInfo}/>
                </Card>
                {
                    statu === 0 ?
                        <Button type="primary" style={{ float: "right", margin: "20px 20px 20px 0" }} onClick={this.handleAudit}>审核</Button>
                        :
                        <Card>
                            <h3>审核状态</h3>
                            <div className="info-item">
                                <span className="label">审核结果：</span>
                                <span>{statuName}</span>
                            </div>
                            {
                                statu === 2 ?
                                    <div className="info-item">
                                        <span className="label">驳回说明：</span>
                                        <span>{ remark || '--'}</span>
                                    </div>
                                    : null
                            }

                        </Card>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auditDetail: state.getIn(["productAudit", "auditDetail"]).toJS(),
})

const mapDispatchToProps = (dispatch) => ({
    getAuditData: (params) => {
        return dispatch(actionCreators.getAuditInfo(params))
    },
    updateAuditStatus: (params) => {
        return dispatch(actionCreators.updateAuditStatus(params))
    },
    clearProductInfo: () => dispatch(actionCreators.clearProductInfo())
})

export default connect(mapStateToProps, mapDispatchToProps)(AuditRelease)