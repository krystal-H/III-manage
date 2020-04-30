import React from 'react'
import { Icon, notification } from 'antd'
import { connect } from 'react-redux'
import ModelListItemNew from './ModelListItemNew'
import { actionCreators } from './store'

/** 
 * 设置样式时将svg的起点设在第一块的右边框中心
 * 起点 0，0 为第一块的中心位置
 * 上下两块间隔50px
 * 左右两个模块间隔80px
*/
const [cellHeight, cellGap] = [50, 40]; // 上下两块间隔，左右两个模块距离

class ModelList extends React.Component {
    state = {
        index: 0,
        visible: false,
        selected: [],
        elementsItem: null
    }
    onChange = (k) => {
        this.setState({
            index: k,
        })
    }
    // 编辑
    onEdit = (item) => {
        this.setState({
            visible: true,
            elementsItem: item || null
        })
    }
    // 关闭
    onCloseItem = () => {
        this.setState({
            visible: false
        })
    }
    // 添加
    onAddItem = (val) => {
        const { elementsItem } = this.state;
        const { model, modelId } = this.props;
        const { summaryId } = model.summary;

        if (model.elements && model.elements.length > 99) {
            notification.error({
                message: "单层数据不能超过100",
                duration: 3,
            })
            return;
        }
        // 未修改数据
        if (elementsItem.elementId && val.elementName == elementsItem.elementName && val.parentIds == elementsItem.parentIds) {
            this.setState({
                visible: false
            })
            return;
        }

        this.props.addElement({ ...val, elementId: elementsItem.elementId || null, summaryId }).then(code => {
            if (code) {
                this.props.getModelList(modelId);
                this.setState({
                    visible: false
                })
            }
        })
    }

    render() {
        const { model, nextItem, prevItem, id } = this.props;
        const { summary, elements } = model;
        const { index, visible, elementsItem } = this.state;
        const connectList = [];

        // 找到子层级中关联的数据
        nextItem.map((item, id) => {
            item.parentIds = typeof item.parentIds == 'string' ? JSON.parse(item.parentIds) : item.parentIds || [];
            if (item.parentIds.findIndex(inner => inner == elements[index].elementId) >= 0) {
                connectList.push(id)
            }
        })
        // 竖线最高位置和最低位置
        let min, max;
        if (connectList.length > 0) {
            const sortList = connectList.sort((x, y) => { return x.id - y.id })
            min = index < sortList[0] ? index : sortList[0];
            max = index > sortList[sortList.length - 1] ? index : sortList[sortList.length - 1];
        }

        return (
            <div >
                <div className="title">
                    <p title={summary.summary}>{summary.summary}</p>
                </div>
                <ul>
                    {
                        elements.map((item, k) => (
                            <li className={k == index ? "active" : ""} key={k} onClick={this.onChange.bind(this, k)}>
                                {item.elementName}
                                <Icon type="edit" className="edit" onClick={this.onEdit.bind(this, item)} />
                            </li>
                        ))
                    }
                    <li className="add">
                        <p onClick={this.onEdit}>添加数据</p>
                    </li>
                </ul>
                {
                    connectList.length > 0 ?
                        <svg className="svg" height={max * cellHeight + 100}>
                            <polyline points={`0,${index * cellHeight || 1} ${cellGap},${index * cellHeight || 1}`} />
                            {
                                connectList.map((item, i) => (
                                    <polyline points={`${cellGap},${item * cellHeight || 1} ${cellGap * 2},${item * cellHeight || 1}`} key={i} />
                                ))
                            }
                            <polyline points={`${cellGap},${min * cellHeight} ${cellGap},${max * cellHeight}`} />
                        </svg> : null
                }


                <ModelListItemNew visible={visible} onOk={this.onAddItem} onCancel={this.onCloseItem} list={prevItem}
                    wrappedComponentRef={(form) => this.form = form} elementsItem={elementsItem} id={id} />
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => ({
    addElement: (params) => dispatch(actionCreators.addElement(params)),
    getModelList: (id) => dispatch(actionCreators.getLocationDetailList(id)),
})

export default connect(null, mapDispatchToProps)(ModelList)