import { Result, Button } from 'antd';
import React from 'react'
import {Link} from 'react-router-dom' 

export default class Exception403 extends React.Component {
  render(){
    return (
      <Result
      status="403"
      title="403"
      subTitle="你没有访问该页面的权限，请联系唐兵！"
      extra={<Button type="primary"><Link to="/home">Back Home</Link></Button>}
    />
    )
  }
}
