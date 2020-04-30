import React, {PropTypes, PureComponent} from 'react';
import { connect } from 'react-redux'
import { actionCreators } from './store';
import TableCom from '../../../components/Table';
import { DateTool } from "../../../util/utils";

import { Card, Form} from 'antd';
// import ProductDetailInfo from './ProductDetailInfo'
// import ProductDetailService from './ProductDetailService';
import './style.less';

@Form.create()
class AppColophon extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            query: {},
            loading: false,
        }
        this.queryList = this.queryList.bind(this);
    }
    
    componentDidMount() {
        this.queryList(); // 获取产品列表
      }
      queryList(pageIndex){  // 查询
        this.setState({ loading: true });
        pageIndex = pageIndex?pageIndex:1;
        let {appId} = this.props;
        let opts={
            pageIndex: pageIndex,
            pageRows: 10,
            appId:appId,
            version: 1.1
        }
        this.props.GetColophonList(opts).then((res) => {
          this.setState({ loading: false })
        });
      }
    render(){
        let column = [
            { title: "版本号", dataIndex: 'externalVersion', key: 'externalVersion', width: "20%"},
            { title: "版本序列号标识", dataIndex: 'appSign', key: 'appSign', width: "20%" },
            { title: "运行系统", dataIndex: 'appType', key: 'appType', width: "20%", render:(item)=>{
                let appTypeText = '--';
                if(item==1){appTypeText='Android'}
                if(item==2){appTypeText='IOS、Android'}
  
                return <div>{appTypeText}</div>
            }},
            { title: "升级方式", dataIndex: 'status', key: 'status', width: "20%", render:(item) => {
                // 1-普通，2-强制
                let statusText='--';
                if(item==1){statusText='普通升级'}
                if(item==2){statusText='强制升级'}
  
                return <div>{statusText}</div>
            }},
            { title: "更新时间", dataIndex: 'releaseTime', key: 'releaseTime', width: "20%", render: (item) => {
                let timeStr = DateTool.utc2beijing(item, "yyyy-MM-dd hh:mm:ss")
                return <span>{timeStr}</span>
              }},
        ];
        // let { getFieldDecorator } = this.props.form;
        let { list, pager } = this.props;
        let {loading} = this.state;
        return(<div>
            <Card style={{ marginTop: "10px" }}>
                <TableCom rowKey={"appLinkOrColophon"} columns={column} dataSource={list} pager={pager} onPageChange={this.queryList} loading={loading} />
            </Card>
        </div>
        );
    }
}
const mapStateToProps = (state) => ({
    list: state.getIn(['appManagement', 'colophonList']).toJS(),
    pager: state.getIn(['appManagement', 'colophonPager']).toJS(),
  })
  
  const mapDispatchToProps = (dispatch) => ({
    GetColophonList: (pager) => {
      return dispatch(actionCreators.GetColophonList(pager))
    }
  })
export default connect(mapStateToProps, mapDispatchToProps)(AppColophon);