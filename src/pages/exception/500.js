import { Result, Button } from 'antd';
import React from 'react'
import {Link} from 'react-router-dom' 

export default class Exception500 extends React.Component {
  render(){
    return (
      <Result
      status="500"
      title="500"
      subTitle="服务器出错了！请稍等！"
      extra={<Button type="primary"><Link to="/home">Back Home</Link></Button>}
    />
    )
  }
}
