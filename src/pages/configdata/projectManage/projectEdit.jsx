import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Input, Card, Button, notification } from 'antd'
import { NavLink } from 'react-router-dom'
import { actionCreators } from './store';
import { REQUEST_SUCCESS } from '../../../config/config';
import TitleTab from '../../../components/TitleTab'
import ProjectProduct from './projectProduct'
import ProjectPosition from './projectPosition';
import ProjectRobot from './ProjectRobot';


class ProjectEdit extends React.Component {
    state = {
        projectName: ""
    }

    // 返回
    handleBack = () => {
        this.props.history.push("../list");
    }

    // 修改项目名称
    handleChange = (e) => {
        const value = e.target.value;
        this.setState({
            projectName: value
        }, () => {
            this.props.setProjectName(value)
        })
    }

    // 保存
    handleSave = () => {
        if (!this.state.projectName) {
            // this.props._setState({isShowAlert: true,messageAlert: "请输入项目名称"});
            notification.error({
                message: "请输入项目名称",
                duration: 3,
            })
            return;
        }

        this.props.saveProject().then(res => {
            if (res) {
                notification.success({
                    message: "保存成功",
                    duration: 3,
                })
                this.props.history.push("../list");
            }
        });
    }

    componentDidMount() {
        // 获取项目
        const { match } = this.props;
        const { projectId } = match.params;
        if (+projectId) {
            this.props.getProject(projectId).then(res => {
                let code = res.data.code;
                let data = res.data.data;
                if (code === REQUEST_SUCCESS) {
                    this.setState({
                        projectName: data.projectName
                    })
                }
            });
        }

        this.props.history.replace(`${match.url}/product`)
    }

    componentWillUnmount() {
        this.props.clearData();
    }

    render() {
        const { match } = this.props;
        const { projectName } = this.state;
        return (
            <div className="projectmanage">
                <TitleTab title="项目管理" />
                <Card className="het-list">
                    <Button type="primary" className="btn-back" onClick={this.handleBack}>&lt; 返回</Button>
                    <h2>基本信息</h2>
                    <div className="form-item">
                        <p className="label">
                            <span><i className="dot">*</i>名称：</span>
                        </p>
                        <Input placeholder="请输入名称" maxLength={20} name="projectName" value={projectName} onChange={this.handleChange} />
                    </div>
                    <h2 style={{ marginTop: 20 }}>关联信息</h2>
                    <div className="nav-list">
                        <NavLink to={`${match.url}/product`}>产品设备</NavLink>
                        <NavLink to={`${match.url}/position`}>位置数据模型</NavLink>
                        <NavLink to={`${match.url}/robot`}>语音机器人</NavLink>
                    </div>
                    <Switch>
                        <Route path={`${match.path}/product`} component={ProjectProduct} />
                        <Route path={`${match.path}/position`} component={ProjectPosition} />
                        <Route path={`${match.path}/robot`} component={ProjectRobot} />
                        <Redirect from={`${match.path}/`} to={`${match.path}/product`} />
                    </Switch>
                    <div className="footer">
                        <Button type="primary" className="btn-save" onClick={this.handleSave}>保存</Button>
                        <Button type="primary" className="btn-cancel" onClick={this.handleBack}>取消</Button>
                    </div>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    project: state.getIn(["projectManage", "project"]).toJS(),
})

const mapDispatchToProps = (dispatch) => ({
    getProject: (projectId) => dispatch(actionCreators.getProject(projectId)),
    setProjectName: (projectName) => dispatch(actionCreators.setProjectName(projectName)),
    clearData: () => dispatch(actionCreators.clearData()),
    saveProject: () => dispatch(actionCreators.saveProject())
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectEdit)