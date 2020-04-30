import React from 'react'
import { connect } from 'react-redux';
import { notification, Modal } from 'antd';
import ModelList from './ModelList';
import ModelListNew from './ModelListNew';
import { actionCreators } from './store';

const level = '一二三四五六七八九十';

class ModelData extends React.Component {
    state = {
        visible: false,
        summaryItem: null
    }

    // 添加层级
    onAddGroup = (data) => {
        const { modelId, model } = this.props;
        const { summaryItem } = this.state;
        const len = model.length;
        let parentId;
        let id = len > 0 && summaryItem ? model.findIndex(item => item.summary.summaryId == summaryItem.summaryId) : undefined;
        parentId = id ? model[id - 1].summary.summaryId : undefined;
        let params = {
            summaryId: summaryItem ? summaryItem.summaryId : null,
            summary: data.summary,
            modelId: modelId,
            parentId: summaryItem ? parentId : len > 0 ? model[len - 1].summary.summaryId : undefined
        };

        this.props.saveSummary(params).then(code => {
            if (code === 0) {
                this.onCloseGroup()
            } else {
                notification.error({
                    message: "保存数据失败",
                    duration: 3,
                })
            }
        });
    }

    // 关闭编辑层级
    onCloseGroup = () => {
        const { form } = this.form.props;
        form.resetFields();
        this.setState({
            visible: false,
            summaryItem: null
        })
    }

    // 编辑
    onEdit = (item) => {
        // 判断是否存在modelId
        const { modelId, model } = this.props;
        if (!(+modelId)) {
            notification.error({
                message: "请先保存基本信息",
                duration: 3,
            })
            return;
        }
        if ((!item || !item.summary) && model.length > 9) {
            notification.error({
                message: "层级数不得超过十",
                duration: 3,
            })
            return;
        }
        if (item && item.summary) {
            this.setState({
                summaryItem: item.summary
            })
        }
        this.setState({
            visible: true,
        })
    }

    // 删除层级
    handleDel = (summary) => {
        const {modelId} = this.props;
        Modal.confirm({
            title: "是否删除层级？",
            centered: true,
            onOk: () => {
                this.props.delSummary(summary.summaryId).then(res => {
                    if(res){
                        this.props.getModelList(modelId);
                    }
                });
            }
        })
    }

    render() {
        const { model, modelId } = this.props;
        const { visible, summaryItem } = this.state;
        return (
            <div className="data-model">
                {
                    model && model.length > 0 ? model.map((item, index) => {
                        return <div className="data-model-item" key={index}>
                            <h2>{`第${level[index]}层级`}</h2>
                            <ModelList model={item} id={index} nextItem={model[index + 1] ? model[index + 1].elements : []}
                                onEdit={this.onEditItem} prevItem={index > 0 ? model[index - 1].elements : []} modelId={modelId}/>
                            <div className="footer">
                                <a className="edit" onClick={this.onEdit.bind(this, item)}>编辑</a>
                                <a className="delete" onClick={this.handleDel.bind(this, item.summary)}>删除</a>
                            </div>
                        </div>
                    }) :
                        <div className="data-model-item">
                            <div className="title">
                                <a onClick={this.onEdit}>点击添加</a>
                            </div>
                        </div>
                }
                {
                    model && model.length > 0 ?
                        <div className="data-model-item add">
                            <a onClick={this.onEdit.bind(this)}>添加子层级</a>
                        </div>
                        : null
                }

                <ModelListNew visible={visible} onOk={this.onAddGroup} onCancel={this.onCloseGroup}
                    wrappedComponentRef={(form) => this.form = form} summary={summaryItem} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    model: state.getIn(["positionModel", "model"]).toJS()
})

const mapDispatchToProps = (dispatch) => ({
    saveSummary: (params) => dispatch(actionCreators.saveSummary(params)),
    delSummary: (summaryId) => dispatch(actionCreators.delSummary(summaryId)),
    getModelList: (id) => dispatch(actionCreators.getLocationDetailList(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ModelData)