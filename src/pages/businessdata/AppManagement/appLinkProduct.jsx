import React, {PropTypes, PureComponent} from 'react';
import { connect } from 'react-redux'
import { actionCreators } from './store';
import TableCom from '../../../components/Table';

import { Card, Form, Select} from 'antd';
import BackGroundImg from '../../../assets/images/u2777.png';
import './style.less';
const { Option } = Select;

@Form.create()
class AppLinkProduct extends PureComponent{
    constructor (props){
        super(props);
    
        this.state = {
          productId: '',
          query: {},
          loading: false,
          appVersionType:'3', //appVersionType [1,2,3] 1--Ios 2--安卓 3--两者都有
          appType: this.props.appType, //0--移动应用， 2--小程序应用
        }
        this.queryList = this.queryList.bind(this);
        this.handleChange = this.handleChange.bind(this);
      }
    
      componentDidMount() {
        this.queryList(); // 获取产品列表
      }
      queryList(pageIndex){  // 查询
        this.setState({ loading: true });
        pageIndex = pageIndex?pageIndex:1;
        let {appVersionType} = this.state;
        let {appId} = this.props;

        let opts={
          pageIndex: pageIndex,
          pageRows: 10,
          paged: true,
          appId: appId,
          appVersionType: appVersionType,
          version: 1.1
        }
        this.props.getOldRealProductList(opts).then((res) => {
          this.setState({ loading: false })
        });
      }
      changeSystemType(){ 
        return(<Select value={this.state.appVersionType} style={{ width: 120 }} onChange={this.handleChange}>
            <Option value="3">应用平台</Option>
            <Option value="1">Android</Option>
            <Option value="2">iOS</Option>
        </Select>);
      }
      handleChange(value) {
        this.setState({
          appVersionType:value
        },()=>{
          this.queryList(1)
        })
      }
    render(){
        let column = [
            { title: "产品图标", dataIndex: 'productIcon', key: 'productIcon', width: "103px",render:(item)=>{
              return <div style={{width:"80px",height:"80px"}}>
                  {item?<img src={item} style={{width:"100%", height:"100%"}}/>:<img src={BackGroundImg} style={{width:"100%", height:"100%"}}/>}
              </div>
            }},
            { title: "产品名", dataIndex: 'productName', key: 'productName', width: "30%" },
            { title: "所属分类", dataIndex: 'allCategoryName', key: 'allCategoryName', width: "30%" },
            { title: "产品ID", dataIndex: 'productId', key: 'productId', width: "30%" },
            { title: this.changeSystemType(), dataIndex: 'appVersionType', key: 'appVersionType', width: "30%", render:(item)=>{
              let appVersionTypeText = '--';
              if(item==1){appVersionTypeText='Android'}
              if(item==2){appVersionTypeText='iOS'}
              if(item==3){appVersionTypeText='Android、iOS'}

              return <div>{appVersionTypeText}</div>
            }},

        ];

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
export default connect(mapStateToProps, mapDispatchToProps)(AppLinkProduct);
