import React, { useEffect, useState, useRef, useContext } from 'react';//首先引入hooks常用方法
import { connect } from 'react-redux';
import { Tree, Input, notification } from 'antd';  //引入组件
import { getfactor } from '../../../apis/ruleSet'
import { Context } from "./index";
import { isContinueSub } from './reduce'
const { TreeNode } = Tree;
const myDemo = ({ treeData = [], tabType }) => {
    const { state, dispatch } = useContext(Context);
    const [autoExpandParent, setAutoExpandParent] = useState(false)
    const [expandedKeys, setExpandedKeys] = useState([])
    const sentData = dataSource => {
        if (!state.pannelTab.length || state.currentRule <1) {
            notification.info({
                message: '提示',
                description:
                    '先选择规则',
            });
            return
        }
        // let arr = dataSource.key.split('-')
        dispatch({ type: "addNode", payload: { nodeType: tabType, nodeInfo: dataSource } })
        // if (tabType === 1) {
        //     dispatch({ type: "addNode", payload: { nodeType: tabType, nodeInfo: dataSource } })
        // } else if (tabType === 3) {
        //     dispatch({ type: "addNode", payload: { nodeType: tabType, nodeInfo: dataSource } })
        // } else if (tabType === 2) {
        //     dispatch({ type: "addNode", payload: { nodeType: tabType, nodeInfo: dataSource } })
        // }
    }
    const onExpand = expandedKeys => {  //展开/收起节点时触发
        setExpandedKeys(expandedKeys)
        setAutoExpandParent(false)
    };
    const renderTreeNodes = data =>
        data.map(item => {
            if (item.children) {
                return (
                    <TreeNode title={<span >{item.title}</span>} key={item.key} dataRef={item} >
                        {renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode key={item.key} {...item} title={<span onDoubleClick={() => { sentData(item) }}>{item.title}</span>}
                className={state.propsId == item.key.split('-')[1] ? 'active-tree' : ''} />;
        });
    return (
        <div className="rule-tree-item">
            <Tree
                showIcon
                autoExpandParent={autoExpandParent}
                onExpand={onExpand}
                expandedKeys={expandedKeys}
                blockNode={true}
            >
                {renderTreeNodes(treeData)}
            </Tree>
        </div>
    )

}

//暴露此组件
export default myDemo

