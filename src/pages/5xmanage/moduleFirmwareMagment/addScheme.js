import React, { useState, useRef, useEffect } from 'react'
import { Modal, Button, Steps, Form, Tabs } from 'antd'
import { cloneDeep } from "lodash"
import StepFirst from './stepFirst'
import StepSecond from './stepSecond'
import StepThird from './stepThird'

import './addScheme.less'

const { TabPane } = Tabs
const { Step } = Steps
const stepList = ['基本参数', '功能参数', '文件上传']

function OperateSchemeModal({ form, visible, handleOk, handleCancel }) {
  const [stepcurrent, setStepcurrent] = useState(2)
  const ref1 = useRef()
  const ref2 = useRef()
  const ref3 = useRef()
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

  // 提交所有数据
  const commitAll = (values) => {
    let params = { ...subObj.one, ...subObj.two, ...values }
    console.log('提交的数据', params)
  }

  return (
    <Modal title="新增" width={900}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      maskClosable={false}
      wrapClassName="module-add-scheme"
      footer={[
        stepcurrent !== 0 && <Button key="previous" onClick={() => clickPrevious()}>上一步</Button>,
        <Button type="primary" key="next" onClick={() => clickNext()}>{stepcurrent === 2 ? '提交' : '下一步'}</Button>
      ]}>
      <div className="add-scheme-modal">
        <div className="step-box">
          <Steps current={stepcurrent}>
            {stepList.map((item, index) => (<Step key={item} title={item} />))}
          </Steps>
        </div>
        <div className='formbox'>
          <Tabs activeKey={stepcurrent + ""} animated={false}>
            <TabPane tab="基本参数" key={'0'}>
              <StepFirst
                wrappedComponentRef={ref1}
                setStepCur={setStepCur} />
            </TabPane>
            <TabPane tab="功能参数" key={'1'}>
              <StepSecond
                wrappedComponentRef={ref2}
                setStepCur={setStepCur} />
            </TabPane>
            <TabPane tab="功能参数" key={'2'}>
              <StepThird
                wrappedComponentRef={ref3} />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </Modal>
  )
}

export default Form.create()(OperateSchemeModal)
