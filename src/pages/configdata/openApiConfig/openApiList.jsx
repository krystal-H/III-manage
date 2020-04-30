import React, { Component } from "react";
import { Tooltip, Input, Button, Card, Modal } from "antd";
import TableCom from '../../../components/Table';
import { DateTool } from "../../../util/utils";
import { OpenApiListRequest,StopOpenApiRequest } from '../../../apis/openApiList';
import "./openApiList.less";

class openApiList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldParams: {},
      openList: [],
      pager: { pageIndex: 0, totalRows: 20 },
      userName:""
    };
  }

  componentDidMount() {
    let params = {
      pageIndex: 1,
      userName: "",
      pageRows: 10,
    }
    this.getOpenApiList(params);
  }

  // 获取api列表
  getOpenApiList = (params) => {
    console.log(params);
    this.setState({ loading: true, oldParams: params })
    OpenApiListRequest(params).then(res => {
      let code = res.data.code
      if (code === 0) {
        console.log(res.data.data);
        this.setState(() => ({
          openList: this.makeAntTableData(res.data.data.list),
          pager: res.data.data.pager
        }))
      }
    }).finally(
      () => {
        this.setState(() => ({
          loading: false,
        }))
      }
    )
  }

  // 数据处理为下面Ant Table的需要的格式
  makeAntTableData = data => {
    const list = [];
    data.map((item, index) => {
      list.push({
        ...item,
        key: index
      });
    });
    return list;
  };

  // 查看、停用事件
  handleAction = (item, value) => {
    switch (value.key) {
      case 0:
        let par = this.urlEncode(item).slice(1);;
        console.log(par);
        this.props.history.push({ pathname: `/config/openApiConfig/info/${par}`});
        break;
      case 1:
        (Modal.confirm({
          title: `即将停用配置${item.configId}`,
          okText: '确定',
          cancelText: '取消',
          content: `停用之后不可使用，确认要停用吗？`,
          onOk: () => {
            this.stopApi({configId:item.configId});
          }
        }))
        break;
      default:
        break;
    }
  };

  // 搜索事件
  search =()=>{
      console.log(this.state.userName);
      let params = {
        pageIndex: 1,
        userName:this.state.userName,
        pageRows: 10,
      }
      this.getOpenApiList(params);
  }

  // 输入框改变事件
  onChange = e => {
    console.log(e.target.value);
    this.setState({
      userName: e.target.value,
    })
  };

  stopApi =(params)=>{
    this.setState({ loading: true})
    StopOpenApiRequest(params).then(res => {
      let code = res.data.code
      if (code === 0) {
        this.getOpenApiList(this.state.oldParams);
      }
    }).finally(
      () => {
        this.setState(() => ({
          loading: false,
        }))
      }
    )
  }

  // 创建openApI事件
  creatApi = () => {
    this.props.history.push({ pathname: `/config/openApiConfig/create`});
  }

  urlEncode = (param, key, encode) => {
    if (param == null) return '';
    var paramStr = '';
    var t = typeof (param);
    if (t == 'string' || t == 'number' || t == 'boolean') {
      paramStr += '&' + key + '=' + encodeURI(param);
    } else {
      for (var i in param) {
        var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i)
        paramStr += this.urlEncode(param[i], k, encode)
      }
    }

    return paramStr;
  }

  // 分页选择触发
  paginationChange = (current) => {
    const { oldParams } = this.state;
    let params = {
      ...oldParams,
      pageIndex: current,
    }
    this.getOpenApiList(params);
    var tableScroll = document.querySelector(".ant-table-body");
    tableScroll.scrollTop = 0;
  }

  getActionArray = (status) =>{
    if(status === 0){
      return [
        { title: "查看", icon: "info", key: 0 },
        { title: "停用", icon: "stop", key: 1 },
      ];
    }
    if(status === 1){
      return [
        { title: "查看", icon: "info", key: 0 },
      ];
    }
    return [];
  }

  render() {
    const { loading, openList, pager } = this.state;
    // 表头格式
    const columns = [
      {
        title: "配置ID", width: "80px", key: "configId", dataIndex: "configId",
        render: (text) => <span title={text}>{text}</span>
      },
      {
        title: "配置用户", width: "15%", key: "userName", dataIndex: "userName",
        render: (text) => <span title={text}>{text}</span>
      },
      {
        title: "配置API", width: "20%", key: "openapiNameList", dataIndex: "openapiNameList",
        render: (text) => <span title={text}>{text}</span>
      },
      {
        title: "标签内容", width: "20%", key: "labelNameList", dataIndex: "labelNameList",
        render: (text) => <span title={text}>{text}</span>
      },
      {
        title: "订阅创建时间", width: "150px", key: "createTime", dataIndex: "createTime",
        render: (item) => {
          let timer = DateTool.utc2beijing(item, "yyyy-MM-dd hh:mm:ss");
          return <span title={timer}>{timer}</span>
        }
      },
      // {
      //   title: "状态", width: "10%", key: "configStatus", dataIndex: "configStatus",
      //   render(status) {
      //     const color = ["gray", "red"];
      //     return <span style={{ color: `${color[status]}` }}>{status === 1 ? "停用":"正常"}</span>
      //   }
      // },

      {
        title: "操作", width: "100px", key: "operation", dataIndex: "operation",
        render: (text, item) => {
          const arr = this.getActionArray(item.configStatus);
          return (
            <div>
              {arr.map((value, index) => {
                return (
                  <Tooltip key={index} placement="top" title={value.key === 2 ? (item.status === 1 ? "下线" : value.title) : value.title}>
                    <Button style={{ marginLeft: "5px" }}
                      shape="circle"
                      size="small"
                      icon={value.key === 2 ? (item.status === 1 ? "cloud-download" : value.icon) : value.icon}
                      key={item.templateId}
                      onClick={() => this.handleAction(item, value)}
                    />
                  </Tooltip>
                );
              })}
            </div>
          );
        }
      }
    ];
    return (
      <div className="H5TemplateContent2">
        <Card>
          <Input allowClear type="text" placeholder="请输入开发者账号查询" maxLength={20} style={{ width: 260, marginRight: 10 }} onChange={this.onChange}/>
          <Button type="primary" onClick={this.search}>查询</Button>
          <Button type="primary" onClick={this.creatApi} style={{ float: "right" }}>新增openAPI配置</Button>
        </Card>
        <Card className="H5TemplateTable">

          <TableCom rowKey="id" bordered columns={columns} dataSource={openList} pager={pager}
            onPageChange={this.paginationChange} loading={loading} />
        </Card>
      </div>
    );
  }
}
export default openApiList;
