import React from 'react'
import { connect } from 'react-redux'
import { Card, Button } from 'antd'
import TitleTab from '../../../components/TitleTab'
import Table from '../../../components/Table'
import { actionCreators } from './store';
import { DateTool } from "../../../util/utils";

class MacDetailList extends React.Component {
    state = {
        hetModuleTypeId: "",
        productCode: "",
        loading: false,
    }

    // 翻页
    onChange = (pageIndex) => {
        const { hetModuleTypeId, productCode } = this.props.match.params;
        this.setState({ loading: true })
        this.props.getMacDetailList({ hetModuleTypeId, productCode, pageIndex }).then(() => {
            this.setState({ loading: false })
        })
    }

    // 返回
    handleBack = () => {
        this.props.history.go(-1);
    }

    componentDidMount() {
        this.onChange();
    }

    render() {
        const { loading } = this.state;
        const { macDetailList, pager } = this.props;
        const columns = [
            { title: 'MAC起始地址', dataIndex: 'macBegin', width: '15%' },
            { title: 'MAC结束地址', dataIndex: 'macEnd', width: '15%' },
            { title: '申请数量', dataIndex: 'allocationCount', width: '10%' },
            { title: '描述', dataIndex: 'allocationDesc', width: '30%', render: (item) => (
                <span title={item}>{item}</span>
            )},
            { title: '创建时间', dataIndex: 'createTime', width: '20%', render: (item)=>{
                let timeStr = DateTool.utc2beijing(item, "yyyy-MM-dd hh:mm:ss");
                return <span>{timeStr}</span>;
            }},
            {
                title: '操作', render: (item) => (
                    <div className="action">
                        <a href={`/v1/web/manage-open/mac/allocation/excelExport?macBegin=${item.macBegin}&macEnd=${item.macEnd}`} target="blank">导出</a>
                    </div>
                )
            },
        ]
        return (
            <div className="macList">
                <TitleTab title="MAC详情" >
                    <Button type="primary" className="btn-back" onClick={this.handleBack}>返回</Button>
                </TitleTab>

                <Card>
                    <Table rowKey="macAllocationId" pagination={false} columns={columns} dataSource={macDetailList} pager={pager} onPageChange={this.onChange} loading={loading} />
                </Card>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    macDetailList: state.getIn(["macAllocation", "macDetailList"]).toJS(),
    pager: state.getIn(["macAllocation", "pager"]).toJS(),
})

const mapDispatchToProps = (dispatch) => ({
    getMacDetailList: (params) => dispatch(actionCreators.getMacDetailList(params)),
    exportList: () => dispatch(actionCreators)
})

export default connect(mapStateToProps, mapDispatchToProps)(MacDetailList)