import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Input, Button, Select, notification, Divider, Modal, Form, Tooltip } from 'antd';
import { actionCreators } from './store';
import { NavLink } from 'react-router-dom';
import TableCom from '../../../components/Table';
import TitleTab from '../../../components/TitleTab';
import TableHOC from '../../../components/TableHOC';
import './equipmentList.less';

const selectList = [
    {
        id:1,
        text:'设备id',
    },
    {
        id:2,
        text:'物理地址',
    },
    {
        id:3,
        text:'设备分类',
    },
];
const FormItem = Form.Item;

class EquipmentList extends Component {
    state = {
        type:null,//选择查询条件ID
        param:null,//查询条件值
        labelKey:null,//标签key
        labelValue:null,//标签value
        loading:false,//antd的loading控制，
        query: {}
    }
    //列表配置数据
    column = [
        { title: "设备ID", dataIndex: 'deviceUniqueId', key: 'deviceUniqueId', width: "140px" },
        { title: "物理地址", dataIndex: 'deviceMac', key: 'deviceMac', width: "140px" },
        { title: "产品", dataIndex: 'productName', key: 'productName', width: "20%" },
        { title: "所属分类", dataIndex: 'productType', key: 'productType', width: "30%"},
        { title: "类型", dataIndex: 'productClass', key: 'productClass', render: text => <span>{text==0?'普通设备':text==1?'普通设备':'--'}</span>, width: "12%" },
        { title: "操作", dataIndex: 'deviceId', key: 'operation', width: "12%",
         render: (text,record) => 
         (
            <span>
                <Tooltip placement="top" title="查看">
                    <Button shape="circle" size="small" icon="info" key={0} onClick={this.handleDetail.bind(this, text)} />
                </Tooltip>
                &nbsp; | &nbsp;
                <Tooltip placement="top" title="删除">
                    <Button shape="circle" size="small" icon="delete" key={0} onClick={this.delete.bind(this,record.deviceUniqueId)} />
                </Tooltip>
            </span>
         )}
    ]
    handleDetail = (id) => {
        this.props.history.push(`./${id}`);
    }

    notification = (title,str) => {
        notification.open({
            message: title||'提示',
            description:str||'',
        });
    }

    onFilter = (e) => {
        e.preventDefault();
        const { deviceVersionTypeList, validateFieldsAndScroll } = this.props.form;
        validateFieldsAndScroll((err, values) => {
            let { type, param, labelKey, labelValue } = values;
            // if(type&&!param){
            //     this.notification('','请输入查询条件！');
            //     return false;
            // }
            if(!type&&param){
                this.notification('','请选择查询条件！');
                return false;
            }
            // if(labelKey&&!labelValue){
            //     this.notification('','请输入value值！');
            //     return false;
            // }
            if(!labelKey&&labelValue){
                this.notification('','请输入key值！');
                return false;
            }
            this.props.onFilter();
        });
    }

    //设备删除
    delete = (deviceUniqueId) => {
        const _this = this;
        let pageIndex = _this.state.pageIndex||1;
        let {totalRows} = _this.props.pager;
        pageIndex = (totalRows % ((pageIndex-1)*10))>1?pageIndex:pageIndex-1;
        Modal.confirm({
            title: "提示",
            content: "删除设备后，将会同步删除设备绑定信息是否确认删除？",
            onOk() {
                _this.props.equipmentDelete({deviceUniqueId}).then((res) => {
                    if(res&&res.code==0){
                        _this.props.onFilter();
                    }
                });
            }
        });
    }
    render() {
        let { param, labelKey, labelValue, type, loading } = this.state;
        let { equipmentList, pager, form } = this.props;
        const {getFieldDecorator} = form;
        return (
            <div className="equipment_list">
                <TitleTab title='设备管理'>
                <Form layout="inline">
                        <FormItem>
                            {
                                getFieldDecorator("type")(
                                    <Select style={{ width: 160 }} placeholder="请选择查询条件">
                                        {
                                            selectList.map((item,index)=>{
                                                return <Select.Option key={item.text+index} value={item.id}>{item.text}</Select.Option>;
                                            })
                                        }
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator("param")(
                                    <Input style={{ width: 160 }} maxLength={20} placeholder='请输入查询条件' />
                                )
                            }
                        </FormItem>
                        <FormItem label='设备标签'>
                            {
                                getFieldDecorator("labelKey")(
                                    <Input style={{ width: 160 }} maxLength={20} placeholder='请输入标签Key'/>
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator("labelValue")(
                                    <Input style={{ width: 160 }} maxLength={20} placeholder='请输入标签Value'/>
                                )
                            }
                        </FormItem>
                        <FormItem>
                            <Button className="modelSearch" type="primary" htmlType="submit" onClick={this.onFilter}>查询</Button>
                        </FormItem>
                        <FormItem>
                            <Button className="modelSearch" type="primary" onClick={this.props.onReset}>重置</Button>
                        </FormItem>
                    </Form>
                </TitleTab>
                <div className="account-content">
                    <Card>
                        <TableCom rowKey={"equipmentId"} columns={this.column} dataSource={equipmentList} pager={pager} onPageChange={this.props.onChange} loading={loading} />
                    </Card>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    equipmentList: state.getIn(['equipment', 'equipmentList']).toJS(),
    pager: state.getIn(['equipment', 'pager']).toJS(),
});

const mapDispatchToProps = (dispatch) => ({
    getList: (pager) => {
        return dispatch(actionCreators.getEquipmentListFunc(pager));
    },
    equipmentDelete: (id) => {
        return dispatch(actionCreators.equipmentDeleteFunc(id));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(TableHOC(EquipmentList)));