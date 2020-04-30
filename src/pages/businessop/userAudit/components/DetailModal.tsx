import React, { Component, Fragment } from "react";
import { Modal, Descriptions, Badge } from "antd";
import moment from "moment";

const getTimeStr = function(num: number | null) {
  if (!num) {
    return null;
  }
  const t = moment(num);
  const s = t
    .add(t.utcOffset() / 60, "h")
    // 此处不需要进行0时区转化为当前时区
    .format("YYYY-MM-DD HH:mm:ss");
  return s;
};

interface DetailModalProps {
  closeModal: () => void;
  checkForUser: (data: object) => void;
  showDetailModal: boolean;
  detailData: any;
  isSaving: boolean;
}

class DetailModal extends Component<DetailModalProps> {
  mlSty = { marginLeft: "20px" };
  redStyle = { color: "red" };
  greenStyle = { color: "green" };
  closeModal = () => {
    this.props.closeModal();
  };
  submit = () => {
    const {
      detailData: {
        prevDetailData: { id }
      },
      checkForUser
    } = this.props;
    checkForUser({ id, statu: 1 });
  };
  render() {
    const { showDetailModal, detailData, isSaving } = this.props;
    const {
      developerId, // 账号Id
      mobilePhone, // 手机号码
      createTime, // 注册时间
      email, // 电子邮箱
      contactPerson, // 联系人
      contactAddr, // 联系地址
      reason, // 注销原因
      appApply, // 应用&APP可用（1-可用；2-不可用）
      hardware, // 硬件产品可用（1-可用；2- 不可用）
      status = 0 // 审核状态 0-待审核 1-通过 2-驳回
    } = (detailData && detailData.data) || {};
    const isCheck = status === 0; // 当前是否是待审核状态
    let others: any = {}; // Modal的不定属性设置
    if (!isCheck) {
      others.footer = null;
    }
    return (
      <Modal
        width={800}
        title="用户注销审核"
        visible={showDetailModal}
        okButtonProps={{ loading: isSaving }}
        okText="审核通过"
        onOk={this.submit}
        onCancel={this.closeModal}
        destroyOnClose={true}
        {...others}
      >
        <Descriptions title="账号信息" column={2} size="small">
          <Descriptions.Item label="账号ID">{developerId}</Descriptions.Item>
          <Descriptions.Item label="注册时间">
            {getTimeStr(createTime)}
          </Descriptions.Item>
          <Descriptions.Item label="手机号码">{mobilePhone}</Descriptions.Item>
          <Descriptions.Item label="电子邮箱">{email}</Descriptions.Item>
          <Descriptions.Item label="联系人">{contactPerson}</Descriptions.Item>
          <Descriptions.Item label="联系地址">{contactAddr}</Descriptions.Item>
        </Descriptions>
        <Descriptions size="small" title="注销说明" column={2}>
          <Descriptions.Item label="注销原因" span={2}>
            {reason}
          </Descriptions.Item>
          <Descriptions.Item label="保持应用可用">
            {appApply === 1 ? (
              <span style={this.greenStyle}>保持应用&APP可用</span>
            ) : appApply === 2 ? (
              <span style={this.redStyle}>应用&APP不可用</span>
            ) : null}
          </Descriptions.Item>
          <Descriptions.Item label="保持硬件可用">
            {hardware === 1 ? (
              <span style={this.greenStyle}>保持硬件可用</span>
            ) : hardware === 2 ? (
              <span style={this.redStyle}>硬件产品不可用</span>
            ) : null}
          </Descriptions.Item>
        </Descriptions>
        {!isCheck ? (
          <Descriptions
            className="page-nomb"
            size="small"
            title={
              <Fragment>
                <span>审核结果</span>
                <Badge
                  style={this.mlSty}
                  status={status === 1 ? "success" : "error"}
                  text={status === 1 ? "通过" : "不通过"}
                />
              </Fragment>
            }
          ></Descriptions>
        ) : null}
        <div className="page-interval" />
        <div className="page-interval" />
        <div className="page-interval" />
      </Modal>
    );
  }
}

export default DetailModal;
