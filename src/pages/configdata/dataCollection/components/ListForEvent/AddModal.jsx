import React, { Component } from "react";
import { Modal, Form, Input, Button, Select, message } from "antd";
import TrComForAddModal from "./TrComForAddModal";

class AddModal extends Component {
  state = {
    eventId: -1,
    eventPropertyList: [], //事件属性列表:
    idVal: -1
  };
  formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 4 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 20 } }
  };
  types = [
    { id: "0", value: "私有事件" },
    { id: "1", value: "Web端" },
    { id: "2", value: "移动端" },
    { id: "3", value: "全局事件" }
  ];
  timeList = [
    { id: "1", value: "有统计时长" },
    { id: "0", value: "无统计时长" }
  ];
  inner = null; //事件属性dom
  setInner = ele => (this.inner = ele);
  getPopupContainer = triggerNode => {
    return triggerNode.parentNode;
  };

  componentDidUpdate() {
    const {
      showAddModalForEvent,
      isUpdatingForEvent,
      detailData,
      form
    } = this.props;
    const { idVal } = this.state;
    if (showAddModalForEvent && idVal === -1) {
      let obj = { idVal: 0, eventPropertyList: [] };
      if (isUpdatingForEvent) {
        const {
          eventId,
          eventKey,
          eventName,
          eventType,
          eventDuration,
          applicationId,
          appVersion,
          eventPropertyList
        } = detailData;
        obj.eventId = eventId;
        obj.eventPropertyList =
          eventPropertyList.map((d, i) => {
            return { id: i, ...d };
          }) || [];
        obj.idVal = eventPropertyList ? eventPropertyList.length + 1 : 0;

        // 设置form初始值
        form.setFieldsValue({
          eventKey,
          eventName,
          eventType: eventType + "",
          eventDuration: eventDuration + "",
          applicationId: applicationId || undefined,
          appVersion: appVersion || ""
        });
      }
      this.setState(obj);
    } else if (!showAddModalForEvent && idVal !== -1) {
      this.setState({ idVal: -1, eventId: -1 });
    }
  }

  closeModal = () => {
    this.props.closeAddModalForEvent();
  };
  submit = () => {
    const { form, addEvent, updateEvent } = this.props;
    form
      .validateFields()
      .then(
        ({
          eventKey,
          eventName,
          eventType,
          eventDuration,
          applicationId,
          appVersion
        }) => {
          const { eventPropertyList, eventId } = this.state;
          const rst = this.checkList(eventPropertyList);
          if (!rst) {
            const msg =
              rst === false
                ? "请填好已添加的事件属性(不可同名)！"
                : "填写枚举选项时不可重名且不可为空！";
            Modal.error({
              title: "事件属性填写错误",
              content: msg,
              centered: true,
              zIndex: 1080
            });
            return;
          }
          let data = {
            eventKey,
            eventName,
            eventType: parseInt(eventType),
            eventDuration: parseInt(eventDuration),
            refStatus: eventType === "0" ? 1 : 0,
            eventPropertyList: eventPropertyList.map(({ id, ..._data }) => {
              return { ..._data };
            })
          };
          if (eventType === undefined || eventType === "0") {
            data.applicationId = parseInt(applicationId);
            data.appVersion = appVersion || "";
          }
          if (eventId === -1) {
            addEvent(data);
          } else {
            data.eventId = eventId;
            updateEvent(data);
          }
        }
      )
      .catch(e => {
        message.warn("请根据提示完成选项");
      });
  };
  checkSpace = e => {
    let dom = e.target,
      name = dom.name,
      val = dom.value,
      _val = val.replace(/^(\s+)|(\s+)$/g, "");
    if (name === "eventKey") {
      const { eventType = "0" } = this.props.form.getFieldsValue();
      _val = _val.replace(/[^\w_]/g, "").replace(/^\d+/, "");
      if (eventType !== "0") {
        _val = "$" + _val;
      }
    }
    return _val;
  };
  changeType = val => {
    let { eventKey = "" } = this.props.form.getFieldsValue();
    eventKey = eventKey.replace(/[^\w_]/g, "");
    this.props.form.setFieldsValue({
      eventKey: val === "0" ? eventKey : "$" + eventKey
    });
  };
  checkList(list) {
    let objMap = {};
    for (let i = list.length; i--; ) {
      const { propertyName, propertyType, propertyEnum } = list[i];
      //禁止为空
      if (propertyName === "") {
        return false;
      }
      if (propertyType === 1 && propertyEnum === "") {
        return null;
      }
      //禁止同名
      if (objMap[propertyName]) {
        return false;
      }
      //禁止枚举属性重名
      if (propertyType === 1) {
        let arrs = propertyEnum.split("|");
        //有枚举值重复或者有空字符串值，则返回null
        if (new Set(arrs).size !== arrs.length || arrs.indexOf("") > -1) {
          return null;
        }
      }
      objMap[propertyName] = true;
    }
    return true;
  }
  addPropsList = () => {
    let { eventPropertyList, idVal } = this.state;
    let rst = this.checkList(eventPropertyList);
    if (!rst) {
      message.warning("请填好已添加的事件属性(不可同名且不可为空)");
      return;
    }
    idVal++;
    eventPropertyList.push({
      id: idVal,
      propertyName: "",
      propertyRemark: "",
      propertyType: 0,
      propertyEnum: ""
    });
    this.setState({ eventPropertyList, idVal }, () => {
      //因为此处执行的回调是在didUpdate生命周期中执行的，但setState的回调....
      //所以此处执行0秒后的延时处理
      setTimeout(() => {
        if (this.inner) {
          this.inner.scrollTop = 99999;
          try {
            const doms = this.inner.getElementsByTagName("input"),
              last = doms.length - 2;
            doms[last].focus();
          } catch (e) {}
        }
      }, 0);
    });
  };
  setPropsList = (index, data) => {
    let { eventPropertyList } = this.state;
    eventPropertyList[index] = data;
    this.setState({ eventPropertyList });
  };
  delPropsList = index => {
    let { eventPropertyList } = this.state;
    eventPropertyList.splice(index, 1);
    this.setState({ eventPropertyList });
  };
  render() {
    const {
      showAddModalForEvent,
      isSavingForEvent,
      allList,
      form
    } = this.props;
    const { eventPropertyList } = this.state;
    const { getFieldDecorator, getFieldsValue } = form;
    const { eventType } = getFieldsValue();
    const needChooseAPP = eventType === undefined || eventType === "0"; // 只有私有事件才需要关联应用
    return (
      <Modal
        width={920}
        title="新建事件"
        visible={showAddModalForEvent}
        maskClosable={false}
        okButtonProps={{ loading: isSavingForEvent }}
        onOk={this.submit}
        onCancel={this.closeModal}
        destroyOnClose={true}
      >
        <Form {...this.formItemLayout}>
          <Form.Item label="事件Key">
            {getFieldDecorator("eventKey", {
              getValueFromEvent: this.checkSpace,
              rules: [
                {
                  required: true,
                  pattern: /^[$]?[a-zA-Z_][\w_]*$/,
                  message: "字母、数字、下划线（首字符不能为数字）"
                }
              ]
            })(
              <Input
                placeholder="请输入事件Key(字母、数字、下划线)"
                maxLength={60}
                name="eventKey"
              />
            )}
          </Form.Item>
          <Form.Item label="事件名称">
            {getFieldDecorator("eventName", {
              getValueFromEvent: this.checkSpace,
              rules: [{ required: true, message: "请输入事件名称" }]
            })(
              <Input
                placeholder="请输入事件名称"
                maxLength={30}
                name="eventName"
              />
            )}
          </Form.Item>
          <Form.Item label="事件类型">
            {getFieldDecorator("eventType", {
              initialValue: this.types[0].id,
              rules: [{ required: true }]
            })(
              <Select
                showSearch
                getPopupContainer={this.getPopupContainer}
                notFoundContent="未找到相应记录"
                optionFilterProp="children"
                onChange={this.changeType}
              >
                {this.types.map(({ id, value }) => {
                  return (
                    <Select.Option value={id} key={id}>
                      {value}
                    </Select.Option>
                  );
                })}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="统计时长">
            {getFieldDecorator("eventDuration", {
              initialValue: this.timeList[0].id,
              rules: [{ required: true }]
            })(
              <Select
                showSearch
                getPopupContainer={this.getPopupContainer}
                notFoundContent="未找到相应记录"
                optionFilterProp="children"
              >
                {this.timeList.map(({ id, value }) => {
                  return (
                    <Select.Option value={id} key={id}>
                      {value}
                    </Select.Option>
                  );
                })}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="选择关联应用">
            {getFieldDecorator("applicationId", {
              initialValue: undefined,
              rules: [{ required: needChooseAPP, message: "请选择关联应用" }]
            })(
              <Select
                disabled={!needChooseAPP}
                showSearch
                getPopupContainer={this.getPopupContainer}
                notFoundContent="未找到符合的应用"
                placeholder="输入应用名或应用ID查找"
                optionFilterProp="children"
              >
                {allList.map(({ applicationId, applicationName }) => {
                  return (
                    <Select.Option value={applicationId} key={applicationId}>
                      {applicationId + "-" + applicationName}
                    </Select.Option>
                  );
                })}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="应用版本">
            {getFieldDecorator("appVersion", {
              getValueFromEvent: this.checkSpace,
              rules: [{ message: "请输入应用版本号" }]
            })(
              <Input
                disabled={!needChooseAPP}
                placeholder="请输入应用版本号"
                maxLength={30}
                name="appVersion"
              />
            )}
          </Form.Item>
          <Form.Item label="事件属性">
            <div className="page-props">
              <div className="page-props-inner" ref={this.setInner}>
                <table>
                  <tbody>
                    {eventPropertyList.map((data, idx) => {
                      return (
                        <TrComForAddModal
                          data={data}
                          index={idx}
                          onChange={this.setPropsList}
                          onDel={this.delPropsList}
                          key={data.id}
                        />
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <Button
                type="link"
                className="page-addBtn"
                onClick={this.addPropsList}
              >
                添加属性
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create({ name: "AddModalForApp" })(AddModal);
