import React from 'react'
import { connect } from 'react-redux'
import { Input, Select } from 'antd'
import { actionCreators } from './store';

const Option = Select.Option;
const navList = ["找不到设备", "设备不在线", "能力超出范围", "指令超出范围", "场景无法执行"];

class ProjectRobot extends React.Component {
    constructor(props) {
        super(props);
        const { replyList } = props;
        this.state = {
            tabIndex: 0,
            robotId: "",
            robotDesc: "",
            replyList: replyList || null
        }
    }

    // 点击语音tab
    handleClick = (index) => {
        this.setState({
            tabIndex: index
        })
    }

    // 修改基础信息
    handleChange = (e) => {
        let { name, value } = e.target;
        this.setState({
            [name]: value
        }, () => {
            this.props.setRobotDetail(name, value)
        })
    }

    // 选择覆盖区域
    handleSelect = (val) => {
        this.props.setRobotDetail("summaryId", val)
    }

    // 删除语音
    delVoice = (index) => {
        const { tabIndex, replyList } = this.state;
        replyList[tabIndex] = replyList[tabIndex].filter((item, i) => i !== index)
        console.log("----", replyList);
        this.setState({
            replyList
        }, () => {
            this.props.setReplyList(replyList);
        })
    }

    // 修改语音
    editVoice = (value, index) => {
        const { tabIndex, replyList } = this.state;
        replyList[tabIndex][index].replyInfo = value;
        this.setState({
            replyList
        }, () => {
            this.props.setReplyList(replyList);
        })
    }

    // 添加语音
    addVoice = () => {
        const { tabIndex, replyList } = this.state;
        const voice = { sceneId: tabIndex, replyIndex: Math.random() * 1000 | 0, replyInfo: "" }
        replyList[tabIndex].push(voice)
        this.setState({
            replyList
        }, () => {
            this.props.setReplyList(replyList);
        })
    }

    componentWillReceiveProps(nextProps) {
        const { replyList, projectVoiceRobot } = nextProps;
        const { robotId, robotDesc } = projectVoiceRobot;
        // 设置robot基础数据
        if (robotId !== this.state.robotId || robotDesc !== this.state.robotDesc) {
            this.setState({
                robotId, robotDesc
            })
        }
        // 设置语音数据
        if (JSON.stringify(replyList) !== JSON.stringify(this.state.replyList)) {
            this.setState({
                replyList
            })
        }
    }

    render() {
        const { tabIndex, robotId, robotDesc } = this.state;
        const { projectVoiceRobot, summaryList } = this.props;
        const { summaryId, summaryName } = projectVoiceRobot;
        const replyList = this.state.replyList || projectVoiceRobot.replyList;
        console.log(summaryList, summaryId, summaryName)
        return (
            <div className="edit-detail robot">
                <div className="robot-choose">
                    <div className="form-item">
                        <p className="label">
                            <span>机器人ID：</span>
                        </p>
                        <Input placeholder="请输入机器人ID" maxLength={6} value={robotId || projectVoiceRobot.robotId} name="robotId" onChange={this.handleChange} />
                    </div>
                    <div className="form-item">
                        <p className="label">
                            <span>描述：</span>
                        </p>
                        <Input placeholder="请输入描述" maxLength={150} value={robotDesc || projectVoiceRobot.robotDesc} name="robotDesc" onChange={this.handleChange} />
                    </div>
                    <div className="robot-tab-voice">
                        <div className="robot-position">
                            <p >语音机器人覆盖的最大空间区域</p>
                           
                            <Select className="robot-position-select" value={summaryId} defaultActiveFirstOption={summaryId ? true : false} onChange={this.handleSelect}>
                                {
                                    summaryList && summaryList.length ? summaryList.map(item =>
                                        <Option value={item.summaryId} key={item.summaryId}>{item.summary}</Option>
                                    ) : <Option value={summaryId} key={summaryId}>{summaryName}</Option>
                                }
                            </Select>
                        </div>
                        <p>异常场景回复语配置</p>
                        <div className="robot-voice-tabs">
                            <ul>
                                {
                                    navList.map((item, index) =>
                                        <li key={item} className={index === tabIndex ? "active" : ""} onClick={this.handleClick.bind(this, index)}>
                                            <span>{item}</span>
                                        </li>
                                    )
                                }
                            </ul>
                            <div className="robot-voice-list">
                                <p>回复语料（配置多条语料时随机下发）</p>
                                {
                                    replyList && replyList[tabIndex] && replyList[tabIndex].map((item, index) =>
                                        <div className="voice" key={`${item.sceneId}-${item.replyIndex}`}>
                                            <Input placeholder="最多输入50个字符" maxLength={50} value={item.replyInfo} onChange={(e) => this.editVoice(e.target.value, index)} />
                                            {index > 0 ? <div className="decrease" onClick={this.delVoice.bind(this, index)}><p>-</p></div> : null}
                                        </div>
                                    )
                                }
                                <div className="voice-add"><span onClick={this.addVoice}>添加</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    projectVoiceRobot: state.getIn(["projectManage", "project", "projectVoiceRobot"]).toJS(),
    summaryList: state.getIn(["projectManage", "summaryList"]).toJS(),
    replyList: state.getIn(["projectManage", "replyList"]).toJS(),
})

const mapDispatchToProps = (dispatch) => ({
    setRobotDetail: (name, robotId) => dispatch(actionCreators.setRobotDetail(name, robotId)),
    getSummaryList: (modelId) => dispatch(actionCreators.getSummaryList(modelId)),
    setReplyList: (replyList) => dispatch(actionCreators.setReplyList(replyList))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectRobot)