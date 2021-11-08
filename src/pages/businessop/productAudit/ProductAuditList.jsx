import React, { Component } from "react";
import { Button, Select, Form, Card, Input, Modal, Tooltip } from "antd";
import { DateTool } from "../../../util/utils";
import { connect } from 'react-redux';
import ProductAuditRadio from './ProductAuditRadio'
import { actionCreators } from "./store";
import TableCom from '../../../components/Table';
import TitleTab from '../../../components/TitleTab';
import TableHOC from '../../../components/TableHOC';

const FormItem = Form.Item;

const modeList = {
    0: '待审核',
    1: '通过',
    2: '未通过'
}

class ProductAuditList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            serviceList: [],
            loading: false,
            totalRows: "",
            pageIndex: "",
            oldParams: {},
            query: {}
        };
    }

    // 审核
    handleAudit = (item) => {
        const _this = this;
        Modal.confirm({
            width: 520,
            title: item.typeName + '审核',
            centered: true,
            okText: "确定",
            cancelText: "取消",
            maskClosable: true,
            content: (
                <ProductAuditRadio ref={(refDadio) => _this.refDadio = refDadio} />
            ),
            onOk() {
                _this.props.updateAuditStatus({ id: item.id, ..._this.refDadio.state })
            },
            onCancel() { }
        });
    }

    // 查看
    handleClick = (url) => {
        this.props.history.push(url);
    }

    render() {
        const columns = [
            { title: '产品ID', dataIndex: 'productId', key: 'productId', render: (text) => <span title={text}>{text}</span> },
            { title: '产品名称', dataIndex: 'productName', key: 'productName', render: (text) => <span title={text}>{text}</span> },
            { title: '发布用户', dataIndex: 'email', key: 'email', render: (text) => <span title={text}>{text}</span> },
            { title: '审核类型', dataIndex: 'typeName', key: 'typeName', render: (text) => <span title={text}>{text}</span> },
            {
                title: '状态', key: 'statuName', width: "120px", render: (item) => {
                    const color = ["#0000FF", "#333333", "#D9001B"];
                    return <span style={{ color: `${color[item.statu]}` }}>{item.statuName}</span>
                }
            },
            {
                title: '申请时间', dataIndex: 'createTime', key: 'createTime',
                render: (item) => {
                    let timeStr = DateTool.utc2beijing(item, "yyyy-MM-dd hh:mm:ss")
                    return <span title={timeStr}>{timeStr}</span>
                }
            },
            {
                title: '操作', key: 'operation', width: "140px",
                render: (item) => {
                    return (
                        <div>
                             <Tooltip placement="top" title="审核">
                                <Button icon="file-done" shape="circle" size="small" type={item.statu === 0 ? "primary" : undefined } onClick={item.statu === 0 ? this.handleAudit.bind(this, item) : null}/>
                            </Tooltip>
                            &nbsp;&nbsp;
                            <Tooltip placement="top" title="查看">
                                <Button icon="info" shape="circle" size="small" onClick={this.handleClick.bind(this, `./${item.productId}/${item.id}`)}/>
                            </Tooltip>
                        </div>
                    )
                }
            }
        ];
        const { getFieldDecorator } = this.props.form;
        const { productAuditList, pager, loading } = this.props;
        return (
            <div className="ProductAuditContent">
                <TitleTab title="产品审核">
                    <Form layout="inline">
                        <FormItem label="产品ID">
                            {getFieldDecorator('productId', {
                                getValueFromEvent: (e) => {
                                    const val = e.target.value;
                                    return val.replace(/[^\d]/g, '');
                                }
                            })(
                                <Input placeholder="请输入产品ID" maxLength={9} style={{ width: 240 }} onPressEnter={this.props.onFilter}></Input>
                            )}
                        </FormItem>
                        <FormItem label="状态">
                            {getFieldDecorator('statu')(
                                <Select style={{ width: 160 }} placeholder="请选择状态">
                                    {
                                        Object.keys(modeList).map((item, index) => (
                                            <Select.Option key={index} value={+item}>
                                                {modeList[item]}
                                            </Select.Option>
                                        ))
                                    }
                                </Select>
                            )}
                        </FormItem>

                        <FormItem>
                            <Button type="primary" onClick={this.props.onFilter} >查询</Button>
                        </FormItem>
                        <FormItem style={{ marginBottom: "0" }}>
                            <Button onClick={this.props.onReset}>重置</Button>
                        </FormItem>
                    </Form>
                </TitleTab>
                <Card className="ProductAuditContent_Table" style={{ marginTop: 10 }}>
                    <TableCom rowKey="id" bordered columns={columns} dataSource={productAuditList} pager={pager}
                        onPageChange={this.props.onChange} loading={loading} />
                </Card>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    productAuditList: state.getIn(["productAudit", "productAuditList"]).toJS(),
    pager: state.getIn(["productAudit", "pager"]).toJS(),
    loading: state.getIn(["productAudit", "loading"]),
})

const mapDispatchToProps = (dispatch) => ({
    getList: (pager) => {
        return dispatch(actionCreators.getAuditList(pager))
    },
    updateAuditStatus: (params) => dispatch(actionCreators.updateAuditStatus(params))
})


export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(TableHOC(ProductAuditList)));
