import React, { useState, useRef, useEffect } from 'react';
import { Modal, Button, Steps, Form, Tabs, message } from 'antd';
import ChooseScheme from './chooseScheme';
import ConfigSchemeBrief from './configSchemeBrief'
import ConfigSchemeDetail from './configSchemeDetail'
import { cloneDeep } from "lodash"
import { saveSchemeRequest, updateSchemeRequest } from '../../../apis/schemeManagement'

import './addScheme.less'

const { TabPane } = Tabs
const { Step } = Steps
const stepList = ['选择品类方案', '配置方案简介', '配置方案详情']

function OperateSchemeModal({ visible, handleOk, handleCancel,
  thirdCategoryList,
  communicationMethodsList,
  getTableData,
  opeType,
  editData }) {
  const [stepcurrent, setStepcurrent] = useState(0)
  const refScheme = useRef()
  const refConfig = useRef()
  const refDetail = useRef()
  const [subObj, setSubObj] = useState({ one: {}, two: {}, three: {} }) // 最后提交的数据

  // 上一步
  const clickPrevious = () => {
    setStepcurrent(stepcurrent - 1)
  }

  // 下一步验证
  const clickNext = () => {
    if (stepcurrent === 0) {
      console.log(refScheme, 'refScheme')
      refScheme.current.onFinish()
    } else if (stepcurrent === 1) {
      refConfig.current.onFinish()
    } else if (stepcurrent === 2) {
      refDetail.current.onFinish()
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
    console.log(params)
    if (opeType === 'edit') {
      params.id = editData.id
      console.log(params)
      updateSchemeRequest(params).then(res => {
        if (res.data.code === 0) {
          message.success(`提交成功`)
          handleCancel()
          getTableData()
        }
      })
    } else {
      saveSchemeRequest(params).then(res => {
        if (res.data.code === 0) {
          message.success(`提交成功`)
          handleCancel()
          getTableData()
        }
      })
    }
  }

  return (
    <Modal title={opeType === 'edit' ? '编辑' : '新增'} width={900}
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
                thirdCategoryList={thirdCategoryList}
                wrappedComponentRef={refScheme}
                setStepCur={setStepCur}
                editData={editData}
                opeType={opeType} />
            </TabPane>
            <TabPane tab="配置方案简介" key={'1'}>
              <ConfigSchemeBrief
                communicationMethodsList={communicationMethodsList}
                wrappedComponentRef={refConfig}
                setStepCur={setStepCur}
                editData={editData}
                opeType={opeType} />
            </TabPane>
            <TabPane tab="配置方案详情" key={'2'}>
              <ConfigSchemeDetail
                wrappedComponentRef={refDetail}
                setStepCur={setStepCur}
                commitAll={commitAll}
                editData={editData}
                opeType={opeType} />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </Modal>
  )
}

export default Form.create()(OperateSchemeModal)
