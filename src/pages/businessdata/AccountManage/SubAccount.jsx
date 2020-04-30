import React from 'react';
import { connect } from 'react-redux';
import Table from '../../../components/Table';
import { actionCreators } from './store';
import { withRouter } from 'react-router-dom';
import { DateTool } from '../../../util/utils';

const statusList = [{
    name: '--',
    color: "#333",
},{
    name: "正常",
    color: "#0099cc",
},{
    name: "停用",
    color: "#ff0000",
}];

class SubAccount extends React.Component {
    state = {
        loading: false
    }

    // 翻页
    onChange = (pageIndex = 1) => {
        const { id } = this.props.match.params;
        this.setState({ loading: true });
        this.props.getSubAccountList({ pageIndex, id }).then(() => {
            this.setState({ loading: false });
        });
    }

    componentDidMount() {
        this.onChange();
    }

    render() {
        const { loading } = this.state;
        const { list, pager } = this.props;
        const columns = [
            { title: "用户名", dataIndex: "userName", width: "20%" },
            { title: "备注", dataIndex: "remark", width: "20%" },
            { title: "用户角色", dataIndex: "roleName", width: "20%" },
            { title: "用户状态", dataIndex: "status", width: "100px", render: (item) => {
                let temp = item === 1 ? statusList[1] : statusList[2];
                return (<span style={{color: temp.color}}>{temp.name}</span>);
            }},
            {
                title: "最新修改时间", dataIndex: "modifyTime", width: "150px", render: (item) => {
                    let timeStr = DateTool.utc2beijing(item, "yyyy-MM-dd hh:mm:ss");
                    return <span>{timeStr}</span>;
                }
            }
        ];

        return (
            <Table rowKey={"userId"} columns={columns} dataSource={list}
                loading={loading} onPageChange={this.onChange} pager={pager} />
        );
    }
}

const mapStateToProps = (state) => ({
    list: state.getIn(["accountManage", "subAccountList"]).toJS(),
    pager: state.getIn(["accountManage", "subAccountPager"]).toJS(),
});

const mapDispatchToProps = (dispatch) => ({
    getSubAccountList: (pager) => dispatch(actionCreators.getSubAccountList(pager))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SubAccount));