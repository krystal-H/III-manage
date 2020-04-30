import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import { Input, Icon, Tooltip, Card, Button, Popconfirm, Table } from 'antd';
import TableCom from '../../../components/Table';
import './equipmentDetailTag.less';


class EquipmentDetailTag extends Component{
    state = {
        editKey:'',//编辑时 ，保存得key 用于取消时替换数据
        editValue:'',//编辑时 ，保存得value 用于取消时替换数据
        loading:false,
    };
    columns = [
        {
            title: '标签Key-描述',
            key: 'labelKey',
            dataIndex: 'labelKey',
            width: "30%",
            render:(text, record, index)  => (
                record.edit?<Input placeholder="请输入标签Key,20字符以内" maxLength={20} value={record.labelKey} onChange={this.changeTag.bind(this,2,index)} />:<span>{record.labelKey}</span>
            )
        },
        {
            title: '标签Value-描述',
            key: 'labelValue',
            dataIndex: 'labelValue',
            width: "30%",
            render:(text, record, index)  => (
                record.edit?<Input placeholder="请输入标签value,20字符以内" maxLength={20} value={record.labelValue} onChange={this.changeTag.bind(this,3,index)} />:<span>{record.labelValue}</span>
            )
        },
        {
            title: '标签类型',
            key: 'labelCategory',
            dataIndex: 'labelCategory',
            width: "30%",
            render:labelCategory => (
                <span>
                    { labelCategory==0?'用户定义':labelCategory==1?'系统默认':labelCategory==2?'后台定义':'' }
                </span>
            )
        },
    ];
    columns0 = [...this.columns, {title: '', key: 'action', width: '10%', render: () => <span></span>}]
    columns1 = [...this.columns, {
        title: '操作',
        key: 'action',
        width: "10%",
        render: (text, record, index) => (
            record.labelCategory==2?
                record.edit?//1:编辑 2:key 3:value 4:取消 5:删除 6:保存
                <span>
                    <Tooltip placement="top" title='保存'>
                        {
                            record.add?
                            <Icon className='icon' type="check-circle" theme="twoTone" onClick={this.changeTag.bind(this,8,index)} />
                            :
                            <Icon className='icon' type="check-circle" theme="twoTone" onClick={this.changeTag.bind(this,6,index)} />
                        }
                    </Tooltip>
                    <Popconfirm 
                        title="你确定要取消编辑该标签吗？"
                        onConfirm={this.changeTag.bind(this,record.add?7:4,index)}
                        okText="是"
                        cancelText="否"
                        placement="topRight"
                    >
                        <Tooltip placement="top" title='取消'>
                            {
                                record.add?
                                <Icon className='icon' type="close-circle" theme="twoTone"  />
                                :
                                <Icon className='icon' type="close-circle" theme="twoTone" />
                            }
                        </Tooltip>
                    </Popconfirm>
                </span>
                :<span>
                    <Tooltip placement="top" title='编辑'>
                        <Icon className='icon' type="edit" theme="twoTone" onClick={this.changeTag.bind(this,1,index)}/>
                    </Tooltip>
                    <Tooltip placement="top" title='删除'>
                        <Popconfirm 
                            title="你确定要删除该标签吗？"
                            onConfirm={this.changeTag.bind(this,5,index)}
                            okText="是"
                            cancelText="否"
                            placement="topRight"
                        >
                            <Icon className='icon' type="delete" theme="twoTone"/>
                        </Popconfirm>
                    </Tooltip>
                </span>
                :null
        ),
    }]
    
    componentDidMount(){
        this.onChange();
        let params={ deviceId:this.props.deviceId, pageRows:10, pageIndex: 1, defaultLabel: 1 };
        this.props.getEquipmentDefaultLabel(params);
    }

    changeTag(type,index,e){//1:启动编辑 2:key 3:value 4:编辑-取消 5:删除 6:编辑-保存 7:添加时的取消 8:新建保存保存
        let deviceId = this.props.deviceId;
        let { editKey, editValue} = this.state;
        let labelList = this.props.labelList;
        let item = labelList[index];
        if(type==1){
            item.edit = true;
            this.setState({
                editKey:item.labelKey,
                editValue:item.labelValue
            });
        }else if(type==2){
            item.labelKey = e.target.value;
            this.props.setEquipmentLabelList(labelList);
        }else if(type==3){
            item.labelValue = e.target.value;
            this.props.setEquipmentLabelList(labelList);
        }else if(type==4){
            item.labelKey = editKey;
            item.labelValue = editValue;
            item.edit = false;
            this.props.setEquipmentLabelList(labelList);
        }else if(type==5){
            this.props.equipmentLabelDelete({labelId:item.id}).then(() => {
                let { totalRows, pageIndex } = this.props.labelPager;
                    pageIndex = (totalRows % ((pageIndex-1)*10))>1?pageIndex:pageIndex-1;
                this.onChange(pageIndex);
            });
        }else if(type==6){
            this.props.equipmentLabelUpdate({labelId:item.id, labelKey:item.labelKey, labelValue:item.labelValue }).then(() => {
                this.onChange(this.props.labelPager.pageIndex);
            });
        }else if(type==7){
            labelList.splice(index,1);
            this.props.setEquipmentLabelList(labelList);
        }else if(type==8){
            this.props.equipmentLabelAdd({deviceId, labelKey:item.labelKey, labelValue:item.labelValue}).then((res) => {
                if(res){
                    this.onChange();   
                }
            });
        }
    }
    //翻页
    onChange = (pageIndex=1) => {
        let params={ deviceId:this.props.deviceId, pageRows:10, pageIndex };
        this.setState({ loading: true },()=>{
            this.props.getEquipmentLabelList(params).then(() => {
                this.setState({ loading: false });
            });
        });
    }
    addLable = () => {
        let labelList = this.props.labelList;
        labelList.push({edit:true,labelCategory:2,add:true});
        this.props.setEquipmentLabelList(labelList);
    }
    render(){
        let { loading } = this.state;
        let { labelList, labelPager, defaultLabel } = this.props;
        return (
            <div className="equipmentDetailTag">
                <Card>
                    <h3>默认设备标签：</h3>
                    <Table columns={this.columns0} dataSource={defaultLabel} rowKey={"labelKey"} bordered pagination={false}/>
                    <h3 className="table-com">自定义设备标签：</h3>
                    <TableCom columns={this.columns1} dataSource={labelList}  rowKey={"id"} pager={labelPager} onPageChange={this.onChange} loading={loading} />
                    <Button className='plusLable' type="primary" icon="plus" onClick={this.addLable} >添加标签</Button>
                </Card>
            </div> 
        );
    }
}

const mapStateToProps = (state) => ({
    defaultLabel: state.getIn(["equipment", "defaultLabel"]).toJS(),
    labelList: state.getIn(["equipment", "labelList"]).toJS(),
    labelPager: state.getIn(["equipment", "labelPager"]).toJS()
});

const mapDispatchToProps = (dispatch) => ({
    getEquipmentLabelList: (params) => {
        return dispatch(actionCreators.getEquipmentLabelListFunc(params));
    },
    setEquipmentLabelList: (labelList) => {
        return dispatch(actionCreators.setEquipmentLabelList(labelList));
    },
    equipmentLabelAdd: (params) => {
        return dispatch(actionCreators.equipmentLabelAddFunc(params));
    },
    equipmentLabelDelete: (params) => {
        return dispatch(actionCreators.equipmentLabelDeleteFunc(params));
    },
    equipmentLabelUpdate: (params) => {
        return dispatch(actionCreators.equipmentLabelUpdateFunc(params));
    },
    getEquipmentDefaultLabel: (params) => {
        return dispatch(actionCreators.getEquipmentDefaultLabel(params));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(EquipmentDetailTag);