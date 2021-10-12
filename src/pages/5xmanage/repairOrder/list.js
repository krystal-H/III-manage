import React, { Component, Fragment } from "react";
import { Card, Form, Input, Button, Select, Tooltip, Table,Modal  } from 'antd'
import { getList } from '../../../apis/repairOrder'


class HorizontalLoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageIndex: 1,
            pageRows: 10,
            dataManagerList: [],
            totalRows: 0,
            searchParams: {},
            loading: false,
            pager: {},
            visible:false
        }
    }
    componentDidMount() {
        // To disable submit button at the beginning.
        // this.props.form.validateFields();
        this.requestListData()
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };
    handleFilter(e) {  //查询按钮
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values, '======')
                // this.setState({ query: values }, () => {
                //     this.queryList();
                // })
            }
        })
    }
    //请求
    requestListData(requesInfo) {
        let parames = {
            pageIndex: this.state.pageIndex,
            pageRows: this.state.pageRows,
            ...this.state.searchParams
        }
        if (requesInfo) {
            parames = Object.assign({}, parames, requesInfo)
        }
        this.setState({
            loading: true
        })
        getList(parames).then(res => {
            let code = res.data.code
            //   if(code === REQUEST_SUCCESS){
            //     let data = res.data.data
            //     this.setState({
            //       dataManagerList:data.list ,
            //       totalRows:data.pager.totalRows,
            //       pageIndex:data.pager.pageIndex,
            //       loading:false,
            //       pager:data.pager
            //     })
            //   }
        }).catch(err => {
            this.setState({
                loading: true
            })
        })
    }
    handlePagination(current) {
        console.log('Receve values of page:', current);
        this.setState({
            pageIndex: current
        })
        this.requestListData({
            pageRows: this.state.pageRows,
            pageIndex: current
        })
    }
    handleReset() { //重置
        this.showModal()
        // console.log(this.props.form.getFieldsValue(), '=======')
        return
        this.props.form.resetFields(["userType", "deviceId", "appType"]);
        this.setState({ query: {} }, () => {
            this.queryList();
        })
    }
    showModal = () => {
        this.setState({
          visible: true,
        });
      };
    
      handleOk = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };
    
      handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        let dataSource = this.state.dataManagerList
        const columns = [
            {
                title: "工单ID", dataIndex: "workOrderId"
            },
            {
                title: "提交账号", dataIndex: "creator"
            },
            {
                title: "提交时间", dataIndex: "createTime"
            },
            {
                title: "问题内容", dataIndex: "problemDesc"
            },
            {
                title: "问题图片/视频", dataIndex: "noticeTitle1"
            },
            {
                title: "状态", dataIndex: "status"
            },
            {
                title: "操作",
                render: (text) => <a title={text}>{text}</a>
            }
        ];
        return (
            <div>
                <Card>
                    <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>
                        工单问题
                    </h2>
                    <Form layout="inline" >
                        <Form.Item label="问题分类">
                            {getFieldDecorator('userType', {})(
                                <Select style={{ width: 160 }} placeholder="请选择">
                                    <Option value="male">male</Option>
                                    <Option value="female">female</Option>
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item label="状态">
                            {getFieldDecorator('userType', {})(
                                <Select style={{ width: 160 }} placeholder="请选择">
                                    <Option value="male">male</Option>
                                    <Option value="female">female</Option>
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item  >
                            <Button type="primary" onClick={this.handleFilter.bind(this)} >查询</Button>
                        </Form.Item>
                        <Form.Item >
                            <Button onClick={this.handleReset.bind(this)}>重置</Button>
                        </Form.Item>
                    </Form>
                </Card>
                <Card style={{ marginTop: "10px" }}>
                    <Table columns={columns} dataSource={dataSource} />
                </Card>
                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
            </div>);
    }
}

const WrappedHorizontalLoginForm = Form.create({ name: 'repair_order' })(HorizontalLoginForm);
export default WrappedHorizontalLoginForm