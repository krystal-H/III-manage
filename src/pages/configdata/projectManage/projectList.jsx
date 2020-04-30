import React from 'react';
import { connect } from 'react-redux';
import { Input, Button, Card, Modal, Tooltip } from 'antd';
import Table from '../../../components/Table';
import TitleTab from '../../../components/TitleTab';
import { actionCreators } from '../../configdata/projectManage/store';

const TitleOption = TitleTab.Option;

class ProjectList extends React.Component {
    state = {
        projectName: "",
        robotId: "",
        queryStatus: null,
        loading: false
    }


    // 搜索框状态改变
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    // 查询
    handleSearch = () => {
        const { projectName, robotId } = this.state;
        this.setState({
            queryStatus: { projectName, robotId }
        }, () => {
            this.pageChange();
        });
    }

    // 重置
    handleReset = () => {
        this.setState({
            projectName: "",
            robotId: "",
            queryStatus: null
        }, () => {
            this.refInpt1.setState({value: ""});
            this.refInpt2.setState({value: ""});
        });
    }

    // 新增
    handleNew = () => {
        this.props.history.push(`./0`);
    }

    // 编辑
    handleEdit = (projectId) => {
        this.props.history.push(`./${projectId}`);
    }

    // 删除项目
    handleDel = (projectId) => {
        Modal.confirm({
            title: "确定删除项目",
            centered: true,
            onOk: () => {
                this.props.delProject(projectId);
            }
        });
    }

    // 页码变化
    pageChange = (pageIndex = 1) => {
        const params = { ...this.state.queryStatus, pageIndex };
        console.log(params);
        this.setState({
            loading: true
        }, () => {
            this.props.getList(params).then(res => {
                this.setState({
                    loading: false
                });
            });
        });

    }

    componentDidMount() {
        console.log(this.props);
        this.pageChange();
    }

    render() {
        const { loading } = this.state;
        const { pager, list } = this.props;
        const columns = [
            { title: "项目ID", dataIndex: "projectId", width: "10%" },
            { title: "名称", dataIndex: "projectName", width: "20%" },
            { title: "机器人ID", dataIndex: "robotId", width: "150px" },
            { title: "关联产品", dataIndex: "productNameList", width: "30%", render: (text) => <span title={text}>{text}</span>},
            {
                title: "操作", width: "120px", render: (item) =>
                    <div className="action">
                        <Tooltip placement="top" title="管理">
                            <Button shape="circle" size="small" icon="container" key={0} onClick={this.handleEdit.bind(this, item.projectId)} />
                        </Tooltip>
                        &nbsp; | &nbsp;
                        <Tooltip placement="top" title="删除">
                            <Button shape="circle" size="small" icon="delete" key={1} onClick={this.handleDel.bind(this, item.projectId)} />
                        </Tooltip>
                    </div>
            },
        ];

        return (
            <div className="projectmanage">
                <TitleTab title="项目管理" >
                    <TitleOption>
                        <Input style={{ width: 240 }} type="text" maxLength={20} className="het-input-text" placeholder={"请输入项目名称查询"}
                            name="projectName" onChange={this.handleChange} onPressEnter={this.handleSearch} ref={(refInpt) => this.refInpt1 = refInpt} />
                    </TitleOption>
                    <TitleOption>
                        <Input style={{ width: 240 }} type="text" maxLength={20} className="het-input-text" placeholder={"请输入机器人ID查询"}
                            name="robotId" onChange={this.handleChange} onPressEnter={this.handleSearch} ref={(refInpt) => this.refInpt2 = refInpt}/>
                    </TitleOption>
                    <TitleOption>
                        <Button type="primary" onClick={this.handleSearch}>查询</Button>
                    </TitleOption>
                    <TitleOption>
                        <Button type="primary" onClick={this.handleReset}>重置</Button>
                    </TitleOption>
                    <TitleOption align="right">
                        <Button type="primary" onClick={this.handleNew} >新建</Button>
                    </TitleOption>
                </TitleTab>

                <Card>
                    <Table rowKey="projectId" pagination={false} columns={columns} dataSource={list} pager={pager} onPageChange={this.pageChange} loading={loading} />
                </Card>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    list: state.getIn(["projectManage", "list"]).toJS(),
    pager: state.getIn(["projectManage", "pager"]).toJS()
});

const mapDispatchToProps = (dispatch) => ({
    getList: (pager) => dispatch(actionCreators.getList(pager)),
    delProject: (projectId) => dispatch(actionCreators.delProject(projectId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);