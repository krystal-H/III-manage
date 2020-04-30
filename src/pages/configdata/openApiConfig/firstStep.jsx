import React, { Component, Fragment } from 'react';
import { Select, Form, Button } from 'antd';
import { connect } from 'react-redux';
import { GetUserInfoRequest} from '../../../apis/openApiList';
const { Option } = Select;
export class firstStep extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isExpand: false,
        };
    }
    next = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                this.props.getLabelList({ userId: this.props.value });
            }
        });
    }

    onDropdownVisibleChange = value => {
        this.setState({ isExpand: value });
    };

    render() {
        const { data, isExpand, value } = this.props;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout1 = {
            labelCol: { xs: { span: 24 }, sm: { span: 10 } },
            wrapperCol: { xs: { span: 24 }, sm: { span: 8 } },
        };
        const formItemLayout2 = {
            labelCol: { xs: { span: 24 }, sm: { span: 9 } },
            wrapperCol: { xs: { span: 24 }, sm: { span: 8 } },
        };

        const options = data.map(
            d => <Option style={{ textAlign: "left" }} key={d.userId}>
                {d.userName}
                {this.state.isExpand ? <span style={{ float: "right" }}>{d.userCategory == 0 ? `控制台访问用户` : `接口访问用户`}</span> : null}
            </Option>);
        return (
            <Fragment>
                <Form >
                    <Form.Item label="输入账号名称" {...formItemLayout1} >
                        {getFieldDecorator('userId', { initialValue: value, rules: [{ required: true, message: '账户不能为空' }] })
                            (
                                <Select
                                    allowClear
                                    style={{ width: 300 }}
                                    showSearch
                                    // value={this.props.value}
                                    placeholder="输入账号名称"
                                    defaultActiveFirstOption={false}
                                    showArrow={false}
                                    filterOption={false}
                                    onSearch={this.props.handleSearch}
                                    onChange={this.props.handleChange}
                                    notFoundContent={null}
                                    onDropdownVisibleChange={this.onDropdownVisibleChange}
                                >
                                    {options}
                                </Select>
                            )
                        }
                    </Form.Item>
                    <Form.Item label="备注" {...formItemLayout2}>
                        请输入管理后台配置好的接口访问用户角色下账号。
                    </Form.Item>
                    <Form.Item style={{textAlign:"center"}}>
                        <Button type="primary" onClick={() => this.next()}>下一步</Button>
                    </Form.Item>
                </Form>
            </Fragment>
        );
    }
}

export default connect()(Form.create({})(firstStep));
