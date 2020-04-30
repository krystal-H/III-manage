import { Result, Button } from 'antd';
import React from 'react'
import {Link} from 'react-router-dom' 

export default class Exception404 extends React.Component {
  render(){
    return (
      <Result
      status="404"
      title="404"
      subTitle="不好意思，你访问的页面不存在！"
      extra={<Button type="primary"><Link to="/home">Back Home</Link></Button>}
    />
    )
  }
}
