import React, { Fragment } from 'react';
import { Card, Form, Input, Button, Select, Table } from 'antd';
import { DateTool, Pager } from "../../../util/utils";
const { Option } = Select;
const { Meta } = Card;

const releaseBtnArr = [
    { title: "查看", icon: "info", key: 'View' },
    { title: "下线", icon: "edit", key: 'Offline' },
];

const unReleaseBtnArr = [
    { title: "发布", icon: "cloud-upload", key: 'release' },
    { title: "编辑", icon: "edit", key: 'edit' },
    { title: "删除", icon: "delete", key: 'delete' }
];

const ProductModuleUI = (props) =>{
    // 表头格式
    const columns = [
        { title: "模组型号", width: "15%", dataIndex: "templateName", key: "templateName" },
        { title: "支持通信", width: "15%", key: "deviceTypeName", dataIndex: "deviceTypeName" },
        { title: "生产厂商", width: "15%", key: "deviceSubtypeName", dataIndex: "deviceSubtypeName" },
        {
            title: "状态", width: "5%", key: "status", dataIndex: "status",
            render(status) {
                return status === 1 ? "已发布" : "草稿";
            }
        },
        {
            title: "更新时间", width: "15%", key: "modifyTime", dataIndex: "modifyTime",
            render: (item) => {
                return DateTool.utc2beijing(item, "yyyy-MM-dd hh:mm:ss")
            }
        },

        {
            title: "操作", width: "10%", key: "operation", dataIndex: "operation",
            render: (text, item) => {
                return (
                    <div>
                    </div>
                );
            }
        }
    ];
    const { getFieldDecorator } = this.props.form;
    return(
        <Fragment>
                <Card >
                    <Meta title="模组管理" description="" style={{ marginBottom: 10, fontSize: 15 }} />
                    <Form layout="inline" onSubmit={this.handleSubmit} >
                        <Form.Item label='关键字'>
                            {getFieldDecorator('username', {})(
                                <Input placeholder="请输入生产厂商或模组型号" style={{ width: "290px" }} />,
                            )}
                        </Form.Item>
                        <Form.Item label='通讯方式'>
                            {getFieldDecorator('password', { initialValue: 'WiFi' })(
                                <Select style={{ width: 200, marginBottom: 0 }}>
                                    <Option value='WiFi'>WiFi</Option>
                                    <Option value='WiFi'>Zigbee</Option>
                                    <Option value='WiFi'>Bluetooth</Option>
                                    <Option value='WiFi'>蜂窝网络GPS</Option>
                                    <Option value='WiFi'>红外</Option>
                                    <Option value='WiFi'>以太网</Option>
                                    <Option value='WiFi'>电力载波</Option>
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary">
                                筛选
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary">
                                添加模组
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>

                <Card className='ProductModuleTable' style={{ marginTop: 10 }}>
                    <Table
                        bordered columns={columns} dataSource={[]}
                        pagination={{

                            showQuickJumper: true
                        }}
                        loading={false}
                    // onChange={this.handleTableChange}
                    />
                </Card>
            </Fragment>
    )
}
export default Form.create({})(ProductModuleUI);
