import React, { useState, useRef, useEffect } from 'react';
import { Modal, Button, Steps, Form, Input, Select, Radio } from 'antd';
import ConfigSchemeBrief from './configSchemeBrief'
import ConfigSchemeDetail from './configSchemeDetail'

const { Option } = Select

import './addScheme.less'

const { Step } = Steps
const stepList = ['选择品类方案', '配置方案简介', '配置方案详情']
const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
}

function OperateSchemeModal({ form, visible, handleOk, handleCancel }) {
  const [stepcurrent, setStepcurrent] = useState(0)
  const refConfig = useRef()
  const refDetail = useRef()

  // 上一步
  const clickPrevious = () => {
    setStepcurrent(stepcurrent - 1)
  }

  // 下一步
  const nextStep = () => {
    setStepcurrent(stepcurrent + 1)
  }

  // 下一步验证
  const clickNext = () => {
    if (stepcurrent === 0) {
      handleSubmit()
    } else if (stepcurrent === 1) {
      console.log(refConfig, '-----------refConfig')
      refConfig.current.onFinish()
    } else if (stepcurrent === 2) {
      console.log(refDetail, '-----------refDetail')
      refDetail.current.onFinish()
    }
  }

  // 选择三级品类
  const handleSelectChange = () => {

  }

  const changeRadio = e => {
    console.log('radio checked', e.target.value)
  }

  // 表单提交
  const handleSubmit = () => {
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        setStepcurrent(stepcurrent + 1)
      }
    })
  }

  const { getFieldDecorator, validateFields } = form;
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
            {stepList.map((item, index) => (
              <Step key={item} title={item} />
            ))}
          </Steps>
        </div>

        {/* 选择品类方案 */}
        {
          stepcurrent === 0 &&
          <Form labelCol={{ span: 10 }} wrapperCol={{ span: 14 }} onSubmit={() => handleSubmit()}>
            <Form.Item label="产品三级分类">
              {getFieldDecorator('deviceTypeId', {
                rules: [{ required: true, message: '请选择产品三级分类' }],
              })(
                <Select placeholder="请选择产品三级分类"
                  style={{ width: 220 }}
                  onChange={() => handleSelectChange()}>
                  <Option value="1">冰箱</Option>
                  <Option value="2">洗衣机</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item label="品类可支持方案">
              {
                getFieldDecorator('type', {
                  rules: [{ required: true, message: '请选择品类可支持方案' }],
                })(
                  <Radio.Group onChange={(e) => changeRadio(e)}>
                    <Radio style={radioStyle} value={1}>免开发方案</Radio>
                    <Radio style={radioStyle} value={2}>独立MCU方案</Radio>
                    <Radio style={radioStyle} value={3}>Soc方案</Radio>
                  </Radio.Group>
                )
              }
            </Form.Item>
          </Form>
        }

        {/* 配置方案简介 */}
        {
          stepcurrent === 1 &&
          <ConfigSchemeBrief
            wrappedComponentRef={refConfig}
            nextStep={nextStep} />
        }

        {/* 配置方案详情 */}
        {
          stepcurrent === 2 &&
          <ConfigSchemeDetail
            wrappedComponentRef={refDetail} />
        }

      </div>
    </Modal>
  )
}

export default Form.create()(OperateSchemeModal)
