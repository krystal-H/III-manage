import React from 'react'
import { Button } from 'antd'
import { connect } from 'react-redux'
import { actionCreators } from './store';
import ProjectPositionModal from './projectPositionModal'

class ProjectPosition extends React.Component {
    state = {
        visible: false
    }

    // 打开添加位置模型窗口
    handleAdd = () => {
        this.setState({
            visible: true
        })
    }

    // 关闭位置数据模型窗口  
    handleCancel = () => {
        this.setState({
            visible: false
        })
    }

    componentDidMount() {
        const { positionList } = this.props;
        if (!positionList || positionList.length === 0) {
            this.props.getPositionList(); // 获取位置数据模型列表
        }
    }

    render() {
        const { visible } = this.state;
        const { projectPositionDataModel } = this.props;
        const { modelId, modelName } = projectPositionDataModel;
        return (
            <div className="edit-detail position">
                <p>{modelId ? "已关联位置数据模型" : "尚未关联位置数据模型"}</p>
                {modelId ? <p className="model-name">{modelName}</p> : ""}
                <Button type="primary" className="btn-choose" onClick={this.handleAdd}>选择位置数据模型</Button>

                <ProjectPositionModal
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    projectPositionDataModel: state.getIn(["projectManage", "project", "projectPositionDataModel"]).toJS(),
    positionList: state.getIn(["projectManage", "positionList"]).toJS(),
})

const mapDispatchToProps = (dispatch) => ({
    getPositionList: () => dispatch(actionCreators.getPositionList())
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPosition)