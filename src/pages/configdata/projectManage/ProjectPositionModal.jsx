import React from 'react';
import { connect } from 'react-redux'
import { Modal, Input, Button, Table } from 'antd';
import { actionCreators } from './store';

class ProjectPositionModel extends React.Component {
    state = {
        active: null,
        modelName: "",
        query: ""
    };

    // 保存位置数据模型
    handleOk = () => {
        const { active } = this.state;
        if (typeof active == undefined) {
            this.props.onCancel();
            return;
        }
        this.props.setPosition(active)
        this.props.getSummaryList(active.modelId)
        this.props.onCancel();
    }

    // 点击选择
    handleClick = (model) => {
        this.setState({
            active: model
        })
    }

    // 修改模型名称
    handleChange = (e) => {
        this.setState({
            modelName: e.target.value
        })
    }

    // 查询
    handleQuery = () => {
        const { modelName } = this.state;
        this.setState({
            query: modelName
        })
    }

    componentWillReceiveProps(nextProps) {
        const { visible } = nextProps;
        if (visible && !this.props.visible) {
            this.setState({
                active: null,
                modelName: "",
                query: ""
            })
        }
    }

    render() {
        const { active, modelName, query } = this.state;
        const { modelId } = active || this.props.projectPositionDataModel;
        const { visible, onCancel, positionList } = this.props;
        const list = positionList ? positionList.filter(item => item.modelName.toLowerCase().indexOf(query.toLowerCase()) >= 0) : [];
        const columns = [
            { title: "模型名称", dataIndex: "modelName", width: "40%", },
            { title: "描述", dataIndex: "modelDesc", width: "60%" },
        ];

        return (
            <Modal
                wrapClassName={"projectmanage-modal-add"}
                width={800}
                visible={visible}
                onOk={this.handleOk}
                onCancel={onCancel}
                footer={(
                    <div className="footer">
                        <Button type={"primary"} className="btn-save" onClick={this.handleOk}>保存</Button>
                        <Button type={"primary"} className="btn-cancel" onClick={onCancel}>取消</Button>
                    </div>
                )}
            >
                <h2>选择位置数据模型</h2>
                <div className="header">
                    <Input placeholder="请选择位置数据模型" maxLength={20} onChange={this.handleChange} value={modelName} onPressEnter={this.handleQuery} />
                    <Button type="primary" onClick={this.handleQuery}>查询</Button>
                </div>
                <div className="projectmanage-modal-table">
                    <Table rowKey="modelId" pagination={false} columns={columns} dataSource={list}
                        onRow={record => {
                            return {
                                onClick: this.handleClick.bind(this, record)
                            }
                        }}
                        scroll={{ x: 'max-content', y: 400 }} rowSelection={{
                            type: 'radio',
                            selectedRowKeys: [modelId],
                            onSelect: this.handleClick
                        }} />
                </div>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => ({
    projectPositionDataModel: state.getIn(["projectManage", "project", "projectPositionDataModel"]).toJS(),
    positionList: state.getIn(["projectManage", "positionList"]).toJS(),
})

const mapDispatchToProps = (dispatch) => ({
    setPosition: (model) => dispatch(actionCreators.setPosition(model)),
    getSummaryList: (modelId) => dispatch(actionCreators.getSummaryList(modelId))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPositionModel)