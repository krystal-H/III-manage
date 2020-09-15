import * as React from 'react';
import { Input, Button, Modal, Tooltip, Select } from 'antd';
import TitleTab from '../../../components/TitleTab';
import Table from '../../../components/Table';
import RoleEdit from './RoleEdit';
import axios from '../../../util/api.request';

const TitleOption = TitleTab.Option;
export default class TagList extends React.Component{
  
    constructor(props){
        super(props);
        this.state = {
            labelList:[],
            labelName:'',
            labelType:null,
            pager:{},
            visible: false,
            editData:{labelType:0},
        };

        this.columns = [
            { title: "标签名称", dataIndex: "labelName"},
            { title: "英文名", dataIndex: "labelNameEn"},
            { title: "类型", dataIndex: "labelType",render:(text)=>({'0':'基础','1':'复合'}[text])},
            { title: "备注", dataIndex: "remark"},
            {
                title: "操作", width: "150px", render: (item) => (
                    <div className="action">
                        <Tooltip placement="top" title="编辑">
                            <Button icon="edit" shape="circle" size="small" onClick={this.openModal.bind(this, item)}/>
                        </Tooltip>
                        &nbsp; | &nbsp;
                        <Tooltip placement="top" title="删除">
                            <Button icon="delete" shape="circle" size="small" onClick={this.handleDel.bind(this, item.labelId)}/>
                        </Tooltip>
                    </div>
                )
            },
        ];
    }
    componentDidMount=()=>{
        this.getLabelList();
    }
    getLabelList=(pageIndex = 1)=>{
        let {labelName,labelType} = this.state;
        let param = {
            pageIndex,pageRows:10,
        }
        if(labelName){
            param.labelName=labelName;
        }
        if(labelType!==null){
            param.labelType=labelType;
        }
        axios.Get('/manage-open/thing/label/getList',param).then((res) => {
            let result = res.data&&res.data.data;
            this.setState({
                labelList:result.list,
                pager:result.pager
            })
        });

    }
    // 修改筛选条件
    handleChange = (e) => {
        this.setState({
            labelName: e.target.value
        });
    }
    handleChangeType = (val) => {
        this.setState({
            labelType: val
        });
    }

    // 重置
    handleReset = () => {
        this.setState({
            labelName: "",
            labelType:null
        }, () => {
            this.getLabelList();
            this.refInpt.setState({ value: "" });
        });
    }
    openModal=(data)=>{
        this.setState({visible:true,editData:data});
    }

    // 删除
    handleDel = (labelId) => {
        let _this =this;
        Modal.confirm({
            title: "提示",
            content: "是否确认删除？",
            onOk() {
                console.log("确认删除");
                axios.Get('/manage-open/thing/label/delete',{labelId}).then((res) => {
                    _this.getLabelList();
                });
            }
        });
    }

    // 关闭
    handleCancel = () => {
        this.setState({
            visible: false
        });
    }

    render() {
        const {labelList,visible,labelType,pager,editData } =this.state;

        return (
            <div className="role-manage">
                <TitleTab title="物标签">
                    <TitleOption label="标签类型">
                      <Select style={{ width: 160 }} value={labelType} onChange={this.handleChangeType}>
                        <Select.Option value={0}>基础标签</Select.Option>
                        <Select.Option value={1}>复合标签</Select.Option>
                      </Select>
                    </TitleOption>
                    <TitleOption label="标签名称">
                        <Input style={{ width: 240 }} maxLength={20} name="roleName" onChange={this.handleChange} onPressEnter={this.getLabelList.bind(this,1)}
                            ref={((refInpt) => this.refInpt = refInpt)} placeholder="输入物标签名称" />
                    </TitleOption>
                    <TitleOption>
                        <Button type="primary" onClick={this.getLabelList.bind(this,1)}>查询</Button>
                    </TitleOption>
                    <TitleOption>
                        <Button type="primary" onClick={this.handleReset}>重置</Button>
                    </TitleOption>
                    <TitleOption align="right">
                        <Button type="primary" onClick={this.openModal.bind(this, {})}>新建</Button>
                    </TitleOption>
                </TitleTab>
                <div className="role-content" style={{backgroundColor:'#fff'}}>
                    <Table rowKey={"labelId"} columns={this.columns} dataSource={labelList} pager={pager} onPageChange={this.getLabelList} />
                </div>

                <RoleEdit visible={visible} editData={editData} handleCancel={this.handleCancel} getLabelList={this.getLabelList}/>
            </div>
        );
    }
}