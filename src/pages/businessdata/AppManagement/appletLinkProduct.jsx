import React, {PropTypes, PureComponent} from 'react';
import { connect } from 'react-redux'
import { actionCreators } from './store';
import TableCom from '../../../components/Table';
import { DateTool } from "../../../util/utils";
import BackGroundImg from '../../../assets/images/u2777.png';

import { Card, Form} from 'antd';

import './style.less';

@Form.create()
class AppletLinkProduct extends PureComponent{
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
          paged: true,
          appId: appId,
          version: 1.1
        }
        this.props.getOldRealProductList(opts).then((res) => {
          this.setState({ loading: false })
        });
    }
    render(){
        let column = [
            { title: "产品图标", dataIndex: 'productIcon', key: 'productIcon', width: "20%", render:(item)=>{
                return <div style={{width:"80px",height:"80px"}}>
                    {item?<img src={item} style={{width:"100%", height:"100%"}}/>:<img src={BackGroundImg} style={{width:"100%", height:"100%"}}/>}
                </div>
            }},
            { title: "产品名", dataIndex: 'productName', key: 'productName', width: "20%" },
            { title: "所属分类", dataIndex: 'allCategoryName', key: 'allCategoryName', width: "20%" },
            { title: "产品ID", dataIndex: 'productId', key: 'productId', width: "20%" },
        ];
        let { getFieldDecorator } = this.props.form;
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
    list: state.getIn(['appManagement', 'appLinkList']).toJS(),
    pager: state.getIn(['appManagement', 'appLinkPager']).toJS(),
  })
  
  const mapDispatchToProps = (dispatch) => ({
    getOldRealProductList: (pager) => {
      return dispatch(actionCreators.getOldRealProductList(pager))
    }
  })
export default connect(mapStateToProps, mapDispatchToProps)(AppletLinkProduct);