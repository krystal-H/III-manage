import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Form, message, Table } from 'antd';
import { DateTool } from '../../../util/utils';
import { getProductList, addOneData } from '../../../apis/upNotice'
const columns = [
    {
        title: '已使用模组的产品',
        dataIndex: 'productName',
    },
    {
        title: '发布时间',
        dataIndex: 'createTime',
        render(createTime) {
            let text = createTime && DateTool.utcToDev(createTime)
            return <span >{text}</span>;
        }
    },
    {
        title: '创建账号',
        dataIndex: 'contact',
    },
    {
        title: '联系号码',
        dataIndex: 'tel',
    }
];
function StepSecond({ setStepCur, actionData, subObj }, ref) {
    const [data, setData] = useState([])
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [selectRow,setSelectRow]= useState([])
    useEffect(() => {
        getProductList({ moduleId: actionData.moduleId }).then(res => {
            if (res.data.code === 0) {
                setData(res.data.data.list)
            }
        })
    }, [])
    const rowSelection = {
        onChange: (key, selectedRows) => {
            console.log(key, '勾选的数据')
            setSelectedRowKeys(key)
            setSelectRow(selectedRows)
        },
        selectedRowKeys
    };
    // 表单提交
    const validData = () => {
        if (selectedRowKeys.length) {
            let params = {
                ...subObj.one,
                productIdList: selectedRowKeys
            }
            addOneData(params).then(res => {
                if (res.data.code === 0) {
                    message.success('升级成功')
                    setStepCur(2, selectRow)
                } else {
                    message.error('升级失败')
                } 
            })
        } else {
            message.info('请勾选数据')
        }
    }

    // 用于定义暴露给父组件的ref方法
    useImperativeHandle(ref, () => {
        return {
            onFinish: validData
        }
    }, [selectedRowKeys])
    return (
        <div>
            <Table
                rowKey='productId'
                rowSelection={rowSelection}
                columns={columns}
                dataSource={data}
            />
        </div>
    )
}

export default Form.create()(forwardRef(StepSecond))
