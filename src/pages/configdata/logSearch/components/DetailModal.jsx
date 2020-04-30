import React, { Component } from "react";
import { Modal } from "antd";
import DlHighlight from "../util/DlHighlight";

class DetailModal extends Component {
  closeModal = () => {
    this.props.closeModal();
  };
  getCode() {
    const detailData = this.props.detailData || { details: { properties: {} } };
    let allStr = JSON.stringify(detailData),
      detailStr = JSON.stringify(detailData.details),
      propertiesStr = JSON.stringify(detailData.details.properties);
    //处理propertiesStr
    let str3 = propertiesStr
      .replace(/\{/g, "{\t")
      .replace(/\}/g, "\n}")
      .replace(/,"/g, ',\t"');
    //处理detailStr
    let str2 = detailStr
      .replace(propertiesStr, str3)
      .replace(/\{/g, "{\t")
      .replace(/([\n])\}/g, "$1\t}")
      .replace(/([^\n\t])\}/g, "$1\n}")
      .replace(/,([\t"])/g, ",\t$1");
    //处理整个
    let str1 = allStr
      .replace(detailStr, str2)
      .replace(/\{/g, "{\n\t")
      .replace(/([\n\t])\}/g, "$1\t}")
      .replace(/([^\n\t])\}/g, "$1\n}")
      .replace(/,([\t"])/g, ",\n\t$1");

    return new DlHighlight({
      lang: "js",
      lineNumbers: false
    }).doItNow(str1);
  }
  render() {
    const { showDetailModal, allListMap, detailData } = this.props;
    const { log_id, application_id, event_key, user_id } = detailData || {};
    return (
      <Modal
        width={680}
        title="查看日志"
        visible={showDetailModal}
        footer={null}
        onCancel={this.closeModal}
      >
        <table className="DlHighlight-table">
          <tbody>
            <tr>
              <th width="5%">日志ID</th>
              <td width="45%">{log_id}</td>
              <th width="5%">所属应用</th>
              <td width="45%">{allListMap[application_id]}</td>
            </tr>
            <tr>
              <th>eventKey</th>
              <td>{event_key}</td>
              <th>用户ID</th>
              <td>{user_id}</td>
            </tr>
            <tr>
              <td colSpan="4">
                <div className="DlHighlight-table-code">
                  <pre
                    className="DlHighlight"
                    dangerouslySetInnerHTML={{ __html: this.getCode() }}
                  ></pre>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </Modal>
    );
  }
}

export default DetailModal;
