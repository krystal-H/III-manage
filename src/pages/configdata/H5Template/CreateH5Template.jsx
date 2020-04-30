import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { message, Form, Button, Input, Select, Upload, Icon, Modal } from 'antd';
import './CreateH5Template.less';
import { DeviceSubTypeRequest, ProtocolTemplateRequest } from "../../../apis/device";
import { SaveTemplateRequest } from "../../../apis/h5Template";
import { fileHost } from '../../../util/utils';
const FormItem = Form.Item;
const Option = Select.Option;

@withRouter
class CreateH5Template extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fileList: [],
            visible: false,
            previewVisible: false,
            previewImage: '',
            subCategoryList: [],
            deviceTypeList: [],
            protocoloList: [],
            categoryId: "",
            subCategoryId: "",
            deviceTypeId: "",
            deviceSubtypeId: "",
        };
    }
    // 一级选择器触发
    categorySelect = value => {
        this.setState(
            {
                categoryId: value,
                subCategoryList: []
            });
        let resetFields = ["subCategoryId", "deviceTypeId"];
        this.props.form.resetFields([...resetFields]);
        const { allCategoryList } = this.props;
        const sameIndex = allCategoryList.findIndex(item => value === item.id);
        if (sameIndex > -1) {
            let data = allCategoryList[sameIndex];
            // console.log("一级菜单选择后：", data);
            this.setState({
                subCategoryList: this.makeFormData(data.subCategoryList, "subCategoryName", "subCategoryId")
            })
        }
    };
    // 二级选择器触发
    subCategorySelect = value => {
        this.setState(
            {
                subCategoryId: value,
                deviceTypeList: []
            });
        this.props.form.resetFields("deviceTypeId");
        const { subCategoryList } = this.state;
        const sameIndex = subCategoryList.findIndex(item => value === item.id);
        if (sameIndex > -1) {
            let data = subCategoryList[sameIndex];
            // console.log("二级菜单选择后：", data);
            this.setState({
                deviceTypeList: this.makeFormData(data.deviceTypeList, "deviceTypeName", "deviceTypeId")
            })
        }
    };
    // 三级选择器触发
    threeCategorySelect = value => {
        const { deviceTypeList } = this.state;
        const sameIndex = deviceTypeList.findIndex(item => value === item.id);
        if (sameIndex > -1) {
            let data = deviceTypeList[sameIndex];
            console.log("三级菜单选择后：", data);
            let deviceTypeId = value;
            let deviceSubtypeId = data.defaultDeviceSubtype.deviceSubtypeId;
            this.setState({
                deviceTypeId,
                deviceSubtypeId
            })
            console.log("三级菜单选择后：deviceSubtypeId ===", deviceSubtypeId);
        }

        this.getProtocol(value);
    }
    makeFormData = (data, idName, id) => {
        let lists = [];
        console.log("data ===", data);
        data.map(item => {
            let obj = { ...item, id: item[id], name: item[idName] };
            lists.push(obj);
        });
        return lists;
    }
    // 获取具体的产品协议模板
    getProtocol = (deviceTypeId) => {
        let params = { deviceTypeId: deviceTypeId }
        ProtocolTemplateRequest(params).then(response => {
            let { data } = response;
            if (data.code === 0) {
                this.setState({
                    protocoloList: this.makeFormData(data.data, "templateName", "templateNumber"),
                });
                // console.log(this.state.protocoloList);
            }
        });
    }
    // 图片上传触发了
    handleChange = info => {
        console.log("----info.file---",info.file);

        // console.log(info.file, info.file.status, info.fileList);
        if (info.file.status === 'error' ){
            message.error(`${info.file.name} 上传失败`);
            info.fileList.length = info.fileList.length -1;
        }else if (info.file.status === undefined) {
            info.fileList.length = info.fileList.length -1;
        }
        this.setState({ fileList:info.fileList });
    };
    // 在上传前对图片进行判断
    beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('只能上传JPG或者PNG格式');
        }
        const isLt2M = file.size / 1024 / 1024 <= 0.5;
        if (!isLt2M) {
            message.error('图片必须小于500KB!');
        }
        return isJpgOrPng && isLt2M;
    }
    // 整个组件展示
    showModal = () => {
        this.setState({
            visible: true,
            iconLoading: false,
        });
    };
    // 点击了创建
    handleOk = e => {
        const { fileList, deviceTypeId, deviceSubtypeId } = this.state
        let pages = {};

        if (fileList.length <= 0) {
            message.warning('请上传模板图片!');
            return ;
        }

        fileList.map((item, index) => {
            if (item.status === 'done') {
                // 转后台需要的格式 
                pages[`page${index + 1}`] = item.response.data.url;
            }
        });

        this.props.form.validateFields((err, values) => {
            if (!err) {
                // 处理为后台需要的格式
                values.status = 0;
                delete values.templatePicList;
                delete values.categoryId;
                delete values.subCategoryId;
                Object.assign(values, pages);
                let params = {
                    ...values,
                    ...pages,
                    deviceTypeId,
                    deviceSubtypeId
                }
                this.setState({ iconLoading: true });
                // console.log("创建H5模板参数：", params);
                SaveTemplateRequest(params).then(response => {
                    let { data } = response;
                    if (data.code === 0) {
                        this.setState({ visible: false, iconLoading: false });
                        let templateId = data.data.templateId;
                        // console.log(templateId);
                        message.success(`恭喜您，模板已创建成功！我们将进入自助接入系统`, 3, this.handleMessageClose(templateId))
                    }
                }).finally(
                    () => {
                        this.setState(() => ({
                            iconLoading: false,
                        }))
                    }
                );;
            }
        });
    };
    // 图片预览
    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await this.getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };
    getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }
    // 创建模板后跳转到自助接入系统
    handleMessageClose = (templateId) => {
        let hostname = window.location.host;
        let targetHostname = '';
        let wCloud = '';
        if (hostname === 'cms.clife.cn') {
            targetHostname = 'open.clife.cn';
            wCloud = '';
        } else if (hostname === 'pre.cms.clife.cn') {
            targetHostname = 'pre.cms.clife.cn';
            wCloud = '/pre-wCloud-v2';
        } else {
            targetHostname = 'dp.clife.net';
            wCloud = '/wCloud_v2';
        }
        let targetUrl =
            'https://' +
            targetHostname +
            wCloud +
            '/app-developer/page/playground.html#/develop/edit/' +
            templateId +
            '?platform=1&operate=edit';
        window.open(targetUrl, '_self');
    }
    // 点解了取消按钮
    handleCancel = e => {
        this.setState({
            visible: false,
            fileList: [],
        });
        this.props.form.resetFields("templatePicList");
        this.props.form.resetFields();
    };
    // 取消图片预览
    handleCancelPreview = () => {
        this.setState({
            previewVisible: false
        });
    }
    // 描述触发事件
    textareaChange = (event) => {
        var getValue = event.target.value;
        var len = getValue.length;
        // console.log(len);
        if (len >= 500) {
            message.warning("最大支持输入500个字符", 1);
        }
    }
    getOptionList = (data) => {
        if (!data) {
            return [];
        }
        let options = []
        data.map((item) => {
            options.push(
                <Option value={item.id} key={item.id}>{item.name}</Option>
            )
        })
        return options;
    }

    render() {
        const props = {
            action: fileHost,
            data: file => ({
                appId: 31438,
                domainType: 4
            })
        };
        const { form, allCategoryList } = this.props;
        const { getFieldDecorator } = form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 15 }
        };
        const uploadButton = (
            <div>
                <Icon type={'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const { subCategoryList, deviceTypeList, protocoloList,fileList } = this.state;
        return (
            <div >
                <Button type="primary" onClick={this.showModal}>新建H5模板</Button>
                <Modal
                    width={800}
                    title="新建H5模板"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    cancelText="取消"
                    okText="创建"
                    confirmLoading={this.state.iconLoading}
                    destroyOnClose={true}
                >
                    <Form  {...formItemLayout} className="CreataH5Template_from">
                        <FormItem label="模板名称" >{getFieldDecorator('templateName', { rules: [{ required: true, message: '模板名称不能为空' }] })(
                            <Input allowClear type="text" placeholder="请输入您喜欢的模板名称" maxLength={20} />
                        )}
                        </FormItem>
                        <Form.Item className="chooseProduct" label="所属分类">
                            <Form.Item style={{ display: 'inline-block', width: 'calc(35% - 12px)' }} > {getFieldDecorator("categoryId", { rules: [{ required: true, message: '请您选择一级类目' }] })(
                                <Select style={{ width: 150 }} placeholder="一级类目" onChange={this.categorySelect}>
                                    {this.getOptionList(allCategoryList)}
                                </Select>
                            )}
                            </Form.Item>

                            <span> </span>

                            <Form.Item style={{ display: 'inline-block', width: 'calc(35% - 12px)' }} > {getFieldDecorator("subCategoryId", { rules: [{ required: true, message: '请您选择二级类目' }] })(
                                <Select style={{ width: 150 }} placeholder="二级类目" onChange={this.subCategorySelect} >
                                    {this.getOptionList(subCategoryList)}
                                </Select>
                            )}
                            </Form.Item>

                            <span> </span>

                            <Form.Item style={{ display: 'inline-block', width: 'calc(35% - 12px)' }}> {getFieldDecorator("deviceTypeId", { rules: [{ required: true, message: '请您选择三级类目' }] })(
                                <Select style={{ width: 150 }} placeholder="三级类目" onChange={this.threeCategorySelect}>
                                    {this.getOptionList(deviceTypeList)}
                                </Select>
                            )}
                            </Form.Item>
                        </Form.Item>
                        <FormItem label="调取协议" > {getFieldDecorator("templateNumber", { rules: [{ required: true, message: '请您选择协议' }] })(
                            <Select style={{ width: 150 }} placeholder="请选择协议" >
                                {this.getOptionList(protocoloList)}
                            </Select>
                        )}  
                        </FormItem>
                        <FormItem label="性质" >{getFieldDecorator("isFree", { rules: [{ required: true, message: '请您选择性质' }] })
                            (
                                <Select style={{ width: 150 }} placeholder="请选择">
                                    <Option value="1">免费</Option>
                                </Select>
                            )}  
                        </FormItem>
                        <FormItem label="模板图片" extra="格式:jpg/png&nbsp;&nbsp;&nbsp;&nbsp;大小:500k以内" >
                            {getFieldDecorator('templatePicList', { rules: [{ required: true, message: '请上传一张图片' }] })(
                            <div className="product-div">
                                <Upload
                                    {...props}
                                    accept="image/png,image/jpeg"
                                    listType="picture-card"
                                    className="avatar-uploader product-uploader"
                                    beforeUpload={this.beforeUpload}
                                    onChange={this.handleChange}
                                    defaultFileList={this.state.fileList}
                                    onPreview={this.handlePreview}
                                >
                                    {/* 限制最多五张图片 */}
                                    {this.state.fileList.length >= 5 ? null : uploadButton}
                                </Upload>
                                <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancelPreview}>
                                    <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
                                </Modal>
                            </div>
                        )}
                        </FormItem>
                        <FormItem label="描述">{getFieldDecorator('remark', {})(
                            <Input.TextArea onChange={this.textareaChange} maxLength={500} rows={3} placeholder="请您输入模板的描述内容" />
                        )}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default Form.create()(CreateH5Template);
