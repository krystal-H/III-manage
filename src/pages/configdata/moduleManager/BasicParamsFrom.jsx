import React, { Component } from 'react';
import { Form, Button, Input, Select, InputNumber, message, Modal } from 'antd'
import { connect } from 'react-redux';
import { actionCreators } from './store';
import { ModuleSaveRequest } from '../../../apis/moduleManager'
const { Option } = Select;
const { confirm } = Modal;
export class BasicParamsFrom extends Component {

    generateOptions = (data) => {
        if (data && data.length > 0) {
            return data.map((item, index) => (
                <Option value={item.moduleBrandId} key={item.moduleBrandId}>{item.brandName}</Option>
            ))
        }
    }

    saveModuleInfo = () => {
        const { moduleInfo, form: { validateFields } } = this.props;
        // 如果有moduleId说明是编辑状态，反之是新建
        if (moduleInfo && moduleInfo.moduleId) {
            validateFields((err, values) => {
                if (!err) {
                    this.props.changeCurrent();
                }
            });
        } else {
            validateFields((err, values) => {
                if (!err) {
                    console.log("第一步提交了====", values)
                    let params = {
                        ...values,
                        stepIndex: 1
                    };
                    ModuleSaveRequest(params).then(response => {
                        let { data } = response;
                        if (data.code === 0) {
                            let moduleId = data.data.moduleId;
                            this.props.getModuleInfo(moduleId);
                            this.props.changeCurrent();
                        }
                    })
                }
            });
        }
    }

    canleClick = () => {
        confirm({
            title: '当前编辑信息未保存，是否继续退出',
            content: '',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => {
                this.props.goBack();
            },
            onCancel() { },
        });
    }

    checkNumber = (rule,value,callback) => {
        if(value < 0){
            callback("仅允许输入正整数");
            return;
        }
        callback()
    }

    render() {
        const formItemLayout = {
            labelCol: { xs: { span: 24 }, sm: { span: 8 }, },
            wrapperCol: { xs: { span: 24 }, sm: { span: 9 }, },
        };
        const BtnformItemLayout = {
            labelCol: { span: 24 },
            wrapperCol: { span: 24 },
        };
        const { getFieldDecorator } = this.props.form;

        const { moduleInfo, brandItems } = this.props;

        return (
            <div className="first-content">
                <Form {...formItemLayout} className="data-label-form">
                    <Form.Item label="模组生产厂家" >
                        {getFieldDecorator('moduleBrandId', { rules: [{ required: true, message: '请选择模组生产厂家' }] })
                            (
                                <Select placeholder="请选择模组生产厂家">
                                    {this.generateOptions(brandItems)}
                                </Select>
                            )
                        }
                    </Form.Item>
                    <Form.Item label="模组型号" >
                        {getFieldDecorator("hetModuleTypeName", {
                            rules: [{ required: true, message: '请输入模组型号' }, { type: 'string', max: 50, message: '上限50个字符长度' }]
                        })(
                            <Input type="text" placeholder="请输入模组型号" maxLength={50}
                            />
                        )}
                    </Form.Item>

                    <Form.Item label="模组IC型号" >
                        {getFieldDecorator("originalModuleTypeName", {
                            rules:
                                [{ required: true, message: '请输入模组IC型号' }, { type: 'string', max: 50, message: '上限50个字符长度' }]
                        })(
                            <Input type="text" placeholder="请输入模组IC型号" maxLength={50}
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="适用范围" >
                        {getFieldDecorator("applyScope", {
                            rules:
                                [{ required: true, message: '请输入模组适用范围' }, { type: 'string', max: 50, message: '上限20个字符长度' }]
                        })(
                            <Input type="text" placeholder="请输入模组适用范围，如：家电产品" maxLength={50}
                            />
                        )}
                    </Form.Item>

                    <Form.Item className="moduleSize" label="模组尺寸">
                        {/* <div> */}
                        <Form.Item style={{ display: 'inline-block', width: '100px', marginBottom: 0 }}>
                            {getFieldDecorator("sizeThickness", { initialValue: moduleInfo.sizeThickness, rules: [{ required: true, message: '请输入厚' },{validator:this.checkNumber.bind(this)}] })(
                                <InputNumber maxLength={3} max={999} />
                            )}
                        </Form.Item>
                        <span>&nbsp;-&nbsp;&nbsp;&nbsp;</span>
                        <Form.Item label="" style={{ display: 'inline-block', width: '100px', marginBottom: 0 }} >
                            {getFieldDecorator("sizeWidth", { initialValue: moduleInfo.sizeWidth, rules: [{ required: true, message: '请输入宽' },{validator:this.checkNumber.bind(this)}]})(
                                <InputNumber maxLength={3} max={999} />
                            )}

                        </Form.Item>

                        <span>&nbsp;-&nbsp;&nbsp;&nbsp;</span>

                        <Form.Item style={{ display: 'inline-block', width: '100px', marginBottom: 0 }} >
                            {getFieldDecorator("sizeHeight", { initialValue: moduleInfo.sizeHeight, rules: [{ required: true, message: '请输入高' },{validator:this.checkNumber.bind(this)}]})(
                                <InputNumber maxLength={3} max={999} />
                            )}
                        </Form.Item>

                        {/* <span>&nbsp;-&nbsp;&nbsp;&nbsp;</span>

                        <Form.Item style={{ display: 'inline-block', width: '100px', marginBottom: 0 }}>
                            {getFieldDecorator("sizeThickness", { initialValue: moduleInfo.sizeThickness, rules: [{ required: true, message: '请输入厚' },{validator:this.checkNumber.bind(this)}] })(
                                <InputNumber maxLength={3} max={999} />
                            )}
                        </Form.Item> */}
                        <br/>
                        <span>（长*宽*高 mm）</span>

                        {/* </div> */}
                    </Form.Item>
                    <Form.Item {...BtnformItemLayout} style={{ textAlign: "center" }}>
                        <Button type="primary" onClick={this.saveModuleInfo} style={{ marginRight: 10 }}>下一步</Button>
                        <Button type="default" onClick={this.canleClick}>取 消</Button>

                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        brandItems: state.getIn(['moduleManager', 'brandItems']).toJS(),
        moduleInfo: state.getIn(['moduleManager', 'moduleInfo']).toJS(),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveModuleInfo(formData) {
            const action = actionCreators.saveModuleInfo(formData);
            dispatch(action);
        },
        getModuleInfo(value, type) {
            const action = actionCreators.getModuleInfo(value, type);
            dispatch(action);
        },
        changeCurApi(key, value) {
            const action = actionCreators.changeCurApi(key, value);
            dispatch(action);
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({
    name: 'BasicParamsFrom',
    onFieldsChange(props, changedFields) {
        // console.log('changedFields', changedFields);
        // 防止redux里面的数据被清除，防止没有改表单触发
        if (JSON.stringify(changedFields) === '{}') {
            return;
        }
        // 防止点击下一步的时候，不校验表单
        let arr = Object.keys(changedFields);
        if (arr.length > 1) {
            return;
        }

        let key = Object.keys(changedFields)[0];
        let value = Object.values(changedFields)[0];
        props.changeCurApi(key, value.value);
    },
    mapPropsToFields(props) {
        const { moduleInfo } = props;
        let moduleInfoMap = {};
        for (let key of Object.keys(moduleInfo)) {
            moduleInfoMap[key] = Form.createFormField({
                value: moduleInfo[key],
            })
        }
        return moduleInfoMap;
    }
})(BasicParamsFrom));





