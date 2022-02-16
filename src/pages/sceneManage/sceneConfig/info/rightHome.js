import React, { useState, useEffect, useContext, useRef } from 'react';
import { Tabs, Form, Input, Upload, Icon, Select, Checkbox, Button, notification } from 'antd';
import { fileHost } from "../../../../util/utils";
import { getAIList, getAppList, saveGloalInfo, getsceneDetail } from '../../../../apis/ruleSet'
import { Context } from "./index";
import UploadCom from '../../../../components/uploadCom/index'
const { TabPane } = Tabs;
const { TextArea } = Input;
const FormItem = Form.Item

// 上传地址
const uploadConfigs = {
    action: fileHost,
    data: file => ({ appId: 31438, domainType: 4 })
}
function RightComH({ form }) {
    const { getFieldDecorator, validateFields, getFieldValue, getFieldsValue, setFieldsValue } = form;
    const { state, dispatch, wholeScenceId } = useContext(Context);
    const [aiList, setAiList] = useState([])
    const [appList, setAppList] = useState([])
    const [originData, setOriginData] = useState({})
    const [initImg, setInitImg] = useState('')
    const [fileLists, setFileLists] = useState([])
    const $el1 = useRef(null)
    const onChangeFile = ({ file, fileList }) => {
        setFileLists(fileList)
    }
    const beforeUpload = (file, type) => {
        // return new Promise((resolve, reject) => {
        //     let isFormal = type.indexOf(file.name.split('.').slice(-1)[0]) > -1
        //     if (!isFormal) {
        //         message.error(`只能上传${type.join(',')}格式`);
        //         return reject(false)
        //     }
        //     return resolve(true)
        // })
    }
    const normFile = e => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };
    //保存
    const saveData = () => {

        validateFields().then(val => {
            for (let key in val) {
                if (typeof val[key] === 'undefined') {
                    delete val[key]
                }
                if (key === 'appIds') {
                    val.appIds = val.appIds.join(',')
                }
            }
            if(val.pictureUrl && val.pictureUrl.length){
                val.pictureUrl=val.pictureUrl[0].url
            }
            val.sceneId = wholeScenceId
            saveGloalInfo(val).then(res => {
                if (res.data.code == 0) {
                    notification.success({
                        message: '提示',
                        description: '修改成功',
                    });
                    dispatch({ type: "saveWhole", payload: val })
                }
            })
        })

    }
    // useEffect(() => {
    //     dispatch({ type: "saveCheck", payload: getFieldsValue })
    // }, [state.showTab])
    useEffect(() => {
        getAIList().then(res => {
            if (res.data.code == 0) {
                setAiList(res.data.data.list)
            }
        })
        let pamams = { paged: false }
        getAppList(pamams).then(res => {
            if (res.data.code == 0) {
                let data = res.data.data.map(item => {
                    return { label: item.appName, value: item.appId }
                })
                setAppList(data)
            }
        })
        getSceneInfo()
    }, [])
    //获取详情
    const getSceneInfo = () => {
        getsceneDetail(wholeScenceId).then(res => {
            if (res.data.code == 0) {
                let data = res.data.data.scene
                // setOriginData(res.data.data.scene)
                let relSceneApps = data.relSceneApps.map(item => {
                    return item.sceneId
                })
                
                let imgArr=[]
                if (data.pictureUrl) {
                    imgArr=[{ url: data.pictureUrl, uid: 1 }]
                    $el1.current.setFileList(imgArr)
                }
                let obj = {
                    sceneName: data.sceneName,
                    summary: data.summary,
                    appIds: relSceneApps,
                    pictureUrl:imgArr
                }
                if (data.aiId) {
                    obj.aiId = data.aiId
                }
                form.setFieldsValue(obj)
                dispatch({ type: "saveWhole", payload: data })
            }
        })
    }
    return (
        <div >
            <div className='content'>
                <div className='tab1'>
                    <Form colon={false}>
                        <FormItem label="场景名称">
                            {getFieldDecorator('sceneName', { rules: [{ required: true, message: '请输入场景名称' }] })(
                                <Input style={{ width: '100%' }} ></Input>
                            )}
                        </FormItem>
                        <FormItem label="场景描述">
                            {getFieldDecorator('summary', {})(
                                <TextArea style={{ width: '100%' }} ></TextArea>
                            )}
                        </FormItem>
                        <FormItem label="场景图片" >
                            {getFieldDecorator('pictureUrl', {})(
                                <UploadCom
                                    ref={$el1}
                                    listType="picture-card"
                                    maxCount={1}
                                    isNotImg={false}
                                    maxSize={10} />
                                // <div>
                                //     <Upload
                                //         className="avatar-uploader"
                                //         {...uploadConfigs}
                                //         accept=".png,.jpg"
                                //         onChange={onChangeFile}
                                //         listType="picture-card"
                                //         style={{ width: '100px' }}
                                //         fileList={fileLists}
                                //         beforeUpload={(file) => { return beforeUpload(file, ['png', 'jpg']) }}
                                //     >
                                //         {fileLists.length ? null : <span>
                                //             <Icon type="upload" /> 选择背景图
                                //         </span>}
                                //     </Upload>
                                //     {/* {!initImg ? null : <img src={initImg} />} */}
                                // </div>

                            )}
                        </FormItem>
                        <FormItem label="关联AI能力">
                            {getFieldDecorator('aiId')(
                                <Select allowClear>
                                    {
                                        aiList.map((item, index) => (
                                            <Select.Option key={item.aiId} value={item.aiId} label={item.aiName}>
                                                {item.aiName}
                                            </Select.Option>
                                        ))
                                    }
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label="关联APP" >
                            {getFieldDecorator('appIds')(
                                <Checkbox.Group options={appList} />
                            )}

                        </FormItem>
                        {/* <FormItem label="生效时间" >
                        {getFieldDecorator('time')(
                            <Checkbox.Group options={timeWeek} />
                        )}
                    </FormItem> */}
                        <div className='tab-btn'>
                            <Button type="primary" onClick={saveData}>保存</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}
export default Form.create()(RightComH)