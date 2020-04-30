import React from 'react';
import { connect } from 'react-redux';
import { Select, Input, Button, Tooltip, Icon, Form } from 'antd';
import TitleTab from '../../../components/TitleTab';
import Table from '../../../components/Table';
import { DateTool } from "../../../util/utils";
import {actionCreators} from './store';
import TableHOC from '../../../components/TableHOC';

const Option = Select.Option;
const FormItem = Form.Item;

class AccountList extends React.Component {
    state = {
        param: "",
        type: 1,
        query: {}
    }

    // 查看
    handleEdit = (accountId) => {
        this.props.history.push(`./${accountId}`);
    } 

    render() {
        const { accountList, pager, form, loading } = this.props;
        const columns = [
            { title: "账号ID", dataIndex: "developerId", width: "15%" },
            { title: "手机号码", dataIndex: "phone", width: "20%" },
            { title: "邮箱", dataIndex: "email", width: "25%" },
            {
                title: '注册时间', dataIndex: 'createTime', width: '20%', className: "th-break", render: (item) => {
                    let timeStr = item ? DateTool.utc2beijing(item, "yyyy-MM-dd hh:mm:ss") : "--";
                    return <span>{timeStr}</span>;
                }
            },
            {
                title: "操作", render: (item) => (
                    <div className="action">
                        <Tooltip placement="top" title="查看">
                            <Icon type="info-circle" onClick={this.handleEdit.bind(this, item.developerId)}/>
                        </Tooltip>
                    </div>
                )
            },
        ];
        const {getFieldDecorator} = form;

        return (
            <div className="account-manage">
                <TitleTab title="用户管理">
                    <Form layout="inline">
                        <FormItem>
                            {
                                getFieldDecorator("type", {
                                    initialValue: 1,
                                    getValueFromEvent: (type) => {
                                        const param = this.props.form.getFieldValue("param");
                                        if(!param){
                                            return type;
                                        }
                                        if(type === 1 || type === 2){
                                            this.props.form.setFieldsValue({
                                                param: param.replace(/[^\d]/g, '')
                                            });
                                        }else if(type === 3){
                                            this.props.form.setFieldsValue({
                                                param: param.replace(/[^\w@._]/g, '')
                                            });
                                        }
                                        return type;
                                    }
                                })(
                                    <Select style={{ width: 160 }} >
                                        <Option value={1} key="1">账号ID</Option>
                                        <Option value={2} key="2">手机号码</Option>
                                        <Option value={3} key="3">电子邮件</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator("param", {
                                    getValueFromEvent: (e) => {
                                        const type = this.props.form.getFieldValue("type");
                                        if(type === 1 || type === 2){
                                            return e.target.value.replace(/[^\d]/g, '');
                                        }else if(type === 3){
                                            return e.target.value.replace(/[^\w@._]/g, '');
                                        }
                                    }
                                })(
                                    <Input style={{ width: 240 }} onPressEnter={this.props.onFilter}/>
                                )
                            }
                        </FormItem>
                        <FormItem>
                            <Button className="modelSearch" type="primary" onClick={this.props.onFilter}>查询</Button>
                        </FormItem>
                        <FormItem>
                            <Button className="modelSearch" type="primary" onClick={this.props.onReset}>重置</Button>
                        </FormItem>
                    </Form>
                </TitleTab>
                <div className="account-content">
                    <Table rowKey={"developerId"} columns={columns} dataSource={accountList} pager={pager}
                        loading={loading} onPageChange={this.props.onChange} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    accountList: state.getIn(["accountManage", "accountList"]).toJS(),
    pager: state.getIn(["accountManage", "pager"]).toJS(),
    loading: state.getIn(["accountManage", "loading"]),
});

const mapDispatchToProps = (dispatch) => ({
    getList: (pager) => dispatch(actionCreators.getList(pager)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(TableHOC(AccountList)));