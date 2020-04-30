import React , {Component} from 'react'
import {Modal, Button} from 'antd'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { relative } from 'path'


const mapStateToProps = (state) => {
  let isAuthorized = state.getIn(['globalUserInfo','isAuthorized'])
  return {
    isAuthorized: isAuthorized
  }
}

@connect(mapStateToProps)
@withRouter
class AuthorizedCheck  extends Component 
{
  state = {
    visible: true
  }

  onCancel = () => {
    this.props.history.push('/login');
  }

  onOk = () => {
    this.props.history.push('/login');
    this.setState({
      visible: false
    })
  }

  render(){
    let visible = !this.props.isAuthorized && this.state.visible;
    return(
      <div>
       <Modal
          visible={visible}
          title="提示"
          onOk={this.handleOk}
          closable={false}
          footer={[
            <Button key="submit" type="primary"  onClick={this.onOk}>
              确定
            </Button>,
          ]}
        >
          <p>发现你没有登录，请登录</p>

        </Modal>
      </div>
    )
  }
}

export default  AuthorizedCheck
