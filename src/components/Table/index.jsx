import React from 'react'
import { Table } from 'antd'
import './style.scss'
import Pager from './Pager';

export default (props) => {
    const { pager, onPageChange, pagination, loading } = props;
    return (
        <div className="com-table">
            <Table pagination={false} bordered {...props}/>
            {
                pagination || !pager.totalRows ? null : <Pager {...pager} onChange={onPageChange} loading={loading}/>
            }
        </div>
    )
}
