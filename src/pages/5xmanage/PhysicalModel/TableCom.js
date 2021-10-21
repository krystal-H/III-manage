import React, { useEffect, useState, useMemo } from 'react'
import { Table, Button, Space } from 'antd';
import TableComs from '../../../components/Table';
import { getRowSpanCount } from './tableCombine'


export default function TableCom({ dataSource }) {
    const [pager, setPager] = useState({ pageIndex: 1, totalRows: 0, pageRows: 10 }) //分页
    //展示
    const filterFn = (data) => {
        let result = null
        let type = data.dataTypeEN
        switch (type) {
            case 'float':
            case 'int':
                result = `数值范围：${data.propertyMap.min}-${data.propertyMap.max},间距：${data.propertyMap.interval},倍数：${data.propertyMap.multiple},单位：${data.propertyMap.unit}`
                break;
            case 'bool':
                result = `0：${data.propertyMap[0]},1：${data.propertyMap[1]}`
                break;
            case 'enum':
                let value = ''
                for (let key in data.propertyMap) {
                    value += data.propertyMap[key] + '，'
                }
                result = `枚举值：${value}`
                break;
            default:
                return ''
        }

        return result
    }
    //获取数据
    const getComData = () => {
        let index = (pager.pageIndex - 1) * pager.pageRows
        let data = dataSource.slice(index, index + 10)
        return data
    }
    const columns = [

        {
            title: '功能类型', dataIndex: 'funcTypeCN',
            render: (value, row, index) => {
                return getRowSpanCount(
                    getComData(),
                    "funcIdentifier",
                    index,
                    value,
                    "funcTypeCN"
                );
            },
        },
        {
            title: '功能点名称', dataIndex: 'funcName',
            render: (value, row, index) => {
                return getRowSpanCount(
                    getComData(),
                    "funcIdentifier",
                    index,
                    value,
                    "funcName"
                );
            },
        },
        {
            title: '标识符', dataIndex: 'funcIdentifier',
            render: (value, row, index) => {
                return getRowSpanCount(
                    getComData(),
                    "funcIdentifier",
                    index,
                    value,
                    "funcIdentifier"
                );
            },
        },
        {
            title: 'DP ID', dataIndex: 'dataPointId',
        },
        {
            title: '参数名称', dataIndex: 'name',
            render: (text, record) => {
                return text
            }
        },
        { title: '参数标识', dataIndex: 'identifier' },
        {
            title: '数据传输类型', dataIndex: 'accessMode',
            render: (text, record) => {
                if (text == 'rw') {
                    return '可下发可上报'
                }
                if (text == 'w') {
                    return '可下发'
                }
                if (text == 'r') {
                    return '可上报'
                }
                return ''
            }
        },
        {
            title: '数据类型', dataIndex: 'dataType', render: (text, record) => (
                <span>{record.dataTypCN}</span>
            )
        },
        { title: '数据属性', dataIndex: 'propertyMap', render: (text, record) => <span>{filterFn(record)}</span> }
    ];
    //页码改变
    const pagerChange = (pageIndex, pageRows) => {
        if (pageRows === pager.pageRows) {
            setPager(pre => {
                let obj = JSON.parse(JSON.stringify(pre))
                return Object.assign(obj, { pageIndex, pageRows })
            })
        } else {
            setPager(pre => {
                let obj = JSON.parse(JSON.stringify(pre))
                return Object.assign(obj, { pageIndex: 1, pageRows })
            })
        }

    }
    //id集合
    const IdArr = useMemo(() => {
        let arr = []
        dataSource.forEach(item => {
            if (arr.indexOf(item.funcIdentifier) < 0) {
                arr.push(item.funcIdentifier)
            }
        })
        return arr
    }, [dataSource])
    return <div>
        <Table
            rowKey="key"
            columns={columns}
            dataSource={dataSource}
            scroll={{  y: 400 }}
            pagination={{
                defaultCurrent: 1,
                current: pager.pageIndex,
                onChange: pagerChange,
                pageSize: pager.pageRows,
                total: pager.totalRows,
                showQuickJumper: false,
                showTotal: () => <span>共 <a>{IdArr.length}</a> 条</span>
            }}
        />
    </div>
}
