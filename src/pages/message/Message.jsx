import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card } from 'antd'
import { actionCreators } from './store';
import Table from '../../components/Table'
import { DateTool } from "../../util/utils";
import "./style.less"

const Meta = Card.Meta;

class Message extends Component {
    state = {
        loading: false
    }

    columns = [
        { title: " ", width: 30, render: (text, record, index) => `${index + 1}`, key: "id" },
        {
            title: "标题", width: "55%", align: "left", key: "title", render: (item) => (
                <span>
                    <i className={item.readStatus ? "icon-mail open" : "icon-mail"}></i>
                    {`【${item.typeName}】 ${item.productName}${item.typeName}申请`}
                </span>
            )
        },
        { title: "来自", dataIndex: "email", width: "25%", key: "userName" },
        {
            title: "提交时间", dataIndex: "createTime", width: "20%", key: "createTime", render: (item) => {
                let timeStr = DateTool.utc2beijing(item, "yyyy-MM-dd hh:mm:ss")
                return <span>{timeStr}</span>
            }
        },
    ];


    // 点击行
    handleRow = (record) => {
        const { productId, id, type, typeId, readStatus } = record;
        if (readStatus === 0) {
            this.props.updateReadStatus(id);
        }
        if (type === 2 || type == 10) {
            this.props.history.push(`/businessop/productaudit/${productId}/${id}`)
        } else if (type === 11) {
            this.props.history.push(`/businessop/serviceAudit?productId=${productId}&id=${id}&typeId=${typeId}`)
        } else {
            this.props.history.push(`/businessop/productaudit`)
        }
    }

    // 翻页
    onChange = (pageIndex) => {
        this.setState({ loading: true })
        this.props.getMessageList({ pageIndex, ...this.state.query }).then(() => {
            this.setState({ loading: false })
        })
    }

    componentDidMount() {
        this.onChange();
    }

    render() {
        const { messageList, pager } = this.props;
        const { loading } = this.state;
        return (
            <Card className="messasge-wrap">
                <Meta title="消息列表" description="" style={{ marginBottom: 10, fontSize: 15 }} />

                <Table rowKey="id" pager={pager} bordered={false} columns={this.columns} dataSource={messageList} className="msg-table"
                    onPageChange={this.onChange} loading={loading}
                    onRow={record => {
                        return {
                            onClick: this.handleRow.bind(this, record)
                        }
                    }} />
            </Card>
        )
    }
}

const mapStateToProps = (state) => ({
    messageList: state.getIn(["message", "messageList"]).toJS(),
    pager: state.getIn(["message", "pager"]).toJS()
})

const mapDispatchToProps = (dispatch) => ({
    getMessageList: (pager) => {
        return dispatch(actionCreators.getMessageList(pager))
    },
    updateReadStatus: (id) => {
        dispatch(actionCreators.updateReadStatus(id))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Message)