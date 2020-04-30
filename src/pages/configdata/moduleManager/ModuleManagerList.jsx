import React, { Component, Fragment } from 'react';
import { Card, Form, Input, Button, Select, Table, Tooltip, Modal, message } from 'antd';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { actionCreators } from './store';
import { DateTool } from "../../../util/utils";
import { ModuleListRequest, ModuleReleaseRequest, ModuleDeleteRequest } from '../../../apis/moduleManager';
import { ViewModuleInfo } from './ViewModuleInfo';
import './ModuleManagerList.less';
import TableCom from '../../../components/Table';
import { Pager } from '../../../util/utils';

const { Option } = Select;
const { Meta } = Card;
const { confirm } = Modal;

@withRouter
class ModuleManagerList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            moduleList: [],
            loading: false,
            pagination: {},
            oldparams: {},
            pager: {}
        }
    }

    // 网络请求
    componentDidMount() {
        let params = {
            pageIndex: 1,
            moduleType: "",
            hetModuleTypeName: "",
            pageRows: 10,
        }
        const { getBindSceneList, getAllModuleBrandList, getModuleTypeMenuAction } = this.props;
        // 获取模组列表
        this.getModuleList(params);
        // 获取厂家菜单
        getAllModuleBrandList();
        // 获取绑定场景
        getBindSceneList();
        // 获取模组公共菜单
        getModuleTypeMenuAction();
    }

    // 获取模组列表
    getModuleList = (params) => {
        this.setState({ loading: true, oldparams: params })
        ModuleListRequest(params).then(res => {
            let code = res.data.code
            if (code === 0) {
                // console.log("获取模组列表成功");
                let data = res.data.data.list;
                // 数据源需要唯一的key,用index不靠谱
                data.map((item, index) => {
                    item["key"] = item.moduleId;
                })
                let pagination = Pager.pagination(res.data.data.pager, this.paginationChange)
                // 提升性能
                this.setState(() => ({
                    moduleList: data,
                    pagination: pagination,
                    pager: res.data.data.pager
                }))
            }
        }).finally(
            () => {
                this.setState(() => ({
                    loading: false,
                }))
            }
        )
    }

    // 初始化通信方式的子选项
    generateOptions = (communicationMethodList) => {
        if (!communicationMethodList) {
            return;
        }

        return communicationMethodList.map((item, index) => (
            <Option value={item.moduleType} key={item.moduleType}>{item.moduleTypeName}</Option>
        ))
    }

    // 搜索按钮触发,默认请求第一页的数据
    searchClick = () => {
        const { oldparams } = this.state;
        this.props.form.validateFields((err, values) => {
            // console.log("搜索的内容：",values);
            let params = {
                ...oldparams,
                ...values,
                pageIndex: 1,
            }
            // console.log("搜索请求参数：",params)
            this.getModuleList(params);
        });
    }

    // 添加模组触发
    addModule = () => {
        this.props.history.push({ pathname: `/config/ModuleManager/add/` })
    }

    // 重置按钮触发
    reset = () => {
        this.props.form.resetFields();
    }

    // 具体发布操作
    releaseOperation = (moduleId, releaseStatus) => {
        ModuleReleaseRequest(moduleId, releaseStatus).then(res => {
            let code = res.data.code
            if (code === 0) {
                // console.log("发布接口成功");
                const { oldparams } = this.state;
                this.getModuleList(oldparams);
            }
        })
    }

    // 具体删除操作
    deleteOperation = (moduleId) => {
        ModuleDeleteRequest(moduleId).then(res => {
            let code = res.data.code
            if (code === 0) {
                // console.log("删除接口成功");
                const { oldparams } = this.state;
                this.getModuleList(oldparams);
            }
        })
    }

    // 具体下线操作
    OfflineOperataion = (moduleId, releaseStatus) => {
        ModuleReleaseRequest(moduleId, releaseStatus).then(res => {
            let code = res.data.code
            if (code === 0) {
                // console.log("下线接口成功");
                const { oldparams } = this.state;
                this.getModuleList(oldparams);
            }
        })
    }

    // 初始化表格按钮方法1
    generateOperationBtn = (record) => {
        if (record.releaseStatus === 1) {
            let btnarr = this.releaseBtnArr();
            return btnarr.map((item, index) => (
                this.createOperationBtn(item, record)
            ))
        } else {
            let btnarr = this.unReleaseBtnArr();
            return btnarr.map((item, index) => (
                this.createOperationBtn(item, record)
            ))
        }
    }

    // 初始化表格按钮方法2
    createOperationBtn = (item, record) => {
        return (
            <Tooltip key={item.key} placement="top" title={item.title}>
                <Button style={{ marginLeft: "10px" }}
                    shape="circle"
                    size="small"
                    icon={item.icon}
                    key={item.templateId}
                    onClick={() => this.handleOperation(item, record)}
                />
            </Tooltip>)
    }

    // 已上线操作按钮的数据源
    releaseBtnArr = () => {
        return [
            { title: "查看", icon: "info", key: 'View' },
            { title: "下线", icon: "cloud-download", key: 'Offline' },
        ];
    }
    // 未发布操作按钮数据源
    unReleaseBtnArr = () => {
        return [
            { title: "发布", icon: "cloud-upload", key: 'release' },
            { title: "编辑", icon: "edit", key: 'edit' },
            { title: "删除", icon: "delete", key: 'delete' }
        ];
    }

    // 分页选择触发
    paginationChange = (current) => {
        this.setState({ pageIndex: current })
        console.log("分页选择了：", current);
        const { oldparams } = this.state;
        let params = {
            ...oldparams,
            pageIndex: current,
        }
        this.getModuleList(params)
    }

    // 列表中的按钮点击触发
    handleOperation = (item, record) => {
        switch (item.key) {
            case "View":
                this.props.getModuleInfoPreview(record.moduleId, "view");

                break;
            case "Offline":
                confirm({
                    title: '下线模组?',
                    content: '确认下线后，模组将同步从开放平台下线，确定要这样做吗？',
                    okText: '确定',
                    okType: 'danger',
                    cancelText: '取消',
                    onOk: () => {
                        this.OfflineOperataion(record.moduleId, 0);
                    },
                    onCancel() { },
                });

                break;
            case "release":
                console.log(record.completeStatus);
                record.completeStatus === 0 ? confirm({                          
                    title: '发布模组',
                    content: '当前模组信息不完整，请完善后提交发布',
                    okText: '确定',
                    cancelText: '取消',
                    onOk() { },
                    onCancel() { },
                }) :
                    confirm({
                        title: '发布模组',
                        content: '确认发布后，模组信息将会同步到开放平台,确定要这样做吗？',
                        okText: '确定',
                        okType: 'danger',
                        cancelText: '取消',
                        onOk: () => {
                            this.releaseOperation(record.moduleId, 1);
                        },
                        onCancel() { },
                    })
                break;
            case "edit":
                let moduleId = record.moduleId;
                this.props.history.push({ pathname: `/config/ModuleManager/edit/${moduleId}` })
                break;
            case "delete":
                confirm({
                    title: '删除模组',
                    content: '删除后，模组信息将同步删除，无法撤销，确定要这样做吗？',
                    okText: '确定',
                    okType: 'danger',
                    cancelText: '取消',
                    onOk: () => {
                        this.deleteOperation(record.moduleId);
                    },
                    onCancel() { },
                });
                break;

            default:
                break;
        }
    }

    render() {
        // 表头格式
        const columns = [
            {
                title: "模组型号", width: "15%", key: "hetModuleTypeName", dataIndex: "hetModuleTypeName",
                render: (text) => <span title={text}>{text}</span>
            },
            {
                title: "支持通信", width: "15%", key: "moduleTypeList", dataIndex: "moduleTypeList",
                render: (text) => <span title={text}>{text}</span>
            },
            { title: "生产厂商", width: "15%", key: "brandName", dataIndex: "brandName" },
            {
                title: "状态", width: "65px", key: "releaseStatus", dataIndex: "releaseStatus",
                 render: (status) => {
                    const color = ["green", "gray"];
                    return <span style={{ color: `${color[status]}` }}>{status === 1 ? "已发布" : "草稿"}</span>
                }
            },
            {
                title: "更新时间", width: "15%", key: "modifyTime", dataIndex: "modifyTime",
                render: (modifyTime) => {
                    let time = DateTool.formateDate(modifyTime, "yyyy-MM-dd hh:mm:ss");
                    return <span title={time}>{time}</span>
                }
            },
            {
                title: "操作", width: "120px", key: "operation", dataIndex: "operation",
                render: (text, record) => {
                    return (
                        <div>{this.generateOperationBtn(record)}</div>
                    );
                }
            }
        ];
        const { moduleList, loading, pagination, pager } = this.state;
        const { moduleInfo, visible, communicationMethodList, visibleChangeAcion } = this.props;
        const { form } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Fragment>
                <Card >
                    <ViewModuleInfo visible={visible} moduleInfo={moduleInfo} viewModuleInfoCancle={visibleChangeAcion} />
                    <Meta title="模组管理" description="" style={{ marginBottom: 10, fontSize: 20 }} />
                    <Form layout="inline" onSubmit={this.handleSubmit} >
                        <Form.Item label='关键字'>
                            {getFieldDecorator('hetModuleTypeName', {})(
                                <Input placeholder="请输入生产厂商或模组型号" style={{ width: 260 }} maxLength={20} />,
                            )}
                        </Form.Item>
                        <Form.Item label='通信方式'>
                            {getFieldDecorator('moduleType', { initialValue: undefined })(
                                <Select style={{ width: 140, marginBottom: 0 }} placeholder="请选择通信方式">
                                    {this.generateOptions(communicationMethodList)}
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" onClick={this.searchClick}>查询</Button>
                        </Form.Item>
                        <Form.Item>
                            <Button type="default" onClick={this.reset}>重置</Button>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" onClick={this.addModule}>添加模组</Button>
                        </Form.Item>
                    </Form>
                </Card>

                <Card className='ModuleManagerListTable' style={{ marginTop: 10 }}>
                    {/* <Table
                        bordered columns={columns} dataSource={moduleList}
                        pagination={pagination}
                        loading={loading} /> */}
                    <TableCom rowKey="id" bordered columns={columns} dataSource={moduleList} pager={pager}
                        onPageChange={this.paginationChange} loading={loading} />
                </Card>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        communicationMethodList: state.getIn(['moduleManager', 'communicationMethodList']).toJS(),
        visible: state.getIn(['moduleManager', 'visible']),
        moduleInfo: state.getIn(['moduleManager', 'moduleInfo']).toJS(),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        getAllModuleBrandList() {
            const action = actionCreators.getAllModuleBrandList();
            dispatch(action);
        },
        getBindSceneList() {
            const action = actionCreators.getBindSceneList();
            dispatch(action);
        },
        visibleChangeAcion(value) {
            const action = actionCreators.visibleChangeAcion(value);
            dispatch(action);
            const moduleInfoaction = actionCreators.moduleInfoChangeAcion({});
            dispatch(moduleInfoaction);
        },
        getModuleTypeMenuAction(value) {
            const action = actionCreators.getModuleTypeMenuAction(value);
            dispatch(action);
        },
        getModuleInfoPreview(value) {
            const action = actionCreators.getModuleInfoPreviewAction(value);
            dispatch(action);
        },

    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Form.create({})(ModuleManagerList));