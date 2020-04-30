import React from 'react';
import { connect } from 'react-redux';
import { Button, Input, Table, notification } from 'antd';
import { actionCreators } from './store';
import ProjectProductModal from './projectProductModal';

class ProjectProduct extends React.Component {
    state = {
        visible: false,
        macAddress: "",
        productId: "",
        query: {
            macAddress: "",
            productId: "",
        }
    }

    fileInput = null;
    // 导入文件
    fileChange = (e) => {
        this.props.uploadDevice(e.target.files[0]).then(res => {
            if(res){
                notification.success({
                    message: "导入成功",
                    duration: 3,
                });
            }
        });
        this.fileInput.value = "";
    }

    // 打开窗口
    handleAdd = () => {
        this.setState({
            visible: true
        });
    }

    // 关闭窗口
    handleCancel = () => {
        this.setState({
            visible: false
        });
    }

    // 删除设备
    handleDel = (product) => {
        this.props.delDevice(product);
    }

    // 改变查询条件
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    // 查询
    handleQuery = () => {
        const { macAddress, productId } = this.state;
        this.setState({
            query: {
                macAddress, productId
            }
        });
    }

    componentDidMount() {
        // console.log(this.props);
    }

    render() {
        const { projectId } = this.props.match.params;
        const { visible, query } = this.state;
        const { projectDeviceProductList, positionList } = this.props;
        const columns = [
            { title: "MAC", dataIndex: "macAddress", width: "150px",  render: (text) => <span title={text}>{text}</span> },
            { title: "IMEI", dataIndex: "imei", width: "10%", render: (text) => <span title={text}>{text}</span> },
            { title: "产品ID", dataIndex: "productId", width: "100px" },
            { title: "产品型号", dataIndex: "productCode", width: "15%",  render: (text) => <span title={text}>{text}</span> },
            { title: "产品名称", dataIndex: "productName", width: "20%",  render: (text) => <span title={text}>{text}</span>},
            { title: "所属分类", dataIndex: "allCategoryName", width: "20%", render: (text) => <span title={text}>{text}</span> },
            {
                title: "操作", width: "100px", render: (item) =>
                    <div className="action">
                        <span onClick={this.handleDel.bind(this, item)}>删除</span>
                    </div>
            },
        ];
        const { macAddress, productId } = query;
        const list = projectDeviceProductList && projectDeviceProductList.length > 0 ? projectDeviceProductList.filter(item => item.macAddress.toLowerCase().indexOf(macAddress.toLowerCase()) >= 0)
            .filter(item => new RegExp(`^${productId.toLowerCase()}`).test((item.productId + '').toLowerCase())) : [];
        return (
            <div className="edit-detail production">
                <div className="tab-query">
                    <Input placeholder={"MAC地址"} maxLength={20} className="left" name="macAddress" onChange={this.handleChange} onPressEnter={this.handleQuery} />
                    <Input placeholder={"产品ID"} maxLength={20} className="left" name="productId" onChange={this.handleChange} onPressEnter={this.handleQuery} />
                    <Button type="primary" className="left" onClick={this.handleQuery} >查询</Button>
                    <Button type="primary" className="right" onClick={this.handleAdd}>添加产品</Button>
                    <div className="btn-upload">
                        <Button type="primary" >批量导入
                            <input type="file" className="upload" accept=".xls, .xlsx" onChange={this.fileChange} ref={node => this.fileInput = node} />
                        </Button>
                    </div>
                    <a className="right" href="/v1/web/manage-open/project/management/deviceProduct/download">下载模板</a>
                </div>

                <Table rowKey="macAddress" bordered pagination={false} columns={columns} dataSource={list} scroll={{ x: 'max-content', y: 500 }} />

                <ProjectProductModal
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    projectDeviceProductList={projectDeviceProductList}
                    projectId={projectId}
                    positionList={positionList}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    projectDeviceProductList: state.getIn(["projectManage", "project", "projectDeviceProductList"]).toJS(),
});

const mapDispatchToProps = (dispatch) => ({
    getProductList: (projectId) => dispatch(actionCreators.getProductList(projectId)),
    uploadDevice: (file) => dispatch(actionCreators.uploadDevice(file)),
    delDevice: (product) => dispatch(actionCreators.delDevice(product)),
    addDevice: (list) => dispatch(actionCreators.addDevice(list)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectProduct);