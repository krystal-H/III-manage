import React, { Component } from "react";
import { Modal, Form, message } from "antd";
import DetailForScene from "./DetailForScene";

class DetailModal extends Component {
  closeModal = () => {
    this.props.closeModal();
  };
  submit = () => {
    const { detailData, form, checkForAPP } = this.props;
    form
      .validateFields()
      .then(obj => {
        const { id, sceneFunctionList } = detailData;
        checkForAPP({
          id,
          list: sceneFunctionList.map(({ deviceCmdId, cmdType }) => ({
            deviceCmdId,
            cmdType,
            status: obj["statu-" + deviceCmdId]
          })),
          remark: obj.remark || ""
        });
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
    const { status } = detailData || {};
    const isCheck = status === 0; // 当前是否是待审核状态
    let others = {}; // Modal的不定属性设置
    if (!isCheck) {
      others.footer = null;
    }
    return (
      <Modal
        width={1120}
        title="场景服务审核"
        visible={showDetailModal}
        okButtonProps={{ loading: isSaving }}
        onOk={this.submit}
        onCancel={this.closeModal}
        destroyOnClose={true}
        {...others}
      >
        <DetailForScene
          detailData={detailData}
          sceneType={sceneType}
          form={form}
        />
      </Modal>
    );
  }
}

export default Form.create({ name: "sceneAuditChecker" })(DetailModal);
