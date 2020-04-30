import React from 'react';
import { connect } from 'react-redux';
import { Select, Button, Card, notification, Tooltip, Form } from 'antd';
import TitleTab from '../../../components/TitleTab';
import Table from '../../../components/Table';
import { actionCreators } from './store';
import MacApply from './macApply';
import MacAdd from './macAdd';
import { DateTool } from "../../../util/utils";
import TableHOC from '../../../components/TableHOC';

const Option = Select.Option;

class MacList extends React.Component {
    state = {
        loading: false,
        moduleId: "",
        query: {},
        visible: false,
        macItem: null,
        addVisible: false
    }

    // 跳转详情页
    handleDetail = (macItem) => {
        const { hetModuleTypeId, productCode } = macItem;
        this.props.history.push(`./${hetModuleTypeId}/${productCode}`);
    }

    // 打开mac分配
    handleEdit = (macItem) => {
        this.setState({
            visible: true,
            macItem
        });
    }

    // 关闭分配mac
    onCancel = () => {
        this.setState({
            macItem: null,
            visible: false
        });
    }

    // 打开新增mac
    handleAdd = () => {
        this.setState({
            addVisible: true
        });
    }

    // 关闭新增mac
    handleAddCancel = () => {
        this.setState({
            addVisible: false
        });
    }

    // 请求分配
    onOk = (params) => {
        console.log("----", params);
        this.props.macAllocation(params).then(res => {
            if (res) {
                notification.success({
                    message: "分配成功",
                    duration: 3
                });
                this.props.onChange(1);
                this.onCancel();
            }
           
        });
    }

    // 请求新增
    handleAddMac = (params) => {
        this.props.addMac(params).then(res => {
            if (res) {
                notification.success({
                    message: "新增MAC成功",
                    duration: 3
                });
                this.props.onChange(1);
                this.handleAddCancel();
            }
        });
    }

    componentDidMount() {
        // this.onChange();
        this.props.getModuleList();
    }

    render() {
        const { moduleId, visible, macItem, addVisible } = this.state;
        const { macList, pager, moduleList, form, loading } = this.props;
        const { getFieldDecorator } = form;
        const columns = [
            { title: '模组型号', dataIndex: 'hetName', width: '15%', render: (text) => <span title={text}>{text}</span> },
            { title: 'MAC地址（第4字节）', dataIndex: 'productCode', width: '10%', className: "th-break" },
            { title: <span title="起始MAC">起始MAC</span>, dataIndex: 'macBegin', width: '125px', render: (text) => <span title={text}>{text}</span> },
            { title: <span title="结束MAC">结束MAC</span>, dataIndex: 'macEnd', width: '125px', render: (text) => <span title={text}>{text}</span>  },
            { title: 'MAC总量', dataIndex: 'maxinumAvailable', width: '10%' },
            { title: '已分配数', dataIndex: 'quantityAllocated', width: '10%' },
            { title: '未分配数', dataIndex: 'remainAllocated', width: '10%' },
            {
                title: '修改时间', dataIndex: 'updateTime', width: '15%', className: "th-break", render: (item) => {
                    let timeStr = DateTool.utc2beijing(item, "yyyy-MM-dd hh:mm:ss");
                    return <span title={timeStr}>{timeStr}</span>;
                }
            },
            {
                title: '创建时间', dataIndex: 'createTime', width: '15%', className: "th-break", render: (item) => {
                    let timeStr = DateTool.utc2beijing(item, "yyyy-MM-dd hh:mm:ss");
                    return <span title={timeStr}>{timeStr}</span>;
                }
            },
            {
                title: '操作', width: '120px', fixed: 'right', render: (item) => (
                    <div className="action">
                        <Tooltip placement="top" title="分配">
                            <Button icon="apartment" shape="circle" size="small" onClick={this.handleEdit.bind(this, item)}/>
                        </Tooltip>
                        &nbsp; | &nbsp;
                        <Tooltip placement="top" title="查看">
                            <Button icon="info" shape="circle" size="small" onClick={this.handleDetail.bind(this, item)}/>
                        </Tooltip>
                    </div>
                )
            },
        ];
        return (
            <div className="macList">
                <TitleTab title="和而泰MAC分配" >
                    <Form layout="inline">
                        <Form.Item label="模组型号">
                            {getFieldDecorator("hetModuleTypeId")(
                                <Select style={{ width: 240 }} placeholder="请选择模组型号" >
                                    <Option key="" value=''>全部</Option>
                                    {
                                        moduleList.map(item => (
                                            <Option value={item.moduleId} key={item.moduleId}>{item.hetModuleTypeName}</Option>
                                        ))
                                    }
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" onClick={this.props.onFilter}>查询</Button>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" onClick={this.props.onReset}>重置</Button>
                        </Form.Item>
                        <Form.Item style={{float: "right"}}>
                            <Button type="primary" onClick={this.handleAdd} >新建</Button>
                        </Form.Item>
                    </Form>
                </TitleTab>

                <Card>
                    <Table rowKey="macAllocationId" columns={columns} dataSource={macList} pager={pager} onPageChange={this.props.onChange} loading={loading}
                        scroll={{x: 1200, y: 'auto'}} />
                </Card>

                {/* 分配 */}
                <MacApply
                    visible={visible}
                    macItem={macItem}
                    onCancel={this.onCancel}
                    onOk={this.onOk}
                />
                {/* 添加 */}
                <MacAdd
                    visible={addVisible}
                    moduleList={moduleList}
                    onCancel={this.handleAddCancel}
                    onOk={this.handleAddMac}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    macList: state.getIn(["macAllocation", "macList"]).toJS(),
    pager: state.getIn(["macAllocation", "pager"]).toJS(),
    moduleList: state.getIn(["macAllocation", "moduleList"]).toJS(),
    loading: state.getIn(["macAllocation", "loading"]),
});

const mapDispatchToProps = (dispatch) => ({
    getList: (params) => dispatch(actionCreators.getMacList(params)),
    getModuleList: () => dispatch(actionCreators.getModuleList()),
    macAllocation: (params) => dispatch(actionCreators.macAllocation(params)),
    addMac: (params) => dispatch(actionCreators.addMac(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(TableHOC(MacList)));