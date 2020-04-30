import React , {Component} from 'react'
import {Tabs, Table} from 'antd'
import "./ProtocolTablePannel.less"

const {TabPane} = Tabs;

//数据类型
const protocolTypes = [
  { id: 1, name: "字符",  },
  { id: 2, name: "数值",  },
  { id: 3, name: "枚举",  },
  { id: 4, name: "布尔",  },
  { id: 5, name: "绝对时间",  },
  { id: 6, name: "相对时间",},
  { id: 7, name: "循环时间",},
  { id: 8, name: "RGB颜色",},
  { id: 9, name: "二进制" },
  { id: 10, name: "数组",},
  { id: 11, name: "结构体",},
]

const column = [{
  title:"协议属性(key)",
  dataIndex:'mark',
},{
  title:"协议属性名",
  dataIndex:'describe',
},{
  title:"数据单位",
  dataIndex:'propertyValueType',
  width:"90px"
},{
  title:"数据类型",
  dataIndex:'functionDataType',
  width:"100px",
  render: (type) => {
    if(type){
      let functionDataType = protocolTypes[type-1]
      let name = functionDataType.name
      return name
    }else{
      return <span>LONG</span>
    }
  }
},{
  title:"字节数",
  dataIndex:'length',
  width:"90px"
},{
  title:"数据属性",
  ellipsis: true,
  dataIndex:'dataProperty',
  render: (text, record, index) => {
    let dataProperty = '';

    if(record.functionDataType == 10){//数组
      let arr = record.extend||[];
      let childtype = protocolTypes[ arr[0].functionDataType-1].name;
      dataProperty = `${arr.length}个${childtype}型元素`;
    }else if(record.functionDataType == 11){
      let arr = record.extend||[];
      arr.map((item,index)=>{
        let {gap,mulriple,unit,range} = item;
        dataProperty += `数值范围：${range || '--'}, 间距：${gap || '--'}, 倍数：${mulriple || '--'}, 单位：${unit || '--'}`

      });


    }else{
      let {gap,mulriple,unit,range} = record;
      dataProperty = `数值范围：${range || '--'}, 间距：${gap || '--'}, 倍数：${mulriple || '--'}, 单位：${unit || '--'}`;
    }
    
    return<span key={"dataProperty"+index}>{dataProperty}</span>
  }
},{
  title:"是否保留字",
  dataIndex:'ignore',
  width:"110px",
  render: (item)=>{
    return <span>{item ? '是':'否'}</span>
  }
},]


class ProtocolTablePannel extends Component{

 constructor(props){
    super(props);
    this.state = {
      controlList:[],
      runList:[],
      errList:[],
      configList:[]
    }
 }
 
  filterPannel(){
    let data = this.props.protocolList || {};
    // let dataSource = tempList;
    let controlList = data['control']||[]; //控制数据
    let runList = data['run']||[]; //运行数据
    let errList=data['fault']||[];//错误数据
    let configList =data['config']||[];//配置数据

    let dataSource = controlList.concat(runList,errList,configList);

    // dataSource.map( item => {
    //   if(item.dataTypeName === "控制数据"){ //控制数据
    //     controlList.push(item);
    //   }else if(item.dataTypeName === "运行数据"){ //运行数据
    //     runList.push(item)
    //   }else if(item.dataTypeName === "故障数据"){ //错误数据
    //     errList.push(item)
    //   }else if(item.dataTypeName === "配置数据"){ //配置数据
    //     configList.push(item)
    //   }
    //   return item
    // })
    return {dataSource,controlList, runList, errList, configList}
  }

  render() {
    
    let  {dataSource,controlList, runList, errList, configList} = this.filterPannel()
    return (
      <Tabs animated={false} className="protocoltable" >
        <TabPane tab="全部" key="0" >
          <Table tableLayout='fixed' bordered rowKey={record => record.mark + record.dataTypeName} columns={column} dataSource={dataSource} pagination={false} ></Table>
        </TabPane>
        <TabPane tab="控制数据" key="1">
          <Table bordered rowKey={record => record.mark + record.dataTypeName} columns={column} dataSource={controlList} pagination={false}  ></Table>
        </TabPane>
        <TabPane tab="运行数据" key="2">
          <Table bordered rowKey={record => record.mark + record.dataTypeName} columns={column} dataSource={runList} pagination={false} ></Table>
        </TabPane>
        <TabPane tab="故障数据" key="3">
          <Table bordered rowKey={record => record.mark + record.dataTypeName} columns={column} dataSource={errList} pagination={false} ></Table>
        </TabPane>
        <TabPane tab="配置数据" key="4">
          <Table bordered rowKey={record => record.mark + record.dataTypeName} columns={column} dataSource={configList} pagination={false} ></Table>
        </TabPane>
      </Tabs>
    )
  }
}

export default ProtocolTablePannel