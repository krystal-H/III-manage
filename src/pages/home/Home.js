import React, { Component } from 'react'
import "./Home.less"
import { Descriptions,Card } from 'antd';

class Home extends Component {
  render() {
    return (

      <Card className="home-wrap">
        <Descriptions title="欢迎来到 物联网平台管理后台！！！  " bordered style={{textAlign:"center"}}>
          <Descriptions.Item label="当前账号"> tangbing</Descriptions.Item>
          <Descriptions.Item label="使用人">刘旭</Descriptions.Item>
          <Descriptions.Item label="角 色"> 产品审核</Descriptions.Item>
          <Descriptions.Item label="问题反馈"> 刘旭</Descriptions.Item>
          <Descriptions.Item label="联系方式">15012705630</Descriptions.Item>
          <Descriptions.Item label="联系地址点">科技园D座10楼</Descriptions.Item>
        </Descriptions>
      </Card>

    )
  }
}

export default Home