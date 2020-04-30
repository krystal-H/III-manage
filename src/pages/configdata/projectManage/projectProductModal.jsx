import React from 'react';
import { connect } from 'react-redux';
import { Modal, Table, Button, Input, notification } from 'antd';
import { actionCreators } from './store';

class projectProductModal extends React.Component {
    state = {
        macAddress: "",
        loading: false
    }

    handleOk = () => {
        const { deviceList } = this.props;

        if (!deviceList || deviceList.length === 0) {
            this.props.onCancel();
        } else {
            this.props.addDevice(deviceList);
            this.props.onCancel();
        }
    }

    // 修改mac
    handleChange = (e) => {
        this.setState({
            macAddress: e.target.value
        });
    }

    // 查询
    handleQuery = () => {
        this.setState({
            loading: true
        }, () => {
            const { projectId } = this.props;
            this.props.getDevice({ macAddress: this.state.macAddress, projectId }).then(res => {
                this.setState({
                    loading: false
                });
            });
        });
    }

    componentWillReceiveProps(nextProps) {
        const { visible } = nextProps;
        if (visible && !this.props.visible) {
            this.setState({
                macAddress: ""
            });
            // 清除旧数据
            this.props.clearDevice();
        }
    }

    render() {
        const { macAddress, loading } = this.state;
        const { deviceList, visible, onCancel } = this.props;
        const columns = [
            { title: "MAC", dataIndex: "macAddress", width: "15%" },
            { title: "IMEI", dataIndex: "imei", width: "15%" },
            { title: "产品ID", dataIndex: "productId", width: "10%" },
            { title: "产品型号", dataIndex: "productCode", width: "20%" },
            { title: "产品名称", dataIndex: "productName", width: "20%" },
            { title: "所属分类", dataIndex: "allCategoryName", width: "20%" },
            // { title: "大类", dataIndex: "deviceTypeName", width: "15%" },
            // { title: "小类", dataIndex: "deviceSubtypeName", width: "15%" },
        ];

        return (
            <Modal
                wrapClassName={"projectmanage-modal-add"}
                width={1200}
                visible={visible}
                onCancel={onCancel}
                footer={(
                    <div className="footer">
                        <Button type={"primary"} className="btn-save" onClick={this.handleOk}>保存</Button>
                        <Button type={"primary"} className="btn-cancel" onClick={onCancel}>取消</Button>
                    </div>
                )}
            >
                <h2>添加产品设备</h2>
                <div className="header">
                    <Input placeholder="请输入MAC地址查询" maxLength={20} onChange={this.handleChange} value={macAddress} onPressEnter={this.handleQuery} />
                    <Button type="primary" onClick={this.handleQuery}>查询</Button>
                </div>
                <div className="projectmanage-modal-table product">
                    <Table bordered loading={loading} rowKey={"productId"} pagination={false} columns={columns} dataSource={deviceList} />
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => ({
    deviceList: state.getIn(["projectManage", "deviceList"]).toJS(),
});

const mapDispatchToProps = (dispatch) => ({
    getDevice: (macAddress) => dispatch(actionCreators.getDevice(macAddress)),
    addDevice: (list) => dispatch(actionCreators.addDevice(list)),
    clearDevice: () => dispatch(actionCreators.setDevice([]))
});


export default connect(mapStateToProps, mapDispatchToProps)(projectProductModal);