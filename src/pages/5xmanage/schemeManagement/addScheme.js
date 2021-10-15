import React, { useState, useRef, useEffect } from 'react';
import { Modal, Button, Steps, Form, Tabs } from 'antd';
import ChooseScheme from './chooseScheme';
import ConfigSchemeBrief from './configSchemeBrief'
import ConfigSchemeDetail from './configSchemeDetail'

import './addScheme.less'

const { TabPane } = Tabs
const { Step } = Steps
const stepList = ['选择品类方案', '配置方案简介', '配置方案详情']

function OperateSchemeModal({ form, visible, handleOk, handleCancel }) {
  const [stepcurrent, setStepcurrent] = useState(0)
  const refScheme = useRef()
  const refConfig = useRef()
  const refDetail = useRef()

  // 上一步
  const clickPrevious = () => {
    setStepcurrent(stepcurrent - 1)
  }

  // 下一步验证
  const clickNext = () => {
    if (stepcurrent === 0) {
      refScheme.current.onFinish()
    } else if (stepcurrent === 1) {
      refConfig.current.onFinish()
    } else if (stepcurrent === 2) {
      refDetail.current.onFinish()
    }
  }

  // 当前步骤
  const setStepCur = (num = 0) => {
    setStepcurrent(num)
  }

  return (
    <Modal title="新增" width={900}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      maskClosable={false}
      wrapClassName="add-scheme"
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
            <TabPane tab="选择品类方案" key={'0'}>
              <ChooseScheme
                wrappedComponentRef={refScheme}
                setStepCur={setStepCur} />
            </TabPane>
            <TabPane tab="配置方案简介" key={'1'}>
              <ConfigSchemeBrief
                wrappedComponentRef={refConfig}
                setStepCur={setStepCur} />
            </TabPane>
            <TabPane tab="配置方案详情" key={'2'}>
              <ConfigSchemeDetail
                wrappedComponentRef={refDetail}
                setStepCur={setStepCur} />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </Modal>
  )
}

export default Form.create()(OperateSchemeModal)
