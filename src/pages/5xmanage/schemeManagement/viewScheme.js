import React, { useState, useEffect } from 'react'
import { Modal, Descriptions, Table } from "antd";
import { getObjectModalRequest, getFuncListRequest, getModuleByModuleTypeRequest } from '../../../apis/schemeManagement'
import './viewScheme.less';

const schemeMap = {
  1: '免开发方案',
  2: '独立MCU方案',
  3: 'Soc方案'
}

function ViewScheme({ visible, handleOk, handleCancel, editData = {}, thirdCategoryList, communicationMethodsList }) {
  const [category, setCategory] = useState('')
  const [objectModalList, setObjectModalList] = useState([]) // 物模型列表
  const [moduleIdsList, setModuleIdsList] = useState([]) // 模组列表
  const [protocol, setProtocol] = useState([]) // 通讯协议

  useEffect(() => {
    getObjectModal()
    getModuleByModuleType()
    const arr = thirdCategoryList.filter(item => item.deviceTypeId == editData.deviceTypeId)
    setCategory(arr[0].deviceTypeName)
    communicationMethodsList && communicationMethodsList.map(item => {
      editData.protocol == item.moduleType && setProtocol(item.moduleTypeName)
    })

  }, [editData])

  // 根据品类id查物模型列表
  const getObjectModal = () => {
    getObjectModalRequest(editData.deviceTypeId).then(res => {
      if (res.data.data) {
        const arr = res.data.data.filter(item => item.id === editData.physicalModelId)
        setObjectModalList(arr[0].name)
      }
    })
  }

  // 根据通信方式查找模组
  const getModuleByModuleType = () => {
    const temp = editData.protocol.toString().split('') || ''
    getModuleByModuleTypeRequest(temp).then(res => {
      if (res.data.data) {
        let saveArr = []
        const arr = editData.moduleIds.split('#')
        arr.forEach(ele => {
          res.data.data.forEach(item => {
            if (ele == item.moduleId) {
              saveArr.push(item.moduleName)
            }
          })
        })
        setModuleIdsList(saveArr.join(' , '))
      }
    })
  }

  return (
    <Modal
      width={800}
      title="查看方案"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      maskClosable={false}
      wrapClassName="view-scheme-modal">
      <Descriptions title="品类方案" size="small" column={4}>
        <Descriptions.Item label="产品三级品类" span={2}>{category}</Descriptions.Item>
        <Descriptions.Item label="品类支持方案" span={2}>{schemeMap[editData.type] || '-'}</Descriptions.Item>
      </Descriptions>
      <br />
      <Descriptions title="方案简介" size="small" column={1}>
        <Descriptions.Item label="方案名称" span={2}>{editData.name}</Descriptions.Item>
        <Descriptions.Item label="通信协议" span={2}>{protocol}</Descriptions.Item>
        <Descriptions.Item label="概述" span={2} >{editData.summarize}</Descriptions.Item>
        <Descriptions.Item label="特点" span={2}>{editData.feature}</Descriptions.Item>
        <Descriptions.Item label="适合场景" span={2}>{editData.illustrate}</Descriptions.Item>
        <Descriptions.Item label="简介图">
          <div className="desc-pic"><img src={editData.picture} alt="pic" /></div>
        </Descriptions.Item>
      </Descriptions>
      <br />
      <Descriptions title="方案详情" size="small" column={1}>
        <Descriptions.Item label="方案物模型" span={2}>{objectModalList}</Descriptions.Item>
        <Descriptions.Item label="对应模组" span={2}>{moduleIdsList}</Descriptions.Item>
      </Descriptions>
    </Modal>
  )
}

export default ViewScheme
