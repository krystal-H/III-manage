import React, { Component } from "react";
import { Tooltip, Modal, message, Icon, Button, Card } from "antd";
import { H5TemplateRequest, H5PublishRequest, DelTemplateRequest } from "../../../apis/h5Template";
import { AllProductCategoryListRequest } from "../../../apis/device";
import BaseForm from "../../../components/BaseForm/index";
import CreateH5Template from './CreateH5Template';
import { DateTool, Pager } from "../../../util/utils";
import "./H5TemplateList.less";
import TableCom from '../../../components/Table';
const { Meta } = Card;

const btnArr = [
  { title: "模板信息", icon: "info", status: 0, key: 0 },
  { title: "编辑", icon: "edit", status: 0, key: 1 },
  { title: "发布", icon: "cloud-upload", status: 0, key: 2 },
  { title: "删除", icon: "delete", status: 0, key: 3 }
];

class H5TemplateList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      h5TemplateList: [],
      loading: false,
      oldParams: {},
      allCategoryList: [],
      subCategoryList: [],
      deviceTypeList: [],
      categoryId: "",
      subCategoryId: "",
      pager: {}
    };
  }

  // 加载数据
  componentWillMount() {
    let param = {
      pageRows: 10,
      sort: "modifyTime",
      order: "desc"
    };
    this.getH5TemplateList(param);
    this.getAllCategoryList();
  }

  // 获取H5模板信息
  getH5TemplateList = params => {
    this.setState({ loading: true, oldParams: params });
    H5TemplateRequest(params)
      .then(response => {
        let { data } = response;
        if (data.code === 0) {
          // let pagination = Pager.pagination(data.data.pager, this.paginationChange)
          // 提升性能
          this.setState(() => ({
            h5TemplateList: this.makeAntTableData(data.data),
            // pagination: pagination
            pager: data.data.pager
          }))
        }
      }).finally(
        () => {
          this.setState(() => ({
            loading: false,
          }))
        }
      );
  };

  // 获取三级目录信息
  getAllCategoryList = () => {
    AllProductCategoryListRequest().then(response => {
      let { data } = response;
      if (data.code === 0) {
        // console.log("获取产品类目列表成功：", data.data);
        this.setState({
          allCategoryList: this.makeFormData(data.data, "categoryName", "categoryId")
        })
      }
    })
  }

  // 发布模板接口
  h5Publish = (item) => {
    H5PublishRequest({ templateId: item.templateId, status: item.status ? 0 : 1 }).then(response => {
      let { data } = response;
      if (data.code === 0) {
        let msg = item.status ? '撤销成功！' : '发布模板成功！';
        message.success(msg, 2).then(this.getH5TemplateList(this.state.oldParams));
      }
    })
  }

  // 删除模板接口
  h5Del = (item) => {
    DelTemplateRequest({ templateId: item.templateId }).then(response => {
      let { data } = response;
      if (data.code === 0) {
        let msg = '删除模板成功！';
        message.success(msg, 2).then(this.getH5TemplateList(this.state.oldParams));
      }
    })
  }

  // 编辑模板页面
  editTemplate = (item) => {
    if (item.status === 1) {
      message.warning("对不起！模板" + '"' + item.templateName + '"' + " 是发布状态，禁止编辑", 3);
      return;
    }
    let hostname = window.location.host;
    console.log(this.props);
    let targetHostname = '';
    let wCloud = '';
    if (hostname === 'cms.clife.cn') {
      targetHostname = 'open.clife.cn';
      wCloud = '';
    } else if (hostname === 'pre.cms.clife.cn') {
      targetHostname = 'pre.cms.clife.cn';
      wCloud = '/pre-wCloud-v2';
    } else {
      targetHostname = 'dp.clife.net';
      wCloud = '/wCloud_v2';
    }
    let targetUrl =
      'https://' +
      targetHostname +
      wCloud +
      '/app-developer/page/playground.html#/develop/edit/' +
      item.templateId +
      '?platform=1&operate=edit';
    window.open(targetUrl, '_self');
  }

  makeFormData = (data, idName, id) => {
    let lists = [];
    data.map(item => {
      let obj = { ...item, id: item[id], name: item[idName] };
      lists.push(obj);
    });
    return lists;
  }

  // 一级选择器触发
  categorySelect = value => {
    this.setState(
      {
        categoryId: value,
        subCategoryList: []
      });
    const { allCategoryList } = this.state;
    const sameIndex = allCategoryList.findIndex(item => value === item.id);
    if (sameIndex > -1) {
      let data = allCategoryList[sameIndex];
      console.log("一级菜单选择后：", data);
      this.setState({
        subCategoryList: this.makeFormData(data.subCategoryList, "subCategoryName", "subCategoryId")
      })
    }
  };

  // 二级选择器触发
  subCategorySelect = value => {
    this.setState(
      {
        subCategoryId: value,
        deviceTypeList: []
      });
    const { subCategoryList } = this.state;
    const sameIndex = subCategoryList.findIndex(item => value === item.id);
    if (sameIndex > -1) {
      let data = subCategoryList[sameIndex];
      console.log("二级菜单选择后：", data);
      this.setState({
        deviceTypeList: this.makeFormData(data.deviceTypeList, "deviceTypeName", "deviceTypeId")
      })
    }
  };

  // 点击删除按钮 item 该td的数据，value，td上第几个按钮
  handleDelete = (item, value) => {
    switch (value.key) {
      case 0:
        this.props.history.push({ pathname: `/config/h5template/info/${item.templateId}` });
        break;
      case 1:
        this.editTemplate(item);
        break;
      case 2:
        (Modal.confirm({
          title: '确认',
          okText: '确定',
          cancelText: '取消',
          content: item.status ? '点击确定将模板从模板市场撤销发布并保存为草稿' : '点击确定后将同步到模板市场并对用户可见，点击取消可取消发布。',
          onOk: () => {
            this.h5Publish(item);
          }
        }))
        break;
      case 3:
        (Modal.confirm({
          title: '确认',
          okText: '确定',
          okType: 'danger',
          cancelText: '取消',
          content: item.status ? '点击确定将从模板管理页面删除模板，点击取消返回。' : '点击确定将模板从模板管理页面和模板市场同时删除，点击取消返回',
          onOk: () => {
            this.h5Del(item);
          }
        }))
        break;
      default:
        break;
    }
  };

  // 点击搜索按钮
  filterSubmit = (filterParams) => {

    const { oldParams } = this.state;
    let params = {
      ...oldParams,
      deviceTypeId: filterParams.deviceTypeId,
      status: filterParams.status,
      nature: filterParams.nature,
      templateName: filterParams.templateName
    };
    // 过滤为空的数据
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        // debugger;
        const element = params[key];
        if (!element) {
          delete params[key];
        }
      }
    }
    this.getH5TemplateList(params);
  };

  // 分页选择触发
  paginationChange = (current) => {
    console.log("分页选择了：", current);
    const { oldParams } = this.state;
    let params = {
      ...oldParams,
      pageIndex: current,
    }
    console.log(params);
    this.getH5TemplateList(params);
    var tableScroll = document.querySelector(".ant-table-body");
    tableScroll.scrollTop = 0;
  }

  // 数据处理为下面Ant Table的需要的格式
  makeAntTableData = data => {
    const h5TemplateList = [];
    data.list.map((item, index) => {
      h5TemplateList.push({
        ...item,
        key: item.templateId
      });
    });
    return h5TemplateList;
  };

  render() {
    const { allCategoryList, subCategoryList, deviceTypeList, pagination, loading, h5TemplateList, pager } = this.state;
    // 表单封装，通过构建表单对象，在BaseForm中进行统一渲染
    const formList = [
      { type: "Input", label: "关键字", field: "templateName", placeholder: "请输入模板名称", width: 260 },
      {
        type: "Select", label: "所属分类", field: "categoryId", placeholder: "一级类目", list: allCategoryList,
        onSelect: this.categorySelect,
        resetFields: ["subCategoryId", "deviceTypeId"],
        width: 140
      },
      {
        type: "Select", label: "", field: "subCategoryId", placeholder: "二级类目", list: subCategoryList,
        onSelect: this.subCategorySelect,
        resetFields: ["deviceTypeId"],
        width: 140
      },
      { type: "Select", label: "", field: "deviceTypeId", placeholder: "三级类目", list: deviceTypeList, width: 140 },
      { type: "Select", label: "状态", field: "status", placeholder: "请选择", list: [{ id: "0", name: "未发布" }, { id: "1", name: "已发布" }], width: 140 },
      { type: "Select", label: "性质", field: "nature", placeholder: "请选择", list: [{ id: "1", name: "免费" }], width: 140 }
    ];

    // 表头格式
    const columns = [
      {
        title: "模板名称-CN", width: "15%", key: "templateName", dataIndex: "templateName",
        render: (text) => <span title={text}>{text}</span>
      },
      {
        title: "所属分类", width: "15%", key: "allCategoryName", dataIndex: "allCategoryName",
        render: (text) => <span title={text}>{text}</span>
      },
      // {
      //   title: "描述", width: "15%", key: "remark", dataIndex: "remark",
      //   render: (text) => <span title={text}>{text}</span>
      // },
      {
        title: "二维码", width: "8%", key: "qrcode", dataIndex: "qrcode",
        render(qrcode) {
          let tipsshow = qrcode ?
            (<img className="codeimg" src={qrcode} />) : ("二维码生成中");
          return (
            <div className="td-qrcode">
              <Icon type="barcode" className="s-qrcode" />
              <div className="hovershow">
                <span className="leftarrow" />
                {tipsshow}
              </div>
            </div>
          );
        }
      },
      {
        title: "性质", width: "80px", key: "isFree", dataIndex: "isFree",
        render(isFree) {
          return isFree === 1 ? "免费" : "";
        }
      },
      {
        title: "状态", width: "80px", key: "status", dataIndex: "status",
         render: (status) => {
            const color = ["red", "gray"];
            let text = status === 1 ? "已发布" : "未发布";
            return <span title={text} style={{ color: `${color[status]}` }}>{text}</span>
        }
      },
      {
        title: "更新时间", width: "12%", key: "modifyTime", dataIndex: "modifyTime",
        render: (item) => {
          let text = DateTool.utc2beijing(item, "yyyy-MM-dd hh:mm:ss");
          return <span title={text}>{text}</span>
        }
      },

      {
        title: "操作", width: "13%", key: "operation", dataIndex: "operation",
        render: (text, item) => {
          return (
            <div>
              {btnArr.map((value, index) => {
                return (
                  <Tooltip key={index} placement="top" title={value.key === 2 ? (item.status === 1 ? "下线" : value.title) : value.title}>
                    <Button style={{ marginLeft: "5px" }}
                      shape="circle"
                      size="small"
                      icon={value.key === 2 ? (item.status === 1 ? "cloud-download" : value.icon) : value.icon}
                      key={item.templateId}
                      onClick={() => this.handleDelete(item, value)}
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
      <div className="H5TemplateContent">
        <Card>
          {/* <h3>H5模板</h3> */}
          <Meta title="H5模板" description="" style={{ marginBottom: 10 }} />
          <BaseForm formList={formList} filterSubmit={this.filterSubmit} node={<CreateH5Template allCategoryList={allCategoryList} />} />
        </Card>
        <Card className="H5TemplateTable">
          {/* <Table
            bordered columns={columns} dataSource={h5TemplateList}
            pagination={pagination}
            loading={loading}
            onChange={this.handleTableChange}
          /> */}
          <TableCom rowKey="id" bordered columns={columns} dataSource={h5TemplateList} pager={pager}
            onPageChange={this.paginationChange} loading={loading} />
        </Card>
      </div>
    );
  }
}
export default H5TemplateList;
