import React, { Component } from "react";
import { Modal, Form, message } from "antd";
import DetailForAppControl from "./DetailForAppControl";
// import DetailForScene from "./DetailForScene";

class DetailModal extends Component {
  closeModal = () => {
    this.props.closeModal();
  };
  submit = () => {
    const { detailData, form, checkForAPP } = this.props;
    form
      .validateFields()
      .then(obj => {
        const {
          prevDetailData: { type = 11 },
          flowCheck: { id }
        } = detailData;
        if (type === 11) {
          // APP控制服务审核提交
          checkForAPP({ id, ...obj });
        } else {
        }
      })
      .catch(e => {
        message.warn("请根据提示完成选项");
      });
  };
  render() {
    const {
      showDetailModal,
      serverTypeMap,
      sceneType,
      detailData,
      isSaving,
      form
    } = this.props;
    const { prevDetailData, flowCheck: { statu } = {} } = detailData || {};
    const { type = 11 } = prevDetailData || {};
    const title = serverTypeMap[type]; // 当前服务审核类型
    const isCheck = statu === 0; // 当前是否是待审核状态
    const width = type === 11 ? 800 : 1080;
    let others = {}; // Modal的不定属性设置
    if (!isCheck) {
      others.footer = null;
    }
    return (
      <Modal
        width={width}
        title={title}
        visible={showDetailModal}
        okButtonProps={{ loading: isSaving }}
        onOk={this.submit}
        onCancel={this.closeModal}
        destroyOnClose={true}
        {...others}
      >
        <DetailForAppControl detailData={detailData} form={form} />
      </Modal>
    );
  }
}

export default Form.create({ name: "serverAuditChecker" })(DetailModal);
