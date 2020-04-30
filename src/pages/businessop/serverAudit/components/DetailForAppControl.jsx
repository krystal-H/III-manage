import React, { Component, Fragment } from "react";
import { Descriptions, Card, Radio, Input, Form, Badge } from "antd";

class DetailForAppControl extends Component {
  mlSty = { marginLeft: "20px", wordBreak: "break-all" };
  render() {
    const {
      detailData,
      form: { getFieldDecorator, getFieldValue }
    } = this.props;
    const { appProject = {}, flowCheck = {}, product = {} } =  detailData || {};
    const { productId, productName, allCategoryName } = product; // 产品信息
    const { projectName, appName, qrcode, status } = appProject; // 应用信息
    const { statu, remark } = flowCheck; // 审核信息
    const isCheck = statu === 0; // 当前是否需要审核
    const isCheckWithError = statu === 2; // 当前是否审核不通过
    const nowStatus = getFieldValue("statu");
    return (
      <Fragment>
        <Descriptions title="基础信息" column={2} size="small">
          <Descriptions.Item label="产品名称">{productName}</Descriptions.Item>
          <Descriptions.Item label="页面名称">{projectName}</Descriptions.Item>
          <Descriptions.Item label="产品ID">{productId}</Descriptions.Item>
          <Descriptions.Item label="发布APP">{appName}</Descriptions.Item>
          <Descriptions.Item label="所属分类">
            {allCategoryName}
          </Descriptions.Item>
          <Descriptions.Item label="升级方式">
            {status === 1 ? "普通升级" : "强制升级"}
          </Descriptions.Item>
        </Descriptions>
        <Descriptions
          className="page-nomb"
          title={isCheck ? "审核内容" : "页面二维码"}
          size="small"
        ></Descriptions>
        <Card
          className="page-ewm"
          hoverable
          cover={<img alt={qrcode&&"预览二维码"||"二维码未获取到"} src={qrcode} />}
        >
          <Card.Meta title="扫描预览页面" />
        </Card>
        <div className="page-interval" />
        <Descriptions
          className="page-nomb"
          size="small"
          title={
            isCheck ? (
              "审核结果"
            ) : (
              <Fragment>
                <span>审核状态</span>
                <Badge
                  style={this.mlSty}
                  status={statu === 1 ? "success" : "error"}
                  text={statu === 1 ? "通过" : "不通过"}
                />
              </Fragment>
            )
          }
        >
          {isCheck ? (
            <Descriptions.Item span={3}>
              <Form.Item>
                {getFieldDecorator("statu", {
                  rules: [{ required: true, message: "请选择审核意见" }]
                })(
                  <Radio.Group>
                    <Radio value={1}>审核通过</Radio>
                    <Radio value={2}>审核不通过</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
            </Descriptions.Item>
          ) : null}
        </Descriptions>
        {isCheck && nowStatus === 2 ? (
          <Fragment>
            <Descriptions title="驳回说明" size="small"></Descriptions>
            <Form.Item className="page-nomb">
              {getFieldDecorator("remark", {
                // rules: [{ required: true, message: "请补充驳回说明" }]
              })(
                <Input.TextArea
                  rows={3}
                  maxLength={500}
                  placeholder="请输入驳回说明"
                />
              )}
            </Form.Item>
          </Fragment>
        ) : null}
        {isCheckWithError ? (
          <Descriptions
            title={
              <Fragment>
                <span>驳回说明</span>
                <Badge
                  style={this.mlSty}
                  status="error"
                  text={remark || "无"}
                />
              </Fragment>
            }
            size="small"
          ></Descriptions>
        ) : null}
      </Fragment>
    );
  }
}

export default DetailForAppControl;
