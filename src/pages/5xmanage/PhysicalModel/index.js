import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Select, Cascader, Divider, Modal, Form, message } from 'antd';
import TitleTab from '../../../components/TitleTab';
import TableCom from '../../../components/Table';
import AddModal from './add'
import './index.less'
import { getList, getOrderType ,relData} from '../../../apis/physical'
import { DateTool } from '../../../util/utils';
const FormItem = Form.Item

function PhysicalModel({ form }) {
  const { getFieldDecorator, validateFields, getFieldsValue } = form;
  const [dataSource, setdataSource] = useState([])
  const [optionList, setOptionList] = useState([])
  const [addVis, setAddVis] = useState(false)
  const column = [
    {
      title: '物模型ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '物模型名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '语言版本',
      dataIndex: '',
      key: '',
      render() {
        return <span>中文</span>;
      }
    },
    {
      title: '所属分类',
      dataIndex: 'deviceType',
      key: 'deviceType',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render(status) {
        return <span>{status == 1 ? '草稿' : '正式'}</span>;
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render(createTime) {
        return createTime && DateTool.utcToDev(createTime);
      }
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      render(updateTime) {
        return updateTime && DateTool.utcToDev(updateTime);
      }
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      render: (text, record) => (
        <span>
          {
            record.status == 1 ?
              <span >
                <a style={{ marginRight: '10px' }} onClick={()=>{relPhy(record.id)}}>发布</a>
                <a >编辑</a>
              </span>
              :
              <a >更新</a>
          }
        </span>
      ),
    }
  ]
  const relPhy=(id)=>{
    Modal.confirm({
      title: '确认',
      okText: '确定',
      cancelText: '取消',
      content:  '点击确定将发布数据，点击取消可取消发布。',
      onOk: () => {
        relData({id}).then(res=>{
          message.success('发布成功');
          getData()
        })
      }
    })
  }
  useEffect(() => {
    getData()
    getOption()
  }, [])
  const getData = () => {
    let params = {}
    if (getFieldsValue().name && getFieldsValue().name.trim()) {
      params.name = getFieldsValue().name.trim()
    }
    if (getFieldsValue().deviceTypeId) {
      params.deviceTypeId = getFieldsValue().deviceTypeId
    }
    getList(params).then(res => {
      setdataSource(res.data.data)
    })
  }
  const getOption = () => {
    getOrderType().then(res => {
      setOptionList(res.data.data)
    })
  }


  const onReset = () => {
    form.resetFields();
  }



  //=======
  const handleOk = () => {
    setAddVis(false)
  }
  const handleCancel = () => {
    setAddVis(false)
  }
  return (
    <div className="PhysicalModel-page">
      <TitleTab title="平台物模型管理">
        <Form layout="inline" >

          <FormItem label="所属分类">
            {getFieldDecorator('deviceTypeId', {})(
              <Select style={{ width: 160 }} placeholder="请选择所属分类" allowClear>
                {
                  optionList.map((item, index) => (
                    <Select.Option key={item.deviceTypeId} value={item.deviceTypeId} label={item.deviceTypeName}>
                      {item.deviceTypeName}
                    </Select.Option>
                  ))
                }
              </Select>
            )}
          </FormItem>
          <FormItem label="物模型名称">
            {getFieldDecorator('name', {})(
              <Input placeholder="请输入物模型名称" style={{ width: 240 }} allowClear></Input>
            )}
          </FormItem>
          <FormItem  >
            <Button type="primary" onClick={() => getData()} >查询</Button>
          </FormItem>
          <FormItem >
            <Button onClick={() => onReset()}>重置</Button>
          </FormItem>
        </Form>
        <div className="PhysicalModel-title">
          <Button type="primary" onClick={() => { setAddVis(true) }} >新增物模型</Button>
          <Button  >批量导入</Button>
        </div>
      </TitleTab>
      <Card>
        <TableCom rowKey={"id"} columns={column} dataSource={dataSource}
          pager={false} />
      </Card>
      {
        addVis && <AddModal addVis={addVis} handleCancel={handleCancel} handleOk={handleOk} optionList={optionList} />
      }
    </div>
  )
}

export default Form.create()(PhysicalModel)