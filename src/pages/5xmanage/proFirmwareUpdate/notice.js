import React, { useState, useEffect, useRef } from 'react';
import { Tabs, Modal, Button, Steps, message } from 'antd';
import { subFinishData } from '../../../apis/upNotice'
import StepFirst from './oneStep'
import StepSecond from './twoStep'
import StepThird from './thirdStep'
import { cloneDeep } from "lodash"
const { TabPane } = Tabs
const { Step } = Steps
const stepList = ['更新模组固件', '选择产品对象', '发送升级通知']
function Addmodal({ noticeVis, handleCancel, handleOk, actionData }) {
    const [stepcurrent, setStepcurrent] = useState(0) // 编辑从0开始   更新直接跳到第三步
    const ref1 = useRef()
    const ref2 = useRef()
    const ref3 = useRef()
    const sundata = () => {
    }
    const [subObj, setSubObj] = useState({ one: {}, two: {}, three: {} }) // 最后提交的数据
    // 上一步
    const clickPrevious = () => {
        setStepcurrent(stepcurrent - 1)
    }

    // 下一步验证
    const clickNext = () => {
        if (stepcurrent === 0) {
            ref1.current.onFinish()
        } else if (stepcurrent === 1) {
            ref2.current.onFinish()
        } else if (stepcurrent === 2) {
            ref3.current.onFinish()
        }
    }

    // 切换步骤
    const setStepCur = (num = 0, val) => {
        if (stepcurrent === 0) {
            setSubObj(pre => {
                let obj = cloneDeep(pre)
                obj.one = cloneDeep(val)
                return obj
            })
        } else if (stepcurrent === 1) {
            setSubObj(pre => {
                let obj = cloneDeep(pre)
                obj.two = cloneDeep(val)
                return obj
            })
        }
        setStepcurrent(num)
    }
    const commitAll = val => {
        let productDTOList = subObj.two.map(item => {
            return {
                productId: item.productId,
                productName: item.productName,
                contact: item.contact,
                tel: item.tel
            }
        })
        let params = {
            textTemplate: '尊敬的客户您好：clife平台已升级通信模组 {模组名称} ，您关联使用的产品 {产品名称}，可进行设备模组固件升级，敬请留意~',
            version: subObj.one.deviceVersionType,
            hetModuleTypeName: actionData.moduleName,
            productDTOList
        }
        subFinishData(params).then(res => {
            if (res.data.code === 0) {
                message.success('操作成功')
                handleCancel()
            }
        })
    }
    return (
        <Modal
            title="更新通知"
            visible={noticeVis}
            onOk={sundata}
            onCancel={handleCancel}
            width={'800px'}
            wrapClassName="module-upgrade-notice"
            footer={[
                stepcurrent !== 0 && <Button key="previous" onClick={() => clickPrevious()}>上一步</Button>,
                <Button type="primary" key="next" onClick={() => clickNext()}>{stepcurrent === 2 ? '升级通知' : '下一步'}</Button>
            ]}
        >
            <div className='add-scheme-modal'>
                <div className={`step-box `}>
                    <Steps current={stepcurrent}>
                        {stepList.map((item, index) => (<Step key={item} title={item} />))}
                    </Steps>
                </div>
                <div className='formbox'>
                    <Tabs activeKey={stepcurrent + ""} animated={false}>
                        <TabPane tab="基本参数" key={'0'}>
                            <StepFirst
                                setStepCur={setStepCur}
                                wrappedComponentRef={ref1} actionData={actionData} />
                        </TabPane>
                        <TabPane tab="功能参数" key={'1'}>
                            <StepSecond
                                setStepCur={setStepCur}
                                subObj={subObj}
                                wrappedComponentRef={ref2}
                                actionData={actionData}
                            />
                        </TabPane>
                        <TabPane tab="功能参数" key={'2'}>
                            <StepThird
                                wrappedComponentRef={ref3} actionData={actionData} commitAll={commitAll} />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </Modal>
    )

}
export default Addmodal