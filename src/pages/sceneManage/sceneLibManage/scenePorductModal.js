import React, { useState, useEffect } from 'react'
import { Form, Input, Modal, message } from 'antd'
import {
  getExtendFuncsRequest,
  deleteExtendFuncsRequest,
  getStatusQueryRequest,
  deleteStatusQueryRequest
} from '../../../apis/sceneLibList'
import './scenePorductModal.less'

const { confirm } = Modal

function ScenePorductModal({ visible, handleOk, handleCancel, sceneProductDetail = {} }) {
  const [funcList, setFuncList] = useState([])
  const [statusList, setStatusList] = useState([])

  useEffect(() => {
    getStatusQuery()
    getExtendFuncs()
  }, [])

  // 获取功能控制列表
  const getExtendFuncs = () => {
    getExtendFuncsRequest({ deviceTypeId: sceneProductDetail.deviceTypeId })
      .then(res => {
        if (res.data.code === 0) {
          setFuncList(res.data.data)
        }
      })
  }

  // 获取状态查询列表
  const getStatusQuery = () => {
    getStatusQueryRequest({ deviceTypeId: sceneProductDetail.deviceTypeId })
      .then(res => {
        if (res.data.code === 0) {
          setStatusList(res.data.data)
        }
      })
  }

  // 删除数据
  const deleteItem = (item, type) => {
    confirm({
      content: '是否确定删除本条数据？',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        if (type === 'func') {
          deleteExtendFuncs(item)
        }
        if (type === 'status') {
          deleteStatusQuery(item)
        }
      },
      onCancel() { },
    })
  }

  // 删除功能控制
  const deleteExtendFuncs = (item) => {
    deleteExtendFuncsRequest({ deviceFunctionId: item.deviceFunctionId }).then(res => {
      if (res.data.code === 0) {
        getExtendFuncs()
      }
    })
  }

  // 删除状态查询
  const deleteStatusQuery = (item) => {
    deleteStatusQueryRequest({ statusQueryId: item.statusQueryId }).then(res => {
      if (res.data.code === 0) {
        getStatusQuery()
      }
    })
  }

  return (
    <Modal title="查看详情"
      width={800}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      maskClosable={false}
      wrapClassName="scene-porduct-modal"
    >
      <div className='scene-porduct-modal-it'>
        <div className='title' style={{ paddingTop: 0 }}>基本属性</div>
        <Form labelAlign='left'>
          <Form.Item label="设备大类">
            {
              sceneProductDetail.level === 2 ?
                sceneProductDetail.parent.deviceTypeName :
                sceneProductDetail.level === 3 ? sceneProductDetail.grand.deviceTypeName : ''
            }
          </Form.Item>
          <Form.Item label="设备小类">
            {
              sceneProductDetail.level === 2 ?
                sceneProductDetail.deviceTypeName :
                sceneProductDetail.level === 3 ? sceneProductDetail.parent.deviceTypeName : ''
            }
          </Form.Item>
          <Form.Item label="输入输出类型">
            {sceneProductDetail.inoutType.inoutTypeName}
          </Form.Item>
          <Form.Item label="安全级别">
            {sceneProductDetail.securityLevel.securityLevelName}
          </Form.Item>
          <Form.Item label="设备场景自定义">
            {
              sceneProductDetail.customizable === 1 ? '是' : '否'
            }
          </Form.Item>
        </Form>
        <div className='title'>扩展功能</div>
        <div className='func-box'>
          <div className='func-box-title'>状态查询：</div>
          <div className='func-box-cont'>
            {
              statusList && statusList.map((item, index) => (
                <div key={item.statusQueryId}>
                  <div>功能{index + 1}：{item.statusQueryName}</div>
                  <div className='func-params'>
                    <div className='func-params-title'>功能参数:</div>
                    <div className='func-params-box'>
                      {
                        item.queryParams && item.queryParams.map(item2 => (
                          <div key={item2.queryParamId} className='func-params-cont'>
                            {item2.queryParamName}：{item2.queryParamValue}
                          </div>
                        ))
                      }
                      <div className='delete-btn' onClick={() => deleteItem(item, 'status')}>删除</div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        <div className='func-box'>
          <div className='func-box-title'>功能控制：</div>
          <div className='func-box-cont'>
            {
              funcList && funcList.map((item, index) => (
                <div key={item.deviceFunctionId}>
                  <div>功能{index + 1}：{item.deviceFunctionName}</div>
                  <div className='func-params'>
                    <div className='func-params-title'>功能参数:</div>
                    <div className='func-params-box'>
                      {
                        item.functionParams && item.functionParams.map(item2 => (
                          <div key={item2.functionParamId} className='func-params-cont'>
                            {item2.functionParamName}：{item2.functionParamValue}
                          </div>
                        ))
                      }
                      <div className='delete-btn' onClick={() => deleteItem(item, 'func')}>删除</div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ScenePorductModal
