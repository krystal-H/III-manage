import React, { useState, useEffect } from 'react'
import { Modal, Descriptions, Table } from "antd";
import './viewScheme.less';

function ViewScheme({ visible, handleOk, handleCancel }) {
  return (
    <Modal
      width={800}
      title="查看方案"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      maskClosable={false}
      wrapClassName="view-scheme-modal"
    >
      <Descriptions title="品类方案" size="small">
        <Descriptions.Item label="产品三级品类" span={2}>产品三级品类</Descriptions.Item>
        <Descriptions.Item label="品类支持方案" span={2}>品类支持方案</Descriptions.Item>
      </Descriptions>
      <br />
      <Descriptions title="方案简介" size="small" column={1}>
        <Descriptions.Item label="方案名称" span={2}>方案名称方案名称</Descriptions.Item>
        <Descriptions.Item label="通信协议" span={2}>通信协议通信协议通信协议</Descriptions.Item>
        <Descriptions.Item label="概述" span={2} >概述概述概述概述概述概述概述概概述概述概述概述概述概述概述概概述概述概述概述概述述概</Descriptions.Item>
        <Descriptions.Item label="特点" span={2}>特点特点特点特点特点特点特点</Descriptions.Item>
        <Descriptions.Item label="适合场景" span={2}>方案名称方案名称</Descriptions.Item>
        <Descriptions.Item label="简介图">
          <div className="desc-pic">
            <img src="" alt="" />
          </div>
        </Descriptions.Item>
      </Descriptions>
      <br />
      <Descriptions title="方案详情" size="small">
         <Descriptions.Item label="方案功能点" span={2}>方案功能点</Descriptions.Item>
         <Descriptions.Item label="对应模组" span={2}>对应模组</Descriptions.Item>
      </Descriptions>
    </Modal>
  )
}

export default ViewScheme
