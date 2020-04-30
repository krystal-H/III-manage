import * as React from 'react';
import { Form, Input, Button, Select, Tooltip, Modal } from 'antd';
import TitleTab from '../../../components/TitleTab';
import { FormComponentProps } from 'antd/lib/form';
import Table from '../../../components/Table';
import { DateTool } from '../../../util/utils';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import TableHOC from '../../../components/TableHOC';
import { ITableHOCProps } from '../../../types';

const FormItem = Form.Item;
const Option = Select.Option;
const noticeTypes = {
    1: "系统公告",
    2: "流程消息",
    3: "服务消息"
}

const statusList = {
    1: "草稿",
    2: "已发布",
    3: "已删除"
}
enum SendTo { All = 9, Direaction = 10 }
const statusColor = {
    2: "#00CC00",
    3: "#CC0000"
}

interface IProps extends FormComponentProps, ITableHOCProps {
    history: any
    list: INotice[]
    pager: IPager
    loading: boolean
    getList: Function
    delNotice: Function
    publishNotice: Function
    cancelNotice: Function
    setNotice: typeof actionCreators.setNotice
}

class NoticeList extends React.Component<IProps> {
    // 编辑
    handleEdit = (noticeId: number = 0) => {
        this.props.history.push(`./${noticeId}`);
    }

    // 查看
    handleView = (notice: INotice) => {
        this.props.setNotice(notice);
        this.props.history.push(`./view/${notice.noticeId}`);
    }

    // 发布
    handlePublish = (noticeId: number) => {
        const _this = this;
        Modal.confirm({
            title: "提示",
            content: "是否确认发布？",
            onOk() {
                _this.props.publishNotice(noticeId).then((res: number) => {
                    if(res){
                        _this.props.onChange(1);
                    }
                });
            }
        });
    }

    // 撤销发布
    handleCancel = (noticeId: number) => {
        const _this = this;
        Modal.confirm({
            title: "提示",
            content: "是否确认撤销？",
            onOk() {
                _this.props.cancelNotice(noticeId).then((res: number) => {
                    if(res){
                        _this.props.onChange(1);
                    }
                });
            }
        });
    }

    // 删除
    handleDel = (noticeId: number) => {
        const _this = this;
        Modal.confirm({
            title: "提示",
            content: "是否确认删除？",
            onOk() {
                _this.props.delNotice(noticeId).then((res: number) => {
                    if(res){
                        _this.props.onChange(1);
                    }
                });
            }
        });
    }

    render() {
        const { form, list, pager, loading } = this.props;
        const { getFieldDecorator } = form;
        const columns = [
            {
                title: "消息标题", dataIndex: "noticeTitle", width: "30%", render: (item: string) => (
                    <span title={item}>{item}</span>
                )
            },
            {
                title: "消息类型", dataIndex: "noticeTypeName", width: "200px", render: (item: string) => (
                    <span title={item}>{item || "--"}</span>
                )
            },
            {
                title: "发布对象", width: "20%", render: (item: INotice) => {
                    return item.sendTo === SendTo.All ? <span>所有用户</span> :
                        <span title={item.sendToUserNames || "--"}>{item.sendToUserNames || '--'}</span>
                }
            },
            {
                title: "更新时间", dataIndex: "updateTime", width: "20%", render: (item: string) => {
                    let timer = DateTool.utc2beijing(item, "yyyy-MM-dd hh:mm:ss");
                    return <span title={timer}>{timer}</span>;
                }
            },
            {
                title: "消息状态", dataIndex: "noticeStatus", width: "120px", render: (item: number) => (
                    <span style={statusColor[item] ? {color: statusColor[item]} : undefined}>{statusList[item] || '--'}</span>
                )
            },
            {
                title: "操作", width: "190px", render: (item: INotice) => {
                    return (
                        <div className="action">
                            {
                                item.noticeStatus === 1 ?
                                    <span>
                                        <Tooltip placement="top" title="编辑">
                                            <Button icon="edit" shape="circle" size="small" onClick={this.handleEdit.bind(this, item.noticeId)} />
                                        </Tooltip>
                                        &nbsp; | &nbsp;
                                     </span>
                                    : null
                            }

                            <Tooltip placement="top" title="查看">
                                <Button icon="info" shape="circle" size="small" onClick={this.handleView.bind(this, item)} />
                            </Tooltip>
                            &nbsp; | &nbsp;
                            {
                                item.noticeStatus === 1 ?
                                <span>
                                    <Tooltip placement="top" title="发布">
                                        <Button icon="upload" shape="circle" size="small" onClick={this.handlePublish.bind(this, item.noticeId)} />
                                    </Tooltip>
                                    &nbsp; | &nbsp;
                                </span> : item.noticeStatus === 2 ?
                                <span>
                                    <Tooltip placement="top" title="撤销">
                                        <Button icon="download" shape="circle" size="small" onClick={this.handleCancel.bind(this, item.noticeId)} />
                                    </Tooltip>
                                    &nbsp; | &nbsp;
                                </span> : null
                            }
                            <Tooltip placement="top" title="删除">
                                <Button icon="delete" shape="circle" size="small" onClick={this.handleDel.bind(this, item.noticeId)} />
                            </Tooltip>
                        </div>
                    );
                }
            },
        ];

        return (
            <div className="message-manage">
                <TitleTab title="消息管理">
                    <Form layout="inline">
                        <div className="message-filter-item">
                            <FormItem label="消息标题">
                                {getFieldDecorator('noticeTitle')(
                                    <Input placeholder="请输入消息标题" maxLength={20} style={{ width: 160 }} onPressEnter={this.props.onFilter}></Input>
                                )}
                            </FormItem>
                            <FormItem label="消息类型">
                                {getFieldDecorator('noticeType')(
                                    <Select style={{ width: 160 }} placeholder="请选择消息类型">
                                        <Option key="0" value={""}>全部</Option>
                                        {
                                            Object.keys(noticeTypes).map(item => {
                                                return (<Option key={item} value={+item}>{noticeTypes[item]}</Option>)
                                            })
                                        }
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem label="消息状态">
                                {getFieldDecorator('noticeStatus')(
                                    <Select style={{ width: 160 }} placeholder="请选择消息状态">
                                        <Option key="0" value={""}>全部</Option>
                                        {
                                            Object.keys(statusList).map(item => {
                                                return (<Option key={item} value={+item}>{statusList[item]}</Option>)
                                            })
                                        }
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem label="发布类型">
                                {getFieldDecorator('sendTo')(
                                    <Select style={{ width: 160 }} placeholder="请选择发布类型">
                                        <Option key="0" value={""}>全部</Option>
                                        <Option key="1" value={SendTo.All}>广播推送</Option>
                                        <Option key="2" value={SendTo.Direaction}>定向推送</Option>
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem>
                                <Button type="primary" onClick={this.props.onFilter}>查询</Button>
                            </FormItem>
                            <FormItem>
                                <Button type="primary" onClick={this.props.onReset}>重置</Button>
                            </FormItem>
                        </div>
                        <div className="message-filter-item">
                            <FormItem style={{ float: "right" }}>
                                <Button type="primary" onClick={this.handleEdit.bind(this, 0)}>新建</Button>
                            </FormItem>
                        </div>
                    </Form>

                </TitleTab>
                <div className="message-manage-content">
                    <Table rowKey={"noticeId"} columns={columns} dataSource={list} pager={pager}
                        loading={loading} onPageChange={this.props.onChange} />
                </div>
            </div>
        );
    };
}

const mapStateToProps = (state: any) => ({
    list: state.getIn(["noticeManage", "list"]).toJS(),
    pager: state.getIn(["noticeManage", "pager"]).toJS(),
    loading: state.getIn(["noticeManage", "loading"]),

});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    getList: actionCreators.getList,
    delNotice: actionCreators.delNotice,
    publishNotice: actionCreators.publishNotice,
    cancelNotice: actionCreators.cancelNotice,
    setNotice: actionCreators.setNotice,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Form.create<IProps>()(TableHOC<IProps>(NoticeList)));