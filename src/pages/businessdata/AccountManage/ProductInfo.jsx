import React from 'react';
import {connect} from 'react-redux';
import Table from '../../../components/Table';
import {actionCreators} from './store';
import {withRouter} from 'react-router-dom';
import { DateTool } from '../../../util/utils';

const modeList = {
    0: '开发中',
    1: '已发布',
    2: '审核中'
};

class ProductInfo extends React.Component {
    state = {
        loading: false
    }

     // 翻页
    onChange = (pageIndex = 1) => {
        const { id } = this.props.match.params;
        this.setState({ loading: true });
        this.props.getProductList({ pageIndex, id }).then(() => {
            this.setState({ loading: false });
        });
    }

    componentDidMount(){
        this.onChange();
    }

    render() {
        const {loading} = this.state;
        const {list, pager} = this.props;
        const columns = [
            {title: "产品ID", dataIndex: "productId", width: "200px"},
            {title: "产品名称", dataIndex: "productName", width: "20%"},
            {title: "所属分类", dataIndex: "productType", width: "30%"},
            {title: "状态", dataIndex: "mode", width: "10%", render: (item) => {
                return <span>{modeList[item]}</span>;
            }},
            {title: "创建时间", dataIndex: "createTime", width: "200px", render: (item) => {
                let timeStr = DateTool.utc2beijing(item, "yyyy-MM-dd hh:mm:ss");
                    return <span>{timeStr}</span>;
            }}
        ];

        return (
            <Table rowKey={"productId"} columns={columns} dataSource={list} pager={pager}
                loading={loading} onPageChange={this.onChange} />
        );
    }
}

const mapStateToProps = (state) => ({
    list: state.getIn(["accountManage", "productList"]).toJS(),
    pager: state.getIn(["accountManage", "productPager"]).toJS(),
});

const mapDispatchToProps = (dispatch) => ({
    getProductList: (pager) => dispatch(actionCreators.getProductList(pager)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductInfo));