import React from 'react'
import {Upload, Button, Icon, Menu, Card} from 'antd'
import {PrivateRoute} from '../../../routes/PrivateRoute'
import {Switch, Redirect, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import ProtocolDicCommon from './Component/ProtocolDicCommon'
import ProtocolDicMain from './Component/ProtocolDIcMain'
import ProtocolDicMainExtends from './Component/ProtocolDicMainExtends'
import ProtocolDicFunction from './Component/ProtocolDicFunction'
import ProtocolDicFunctionExtends from './Component/ProtocolDicFunctionExtends'
import  * as protocolDic from '../../../store/globalProtocolDicStore/actionCreators'

const MenuItem = Menu.Item

class ProtocolDicManager extends React.Component 
{

  constructor(props){
    super(props);
    this.state = {
      menuIndex:"common"
    }
  }

  menuClick(item){
    this.setState({
      menuIndex:item.key
    })
  }

  componentDidMount(){
    let currentKey = window.location.hash.replace(/#|\?.*$/g, "");
    var arr = currentKey.split("/");
    let openMenuPath = arr.pop();  
    this.setState({
      menuIndex:openMenuPath
    })

    this.props.getFunctionAllList()
  }

  render(){
    return (
      <div>
        <Card style={{ marginBottom:"10px"}}>
          <h2 style={{fontSize: '20px', fontWeight:'bold', marginBottom:'10px'}}>协议字典</h2>
          <Menu onClick={this.menuClick.bind(this)} selectedKeys={[this.state.menuIndex]} mode="horizontal">
            <MenuItem key="common"><Link to="/config/protocoldic/common">常用</Link></MenuItem>
            <MenuItem key="main"><Link to="/config/protocoldic/main">主体</Link></MenuItem>
            <MenuItem key="mainextends"><Link to="/config/protocoldic/mainextends">主体扩展名</Link></MenuItem>
            <MenuItem key="function"><Link to="/config/protocoldic/function">功能</Link></MenuItem>
            <MenuItem key="functionextends"><Link to="/config/protocoldic/functionextends">功能扩展名</Link></MenuItem>
          </Menu>
        </Card>
        <Card>
          <Switch>
            <PrivateRoute path="/config/protocoldic/common" component={ProtocolDicCommon}></PrivateRoute>
            <PrivateRoute path="/config/protocoldic/main" component={ProtocolDicMain}></PrivateRoute>
            <PrivateRoute path="/config/protocoldic/mainextends" component={ProtocolDicMainExtends}></PrivateRoute>
            <PrivateRoute path="/config/protocoldic/function" component={ProtocolDicFunction}></PrivateRoute>
            <PrivateRoute path="/config/protocoldic/functionextends" component={ProtocolDicFunctionExtends}></PrivateRoute>
            <Redirect to="/config/protocoldic/common" from="/config/protocoldic"></Redirect>
          </Switch>
        </Card>
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    getFunctionAllList: () => {
      dispatch(protocolDic.FunctionAllListAsyncAction())
    }
  }
}


export default connect(null,mapDispatchToProps)(ProtocolDicManager)
