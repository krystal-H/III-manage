import React, { Component } from 'react';
import { Card, Form, Button, Input, Select, Upload, Icon, Modal, message } from 'antd'
import { H5TemplateInfoRequest } from '../../../apis/h5Template'
import {SaveTemplateRequest} from "../../../apis/h5Template"
import './CreateH5Template.less';
import {cloneDeep} from 'lodash';
import { fileHost } from '../../../util/utils'
const FormItem = Form.Item;
const Option = Select.Option;

export class H5TemplateInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            templateInfo: {},
            fileList: [],
            // templateId: "",
            // templateName: "",
            // protocolTemplateName: "",
            // deviceSubtypeName: "",
            // deviceTypeName: "",
            // isFree: "",
            // remark: "",
            // status: "",
            // productName: ""
            productNameList:[]
        };
    }

    // 加载数据
    componentWillMount() {
        let params = this.props.match.params
        if(params && params.templateId){
            this.getH5TemplateInfo(params.templateId);
        }
    }

    getH5TemplateInfo = (templateId) => {
        this.setState({loading:true});
        H5TemplateInfoRequest({ templateId: templateId }).then(response => {
            let { data } = response;
            if (data.code === 0) {
                let arr = this.doWithPages(data.data);
                this.setState({
                    templateInfo: data.data,
                    fileList:arr
                })
            }
        }).finally(
            () => {
              this.setState(() => ({
                loading: false,
              }))
            }
          );
    }

    doWithPages=(data)=>{
        let arr = [];
        for (let index = 0; index <= 5; index++) {
            let indexStr = `page${index}`;
            let url = data[indexStr];
            if (data[indexStr]) {
                arr.push({ "url": url, status: "done", type: "image/png", name:`page${index}`,uid: index })
            }
        }
        return arr;
    }

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await this.getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    handleCancelPreview = () => {
        this.setState({
            previewVisible: false
        });
    }

    // 图片上传触发了
    handleChange = info => {
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

    getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    handleSubmit =()=>{
        const { templateInfo,fileList } = this.state;
        let pages = {};

        if (fileList.length <= 0) {
            message.warning('请上传模板图片!');
            return ;
        }

        fileList.map((item, index) => {
            if (item.status === 'done') {
                // 转后台需要的格式 
                if(item.hasOwnProperty("url")){
                    pages[`page${index + 1}`] = item.url;
                }else{
                    pages[`page${index + 1}`] = item.response.data.url;
                }
            }
        });

        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("values =====" ,values);
                // 处理为后台需要的格式
                let obj ={
                    ...values,
                    templateNumber: templateInfo.templateNumber,
                    templateId:templateInfo.templateId,
                    deviceTypeId:templateInfo.deviceTypeId,
                    deviceSubtypeId: templateInfo.deviceSubtypeId,
                    ...pages
                };
                delete obj.templatePicList;
                this.setState({ loading: true });
                SaveTemplateRequest(obj).then(response => {
                    let { data } = response;
                    if (data.code === 0) {
                        message.success(`模板信息更新成功`, 3,this.props.history.goBack())
                    }
                }).finally(
                    () => {
                      this.setState(() => ({
                        loading: false,
                      }))
                    }
                  );
            }
        });
    }

    getCategoryList =(allCategoryName)=>{
        if (typeof(allCategoryName)=='string'){
            return allCategoryName.split( "-" );  
        }else{
            return ["","",""]
        }
    }

    usercodeValidator =(rule, value, callback)=>{
        if (!value) {
            callback('内容不能为空');
            return;
          }
    }

    render() {
        const props = {
            action: fileHost,
            data: file => ({
                appId: 31438,
                domainType: 4
            })
        };
        const { templateInfo,fileList } = this.state;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 9 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 15 },
            },
        };

        const uploadButton = (
            <div>
                <Icon type={'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        let pro =  this.getCategoryList(templateInfo.allCategoryName);
        return (
            <div>
                <Card title="模板基本信息" loading={this.state.loading}>
                    <Form layout="horizontal"  className="CreataH5Template_from"  >
                        <FormItem  label="模板名称" {...formItemLayout}  >
                            {getFieldDecorator('templateName', {initialValue: templateInfo.templateName, rules: [{ required: true, message: '模板名称不能为空' }] })
                                (
                                    <Input
                                        style={{ width: '460px' }}
                                        type="text"
                                        placeholder="请输入您喜欢的模板名称"
                                        disabled={Boolean(templateInfo.status)}
                                        allowClear={Boolean(!templateInfo.templateId)}
                                        maxLength={20} 
                                    />
                                )
                            }
                        </FormItem>
                        <Form.Item className="chooseProduct" label="所属分类" {...formItemLayout} >
                            <Form.Item style={{ display: 'inline-block', width: '150px' }} >
                                {getFieldDecorator("deviceTypeId", {initialValue: pro[0], rules: [{ required: true, message: '请您选择一级类目' }] })(
                                    <Select
                                        disabled={Boolean(templateInfo.templateId)}
                                        placeholder="一级类目"
                                       >
                                    </Select>
                                )}
                            </Form.Item>

                            <span> </span>

                            <Form.Item style={{ display: 'inline-block', width: '150px' }} >
                                {getFieldDecorator("deviceSubtypeId", {initialValue: pro[1], rules: [{ required: true, message: '请您选择二级类目' }] })(
                                    <Select
                                        disabled={Boolean(templateInfo.templateId)}
                                        placeholder="二级类目"
                                        >
                                    </Select>
                                )}
                            </Form.Item>

                            <span> </span>
                            <Form.Item style={{ display: 'inline-block', width: '150px' }} >
                                {getFieldDecorator("deviceSubtypeId", {initialValue: pro[2],rules: [{ required: true, message: '请您选择三级类目' }] })(
                                    <Select 
                                        disabled={Boolean(templateInfo.templateId)}
                                        initialValue={templateInfo.deviceSubtypeId} placeholder="三级类目"
                                     >
                                    </Select>
                                )}
                            </Form.Item>
                        </Form.Item>

                        <FormItem {...formItemLayout} label="产品协议" >
                            {getFieldDecorator("templateNumber", {initialValue:templateInfo.protocolTemplateName, rules: [{ required: true, message: '请您选择协议' }] })
                            (
                                    <Select disabled={Boolean(templateInfo.templateId)} style={{ width: 150 }} placeholder="请选择协议">
                                        {/* {this.makeProtocoloOption(this.state.protocoloList)} */}
                                    </Select>
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label="性质" >
                            {
                                getFieldDecorator("isFree", {initialValue:1, rules: [{ required: true, message: '请您选择性质' }] })
                                    (
                                        <Select disabled={Boolean(templateInfo.templateId)} style={{ width: 150 }} placeholder="请选择">
                                            <Option value={1}>免费</Option>
                                        </Select>
                                    )
                            }
                        </FormItem>
                        <FormItem {...formItemLayout} label="模板图片" extra="格式:jpg/png&nbsp;&nbsp;&nbsp;&nbsp;大小:500k以内" >
                            {getFieldDecorator('templatePicList', {initialValue:fileList,rules: [{ required:true, message: '请上传一张图片' }] })(
                                <div className="product-div">
                                    <Upload
                                        {...props}
                                        accept="image/png"
                                        listType="picture-card"
                                        className="avatar-uploader product-uploader"
                                        beforeUpload={this.beforeUpload}
                                        onChange={this.handleChange}
                                        defaultFileList={this.state.fileList}
                                        onPreview={this.handlePreview}
                                    >
                                        {/* 限制最多五张图片 */}
                                        {fileList.length >= 5 ? null : uploadButton}
                                    </Upload>
                                    <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancelPreview}>
                                        <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
                                    </Modal>
                                </div>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="描述">
                            {getFieldDecorator('remark', { initialValue: templateInfo.remark, })
                                (
                                    <Input.TextArea disabled={Boolean(this.state.status)}
                                        style={{ width: 460 }} onChange={this.textareaChange}
                                        maxLength={500} rows={3} placeholder="请您输入模板的描述内容" />
                                )}
                        </FormItem>
                        {Boolean(this.state.status)?<div></div>:<FormItem style={{ textAlign: "center" }}>
                            <Button type="primary" onClick={this.handleSubmit}>保存</Button>
                        </FormItem>}
                    </Form>
                </Card>
            </div>
        );
    }
}

export default Form.create()(H5TemplateInfo);
