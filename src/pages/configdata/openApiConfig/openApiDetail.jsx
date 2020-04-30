import React, { Component } from "react";
import { Descriptions, Card, Button } from "antd";
import './openApiDetail.less';
import { DateTool } from "../../../util/utils";
class openApiDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailData: {},
        };
    }

    // 加载数据
    componentWillMount() {
        let params = this.props.match.params
        let obj = this.query2object(params.detail);
        
        this.setState(() => ({
            detailData: obj
        }))
    }

     query2object(s) {
        return JSON.parse('{"' + decodeURI(s.replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + '"}')
    }

    goBack = () => {
        this.props.history.goBack();
    }
    render() {
        const { detailData } = this.state;
        console.log(detailData.createTime);
        let time = DateTool.utc2beijing(detailData.createTime,"yyyy-MM-dd hh:mm:ss");
        return (
            <div>
                <Card title="B端OpenApi-详情" style={{ width: "100%" }}>
                    <Descriptions title="" layout="vertical" bordered>
                        <Descriptions.Item label="配置ID" span={2}>{detailData.configId}</Descriptions.Item>
                        <Descriptions.Item label="状态" span={2}>{detailData.configStatus ==1?"停用":"正常"}</Descriptions.Item>
        <Descriptions.Item label="配置创建时间" span={2}>{time}</Descriptions.Item>
                        <Descriptions.Item label="配置用户" span={2}>{detailData.userName}</Descriptions.Item>
                        <Descriptions.Item label="配置API" span={4}>
                            {detailData.openapiNameList}
                        </Descriptions.Item>
                        <Descriptions.Item label="配置标签内容" span={4}>
                            {detailData.labelNameList}
                        </Descriptions.Item>
                    </Descriptions>

                    <Button type="primary" className="goBackBtn" onClick={this.goBack} >返回列表</Button>
                </Card>
            </div>
        );
    }
}

export default openApiDetail;
