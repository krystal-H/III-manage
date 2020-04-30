import React, { Component } from 'react'
import { Card, Button } from 'antd'

const Meta = Card.Meta;

class MessageContent extends Component {
    render() {
        return (
            <div className="messasge-wrap">
                <Card >
                    <Meta title="消息列表" description="" style={{ marginBottom: 10, fontSize: 15 }} />
                    <Button type="primary" className="btn-back" onClick={() => this.props.history.go(-1)}>返回</Button>
                </Card>
                <Card>
                    <div className="mail-content">
                        <h2>标题</h2>
                        <p className="content">
                            产品发布【mesh蓝牙网络设备+MESH-0000】发布到APP【C-Life美容,C-Life家电】已通过审核，你现在可以使用【C-Life美容,C-Life家电】来绑定设备啦！
                    </p>
                        <div className="sender">
                            <p>发件人</p>
                            <p>2018-10-18 11:34:18</p>
                        </div>
                    </div>
                </Card>

            </div>
        )
    }
}

export default MessageContent