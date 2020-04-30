import * as React from 'react';
import { Button } from 'antd';
import TitleTab from '../../../components/TitleTab';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import { bindActionCreators, Dispatch } from 'redux';
import { DateTool } from '../../../util/utils';

interface IProps {
    history: any
    match: any
    notice: INotice
    getNotice: typeof actionCreators.getNotice
    clearNotice: typeof actionCreators.clearNotice
}

enum SendTo { All = 9, Direaction = 10 }

class NoticeView extends React.Component<IProps>{
    // 返回
    handleBack = () => {
        this.props.history.go(-1);
    }

    componentDidMount() {
        // todo -- 异步请求消息内容,并设置内容
        const {noticeId} = this.props.match.params;
        if(+noticeId){
            this.props.getNotice(noticeId);
        }
    }

    componentWillUnmount(){
        this.props.clearNotice();
    }

    render() {
        const { notice } = this.props;
        const { noticeTitle, noticeTypeName, sendTo, sendToUserNames, sendTime } = notice;
        return (
            <div className="message-manage">
                <TitleTab title={`消息管理`}>
                    <Button type="primary" className="btn-back" onClick={this.handleBack}>返回</Button>
                </TitleTab>
                <div className="message-manage-content notice-view">
                    <h2 className="notice-title">{noticeTitle}</h2>
                    <p className="notice-descript">
                        <span>推送时间：{sendTime ? DateTool.utc2beijing(sendTime, "yyyy-MM-dd hh:mm:ss") : "--"}</span>
                        <span>消息类型：{noticeTypeName || '--'}</span>
                        <br/>
                        <span style={{maxWidth: "100%", wordBreak: "break-all"}}>推送对象：{sendTo === SendTo.All ? "所有用户" : sendToUserNames || "--"}</span>
                    </p>
                    <hr />
                    {/* <p className="notice-time">{DateTool.utcToDev(updateTime)}</p> */}
                    <div className="notice-content" dangerouslySetInnerHTML={{__html: notice.noticeContent}}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    notice: state.getIn(["noticeManage", "notice"]).toJS()
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    getNotice: actionCreators.getNotice,
    clearNotice: actionCreators.clearNotice,
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(NoticeView);