import React, { useState, useEffect } from 'react';
import { Modal, Form, Input,Select, Tabs,Upload,Button, Radio,notification} from 'antd';
const Item = Form.Item;
import { fileHost } from "../../../util/utils";
import './style.scss'
import axios from '../../../util/api.request';
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

const formrules = {
    strextVer:/^[a-zA-Z0-9_\-\.]{1,30}$/,
    verNam:/^[a-zA-Z0-9\u4e00-\u9fa5][a-zA-Z0-9_\u4e00-\u9fa5]{0,39}$/,
    mainVer:/^[0-9]*$/,
    url:/https?:\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/,
}

function Detail({
    updata:{ productId, schemeType, hetModuleTypeName='--', productName='--', phone='--' },
    form:{ getFieldDecorator, setFieldsValue,validateFields, resetFields },
    close,
}){
    const [firmwareList, setFirmwareList] = useState([]);
    const [selectedFirmwareLi, setSelectedFirmwareLi] = useState([]);
    const [curFirmwareTypeNo, setCurFirmwareTypeNo] = useState();
    const [firmwareFrPro, setFirmwareFrPro] = useState({})
    const { productFirmwareVersion=0, summaryVersions=[] } = firmwareFrPro;
    useEffect(() => {
        if(productId){
            axios.Post('manage-open/firmware/productFirmware/type/get',{productId,schemeType},{ headers: {"Content-Type":"application/json"}}).then(({data = {}}) => {
                
                let li = data.data || []
                console.log(7777,li)
                setFirmwareList(li)
                if(li.length>0){
                    const firstNo = li[0].firmwareTypeNo
                    setSelectedFirmwareLi([firstNo])
                    setCurFirmwareTypeNo(firstNo)
                }
            });

            axios.Post('manage-open/firmware/productFirmware/getLastProductVersion',{productId},{ headers: {"Content-Type":"application/json"}}).then(({data = {}}) => {
                data = data.data || {}
                setFirmwareFrPro(data)
            });
        }
    }, [productId])

    const uploadChange = ({file})=>{
        if(file.response){
            const url = file.response.data && file.response.data.url || '';
            setFieldsValue({ 
                [`filePath_${curFirmwareTypeNo}`]:url
            })
        }
    }
    const cngTab = cur=>{
        setCurFirmwareTypeNo(cur)
    }

    const finishComit=()=>{
        validateFields((err, values) => {
            console.log(111,values)
            if(!err){
                let deviceVersions = selectedFirmwareLi.map(firmwareTypeNo=>{
                    let o = firmwareList.find(a=>a.firmwareTypeNo==firmwareTypeNo) || {}
                    const { firmwareTypeName, deviceVersionType } = o;
                    const mainVersion = values[`mainVersion_${firmwareTypeNo}`],
                        extVersion = mainVersion,
                        totalVersion = values[`totalVersion_${firmwareTypeNo}`],
                        filePath = values[`filePath_${firmwareTypeNo}`];
                    return {
                        deviceVersionName:firmwareTypeName,
                        deviceVersionType,
                        firmwareVersionType:firmwareTypeNo,
                        mainVersion, extVersion, totalVersion, filePath,
                        productId
                    }
                })
                const { productFirmwareVersion, textTemplate } = values
                
                const params = {
                    productId, 
                    extVersion:productFirmwareVersion,
                    deviceVersionIds:summaryVersions[0]&&summaryVersions[0].deviceVersionId,
                    deviceVersions,
                    phone,
                    hetModuleTypeName,
                    textTemplate 
                }
                // console.log('---params--',params)
                axios.Post('manage-open/firmware/device/version/add',params,{ headers: {"Content-Type":"application/json"}}).then((res) => {
                    console.log(222,res)
                    close();
                    notification.success({ description: '升级成功' });
                    
                });

            }
        });

    }

   
    return (
        <Modal
            visible={true}
            width={600}
            title='升级'
            maskClosable={false}
            onCancel={close}
            onOk={finishComit}
            okText='升级通知'
            wrapClassName="ota_add_firmware_dialog"
            // afterClose={resetFields}
        >
            <Form {...formItemLayout}>
                <Item label="产品名称">{productName}</Item>
                <Item label="产品方案">{{'1':'免开发','2':'MCU方案','3':'Soc方案'}[schemeType]}</Item>
                <Item label="模组型号">{hetModuleTypeName}</Item>
                <Item label="产品版本号">
                    {getFieldDecorator('productFirmwareVersion', {
                        rules: [{ required: true, message: '请输入产品版本号'}]
                    })(
                        <Input maxLength={10} placeholder='请输入产品版本号' />
                    )}
                </Item>
                <Item label="当前产品版本号">{productFirmwareVersion}</Item>

                <Item label="模块/插件">
                    <Select placeholder="选择固件模块" onChange={v=>{setSelectedFirmwareLi(v)}} mode="multiple" value={selectedFirmwareLi}>
                        {
                            firmwareList.map(({firmwareTypeName,firmwareTypeNo},i) => {
                                return <Select.Option key={firmwareTypeNo} disabled={ schemeType==2 || i==0 } value={firmwareTypeNo}>{firmwareTypeName}</Select.Option>
                            })
                        }
                    </Select>
                </Item>

                <Tabs className='tabs'type="card" onChange={cngTab}>
                    {
                        selectedFirmwareLi.map( firmwareTypeNo =>{
                            const data = summaryVersions.find(a=>a.firmwareVersionType == firmwareTypeNo) || {}
                            const { firmwareVersionTypeName, totalVersion=0, curMainVersion=0 } = data;
                            return <Tabs.TabPane tab={firmwareVersionTypeName || firmwareList.find((a)=>a.firmwareTypeNo==firmwareTypeNo).firmwareTypeName } key={firmwareTypeNo} >
                                
                                <Item label='硬件版本号' >
                                    {getFieldDecorator(`totalVersion_${firmwareTypeNo}`, {
                                        initialValue:totalVersion,
                                    })(<Input className='noborderinpt' disabled />)}
                                </Item>
                                <Item label='当前软件版本号'>{curMainVersion}</Item>

                                <Item label="待上传软件版本号">
                                    {getFieldDecorator(`mainVersion_${firmwareTypeNo}`, {
                                        rules: [{ required: true, message: '待上传软件版本号'}]
                                    })(
                                        <Input maxLength={30} placeholder='请输入需上传的固件程序的软件版本号' />
                                    )}
                                </Item>
                                <Item label="固件程序">
                                    {getFieldDecorator(`filePath_${firmwareTypeNo}`, {
                                        rules: [{ required: true, message: '请输入URL' },{pattern: formrules.url, message: '请输入正确的URL'}]
                                    })(
                                        <Input maxLength={100} placeholder='请输入URL或者上传一个附件自动填充' />
                                    )}
                                </Item>
                            </Tabs.TabPane>
                        })
                    }    
                </Tabs>
                {
                    selectedFirmwareLi.length>0 &&
                    <Upload className='filepathinpt' onChange={uploadChange}
                        accept='.bin,.hex,.zip,.cyacd,.apk,.dpkg'
                        maxCount={1}
                        action={fileHost}
                        data={{ appId: 31438, domainType: 4, }}>
                            <Button type="primary" >上传附件</Button>
                            <div>支持.bin,.hex,.zip,.cyacd,.apk,.dpkg格式，不超过200MB。</div>
                    </Upload>
                }
                <Item label='通知方式' className='topborder'>短信通知</Item>
                <Item label='产品联系手机号'>{phone}</Item>
                <Item label='短信文案'>
                    {getFieldDecorator('textTemplate', {
                        rules: [{ required: true, message: '请输入短信文案'}],
                        initialValue:`尊敬的客户您好：clife平台已升级通信模组 ${hetModuleTypeName||'--'} ，您关联使用的产品 ${productName||'--'}，可进行设备模组固件升级，敬请留意~`
                    })(
                        <Input.TextArea maxLength={300} autoSize placeholder='请输入短信文案' />
                    )}
                </Item>
                     
            </Form>
        </Modal>
    )
}
export default Form.create()(Detail);