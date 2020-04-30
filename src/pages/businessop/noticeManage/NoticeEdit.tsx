import * as React from 'react';
// 引入编辑器组件
import BraftEditor from 'braft-editor';
// 引入编辑器样式
import 'braft-editor/dist/index.css';
import TitleTab from '../../../components/TitleTab';
import { Button, Form, Input, Select, Tag, Cascader, notification } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { Dispatch, bindActionCreators } from 'redux';
import { actionCreators } from './store';
import { connect } from 'react-redux';

const FormItem = Form.Item;
const Option = Select.Option;

interface IProps extends FormComponentProps {
    history: any
    notice: INotice
    match: any
    saveNotice: Function
    validateAccout: Function
    getNotice: Function
    clearNotice: typeof actionCreators.clearNotice
}

interface IReceiveUser {
    id: number
    value: string
}

const noticeTypeList = [{
    value: '1',
    label: '系统公告'
}, {
    value: '3',
    label: '服务消息',
    children: [
        {
            value: '1',
            label: 'APP控制服务'
        },
        {
            value: '2',
            label: '云端定时服务'
        },
        {
            value: '3',
            label: '场景联动服务'
        }
    ]
}]

let id = 0;
enum SendTo { All = 9, Direaction = 10 }

class NoticeEdit extends React.Component<IProps>{
    private refInput: Input;
    state = {
        receive_users: [],
    }

    // 返回
    handleBack = () => {
        this.props.history.go(-1);
    }

    // 保存
    handleSave = () => {
        const { form, notice } = this.props;
        const { receive_users } = this.state;
        form.validateFields((err, values) => {
            if (err || (values.sendTo === SendTo.Direaction && receive_users.length === 0) ) {
                return ;
            }
            const params = { ...values, noticeContent: values.noticeContent.toHTML() };
            params.sendToUserId = values.sendTo === SendTo.Direaction ? receive_users.map((item: IReceiveUser) => item.id).join(',') : undefined;
            params.noticeType = +params.noticeType.join('');
            if (notice.noticeId) {
                params.noticeId = notice.noticeId;
            }
            this.props.saveNotice(params).then((res: number) => {
                if (res) {
                    this.props.history.go(-1);
                }
            });
        });
    }

    // 添加子账号
    handleAdd = () => {
        const { form } = this.props;
        form.validateFields(['receive_users'], (err, value) => {
            if (err) {
                return;
            }
            const { receive_users } = this.state;
            if(receive_users.length > 19){
                notification.warning({
                    duration: 3,
                    message: "最多添加20个用户"
                })
                return;
            }

            this.setState({
                receive_users: [...receive_users, { id: Math.floor(Math.random()*100), value: "" }],
            }, () => {
                this.refInput.focus();
            });
        });
    }

    // 删除子账号
    handleClose = (id: number) => {
        const { receive_users } = this.state;
        this.setState({
            receive_users: receive_users.filter((item: IReceiveUser) => item.id !== id)
        });
    }

    // 账号校验
    handleValidate = (_: any, value: any, callback: any) => {
        const { receive_users } = this.state;
        if (!!!value) {
            let temp = [...receive_users];
            temp.pop();
            this.setState({
                receive_users: temp
            });
            return;
        }
        if (receive_users.some((item: IReceiveUser) => item.value === value)) {
            callback("账号已添加");
            return;
        }
        this.props.validateAccout(value).then((res: { developerId: number, userName: string } | 0) => {
            if (res) {
                let temp: any = [...receive_users];
                let t: { id: number, value: string } = temp.pop();
                t.value = value;
                t.id = res.developerId;
                this.setState({
                    receive_users: [...temp, t]
                });
            } else {
                callback("账号不存在");
            }
            callback();
        });
    }

    // enter失焦
    handleBlur = () => {
        this.refInput.blur();
    }

    componentDidMount() {
        // todo -- 判断是否新增，异步请求消息内容，并设置内容
        const { noticeId } = this.props.match.params;
        if (+noticeId) {
            this.props.getNotice(noticeId).then((res: INotice | 0) => {
                if (res) {
                    const { noticeTitle, noticeContent, noticeType, sendTo, sendToUserNames, sendToUserId } = res;
                    this.props.form.setFieldsValue({
                        noticeTitle, sendTo,
                        noticeType: noticeType.toString().split(''),
                        noticeContent: BraftEditor.createEditorState(noticeContent)
                    });
                    if (sendTo === SendTo.Direaction && sendToUserId && sendToUserNames) {
                        let ids = sendToUserId.split(',').filter(Boolean);
                        let names = sendToUserNames.split(',').filter(Boolean);
                        this.setState({
                            receive_users: ids.map((item: string, index: number) => ({id: +item, value: names[index]}))
                        });
                    }
                }
            });
        }
    }

    componentWillUnmount() {
        this.props.clearNotice();
    }

    render() {
        const { noticeId } = this.props.match.params;
        const { receive_users } = this.state;
        const { form } = this.props;
        const { getFieldDecorator, getFieldValue } = form;
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 10 },
        };
        const formItemEditor = {
            labelCol: { span: 3 },
            wrapperCol: { span: 21 },
        };
        const sendTo = getFieldValue('sendTo');
        const validate: any = sendTo === SendTo.Direaction && receive_users.length === 0 ? {help: "至少添加一个用户", validateStatus: "error"} : {};

        return (
            <div className="message-manage">
                <TitleTab title={+noticeId ? "编辑消息" : "新增消息"}>
                    <Button type="primary" className="btn-back" onClick={this.handleBack}>返回</Button>
                </TitleTab>
                <div className="message-manage-content">
                    <Form style={{ width: 1000 }}>
                        <FormItem label="消息标题" {...formItemLayout}>
                            {getFieldDecorator('noticeTitle', {
                                rules: [{
                                    required: true,
                                    message: "请输入标题",
                                }]
                            })(
                                <Input maxLength={20} placeholder="请输入标题" />
                            )}
                        </FormItem>
                        <FormItem label="消息类型"  {...formItemLayout}>
                            {getFieldDecorator('noticeType', {
                                rules: [{
                                    required: true,
                                    message: "请选择消息类型",
                                }]
                            })(
                                <Cascader 
                                    placeholder="请选择消息类型"
                                    style={{ width: 240 }}
                                    options={noticeTypeList}
                                />
                            )}
                        </FormItem>
                        <FormItem label="消息内容" {...formItemEditor}>
                            {getFieldDecorator('noticeContent', {
                                validateTrigger: 'onBlur',
                                rules: [{
                                    required: true,
                                    validator: (_, value, callback) => {
                                        let str = value && value.toHTML();
                                        if (!str || str === "<p></p>") {
                                            callback('请输入正文内容');
                                        } else {
                                            callback();
                                        }
                                    }
                                }],
                            })(
                                <BraftEditor
                                    className="notice-editor"
                                    placeholder="请输入正文内容"
                                />
                            )}
                        </FormItem>
                        <FormItem label="推送方式" {...formItemEditor}>
                            {getFieldDecorator('sendTo', {
                                initialValue: 9,
                                rules: [{
                                    required: true,
                                    validator: (_, value, callback) => {
                                        if (!value) {
                                            callback('请选择推送方式');
                                        } else {
                                            callback();
                                        }
                                    }
                                }]
                            })(
                                <Select placeholder="请选择消息类型" style={{ width: 240 }} allowClear>
                                    <Option value={SendTo.All} key="1">广播消息</Option>
                                    <Option value={SendTo.Direaction} key="2">定向发布</Option>
                                </Select>
                            )}
                        </FormItem>
                        {
                            sendTo === SendTo.Direaction ?
                                <FormItem wrapperCol={{ span: 21, offset: 3 }} {...validate}>
                                    <div className="receive_users" >
                                        {
                                            receive_users.map((item: IReceiveUser) => {
                                                return item.value ?
                                                    <Tag key={item.id} closable onClose={this.handleClose.bind(this, item.id)}>{item.value}</Tag>
                                                    :
                                                    getFieldDecorator(`receive_users`, {
                                                        validateTrigger: "onBlur",
                                                        rules: [{
                                                            validator: this.handleValidate
                                                        }]
                                                    })(
                                                        <Input key={item.id} placeholder="请输入账号" maxLength={30} style={{ width: 240 }} ref={(refInput: Input) => this.refInput = refInput} onPressEnter={this.handleBlur} />
                                                    );
                                            })
                                        }
                                        <Button className="btn-add-user" onClick={this.handleAdd}>添加账号</Button>
                                    </div>
                                </FormItem>
                                : null
                        }

                        <FormItem >
                            <Button type="primary" className="btn-save" onClick={this.handleSave}>保存</Button>
                        </FormItem>
                    </Form>

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    notice: state.getIn(["noticeManage", "notice"]).toJS()
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    saveNotice: actionCreators.saveNotice,
    validateAccout: actionCreators.validateAccout,
    getNotice: actionCreators.getNotice,
    clearNotice: actionCreators.clearNotice,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Form.create<IProps>()(NoticeEdit));