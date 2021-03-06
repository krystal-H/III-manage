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
    updata:{ productId, schemeType, hetModuleTypeName='--', productName='--', tel='--' },
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

                setSelectedFirmwareLi([])
                // setCurFirmwareTypeNo()
                // if(li.length>0){
                //     const firstNo = li[0].firmwareTypeNo
                //     setSelectedFirmwareLi([firstNo])
                //     setCurFirmwareTypeNo(firstNo)
                // }
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
        if(file.status=="removed"){ //????????????
            setFieldsValue({ 
                [`filePath_${curFirmwareTypeNo}`]:""
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
                    const extVersion = values[`extVersion_${firmwareTypeNo}`],
                        totalVersion = values[`totalVersion_${firmwareTypeNo}`],
                        filePath = values[`filePath_${firmwareTypeNo}`];
                    return {
                        deviceVersionName:firmwareTypeName,
                        deviceVersionType,
                        firmwareVersionType:firmwareTypeNo,
                        mainVersion:"", extVersion, totalVersion, filePath,
                        productId
                    }
                })
                const { productFirmwareVersion, textTemplate } = values
                
                const params = {
                    productId, 
                    extVersion:productFirmwareVersion,
                    deviceVersionIds:summaryVersions[0]&&summaryVersions[0].deviceVersionId,
                    deviceVersions,
                    phone:tel,
                    hetModuleTypeName,
                    textTemplate 
                }
                // console.log('---params--',params)
                axios.Post('manage-open/firmware/device/version/add',params,{ headers: {"Content-Type":"application/json"}}).then((res) => {
                    console.log(222,res)
                    close();
                    notification.success({ description: '????????????' });
                    
                });

            }
        });

    }

    const deselectVal = d=>{
        if(curFirmwareTypeNo==d){
            setCurFirmwareTypeNo(selectedFirmwareLi[0])
        }
    }
    const selectVal = s=>{
        setCurFirmwareTypeNo(s)
        setFieldsValue({ 
            [`filePath_${s}`]:'',
            [`extVersion_${s}`]:''
        })
    }

   
    return (
        <Modal
            visible={true}
            width={600}
            title='??????'
            maskClosable={false}
            onCancel={close}
            onOk={finishComit}
            okText='????????????'
            wrapClassName="ota_add_firmware_dialog"
            // afterClose={resetFields}
        >
            <Form {...formItemLayout}>
                <Item label="????????????">{productName}</Item>
                <Item label="????????????">{{'1':'?????????','2':'MCU??????','3':'Soc??????'}[schemeType]}</Item>
                <Item label="????????????">{hetModuleTypeName}</Item>
                <Item label="???????????????">
                    {getFieldDecorator('productFirmwareVersion', {
                        rules: [{ required: true, message: '????????????????????????'}]
                    })(
                        <Input maxLength={10} placeholder='????????????????????????' />
                    )}
                </Item>
                <Item label="?????????????????????">{productFirmwareVersion}</Item>

                <Item label="??????" >

                    {getFieldDecorator('noneed', {
                        rules: [{ required: true, message: '??????????????????'}]
                    })(

                        <Select placeholder="??????????????????" onChange={v=>{setSelectedFirmwareLi(v)}} mode="multiple" 
                            onDeselect={ deselectVal }
                            onSelect = { selectVal }
                                
                        >
                            {
                                firmwareList.map(({firmwareTypeName,firmwareTypeNo},i) => {
                                    return <Select.Option key={firmwareTypeNo}  value={firmwareTypeNo}>{firmwareTypeName}</Select.Option>
                                })
                            }
                        </Select>
                    )}


                </Item>

                {
                    selectedFirmwareLi.length>0 && <>
                    <Tabs type="card" onChange={cngTab}>
                       { selectedFirmwareLi.map( firmwareTypeNo =>{
                            const data = summaryVersions.find(a=>a.firmwareVersionType == firmwareTypeNo) || {}
                            const { firmwareVersionTypeName, totalVersion="", curExtVersion="" } = data;
                            return <Tabs.TabPane tab={firmwareVersionTypeName || firmwareList.find((a)=>a.firmwareTypeNo==firmwareTypeNo).firmwareTypeName } key={firmwareTypeNo} >
                                
                                <Item label='???????????????' >
                                    {getFieldDecorator(`totalVersion_${firmwareTypeNo}`, {
                                        initialValue:totalVersion,
                                    })(<Input maxLength={50} placeholder='????????????????????????' />)}
                                </Item>
                                <Item label='?????????????????????'>{curExtVersion}</Item>

                                <Item label="????????????????????????">
                                    {getFieldDecorator(`extVersion_${firmwareTypeNo}`, {
                                        rules: [{ required: true, message: '????????????????????????'}]
                                    })(
                                        <Input maxLength={30} placeholder='???????????????????????????????????????????????????' />
                                    )}
                                </Item>
                                <Item label="????????????">
                                    {getFieldDecorator(`filePath_${firmwareTypeNo}`, {
                                        rules: [{ required: true, message: '?????????URL' },{pattern: formrules.url, message: '??????????????????URL'}]
                                    })(
                                        <Input maxLength={100} placeholder='?????????URL????????????????????????????????????' />
                                    )}
                                </Item>
                            </Tabs.TabPane>
                            })
                        }
                    </Tabs>
                    <Upload className='filepathinpt' onChange={uploadChange}
                        accept='.bin,.hex,.zip,.cyacd,.apk,.dpkg'
                        maxCount={1}
                        action={fileHost}
                        data={{ appId: 31438, domainType: 4, }}>
                            <Button type="primary" >????????????</Button>
                            <div>??????.bin,.hex,.zip,.cyacd,.apk,.dpkg??????????????????200MB???</div>
                    </Upload>
                </>}
                
                <Item label='????????????'>????????????</Item>
                <Item label='?????????????????????'>{tel}</Item>
                <Item label='????????????'>
                    {getFieldDecorator('textTemplate', {
                        rules: [{ required: true, message: '?????????????????????'}],
                        initialValue:`????????????????????????clife??????????????????????????? ${hetModuleTypeName||'--'} ??????????????????????????? ${productName||'--'}???????????????????????????????????????????????????~`
                    })(
                        <Input.TextArea maxLength={300} autoSize placeholder='?????????????????????' />
                    )}
                </Item>
                     
            </Form>
        </Modal>
    )
}
export default Form.create()(Detail);