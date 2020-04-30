import * as React from 'react';
import { Tree, Empty } from 'antd';
import { AuthTreeProps, AuthTreeState, ITreeNode } from './types';

const { TreeNode } = Tree;

// 生成节点
const generateTree = (treeNodes: ITreeNode[] = [], pre = "", searchValue = "") => {
    return treeNodes && treeNodes.map(({ children, ...props }: any) => {
        const lowerName = props.name.toLowerCase();
        const lowerSearch = searchValue.toLowerCase();
        const index = lowerName.indexOf(lowerSearch);
        const beforeStr = props.name.substr(0, index);
        const centerStr = props.name.substring(index, index+searchValue.length);
        const afterStr = props.name.substr(index + searchValue.length);
        const title =
        index > -1 ? (
          <span>
            {beforeStr}
            <span style={{ color: '#f50' }}>{centerStr}</span>
            {afterStr}
          </span>
        ) : (
          <span>{props.name}</span>
        );
        return (
            <TreeNode {...props} key={pre + props.id} title={title} >
                {generateTree(children, pre + props.id + '-', searchValue)}
            </TreeNode>
        )
    });
};

// 生成节点（去除未勾选部分）
const generateRoportTree = (treeNodes: ITreeNode[] = [], target: string[] = [], pre = "") => {
    return treeNodes && treeNodes.map(({ children, ...props }) => {
        if (target.includes(pre + props.id)) {
            return (
                <TreeNode {...props} disableCheckbox key={pre + props.id} title={props.name} >
                    {generateRoportTree(children, target, pre + props.id + '-')}
                </TreeNode>
            );
        }
        return null;
    }).filter(item => item);
};

// 递归遍历展开所有节点
function flatten(list: ITreeNode[] = [], pre = "", checkedkeys: string[]) {
    list && list.forEach((item: ITreeNode) => {
        if (item.children && item.children.length) {
            checkedkeys.push(pre + item.id);
        }

        flatten(item.children, pre + item.id + '-', checkedkeys);
    });
};

// 遍历生成所有添加所有节点的父节点
function spreadTarget(target: string[] = []) {
    const list: string[] = [];
    target.map(item => {
        let str = item.split('-');
        let a = "";
        str.map(element => {
            if (element) {
                a += element;
                list.push(a);
                a += '-';
            }
        });
    });
    return list;
} 

// 搜索节点


class AuthTree extends React.Component<AuthTreeProps, AuthTreeState>{
    constructor(props: AuthTreeProps) {
        super(props);
        this.state = {
            expandedKeys: [], // 展开节点
            selectedKeys: [], // 选中节点
        };
    }

    // 点击勾选节点
    handleCheck = (checkedKeys: string[], e: any) => {
        if (typeof this.props.onChange === "function") {
            this.props.onChange(checkedKeys, e);
        }
    }

    // 点击文案展开收缩节点
    handleSelect = (_: any, e: any) => {
        const { expandedKeys } = this.state;
        const { eventKey } = e.node.props;
        if (expandedKeys.includes(eventKey)) {
            this.setState({
                expandedKeys: expandedKeys.filter(item => item !== eventKey)
            });
        } else {
            this.setState({
                expandedKeys: [...expandedKeys, eventKey]
            });
        }
    }

    // 展开收缩节点
    handleExpand = (expandedKeys: string[]) => {
        this.setState({
            expandedKeys 
        });
    }

    componentDidMount() {
        const { isExpand, dataSource } = this.props;
        const expandedKeys: string[] = [];
        if (isExpand) {
            flatten(dataSource, '', expandedKeys);
        }
        this.setState({
            expandedKeys
        });
    }

    render() {
        const { dataSource, target, isCheck = true, checkStrictly = false, searchStr = "" } = this.props;
        const { expandedKeys, selectedKeys } = this.state;
        const checkedTarget = isCheck && !checkStrictly ? target : Array.from(new Set(spreadTarget(target)));

        return (
            !isCheck && !checkedTarget.length ? <Empty /> :
            <Tree
                blockNode
                checkable={isCheck}
                defaultExpandParent
                multiple
                showLine={!isCheck}
                checkStrictly={checkStrictly}
                selectedKeys={selectedKeys}
                checkedKeys={checkedTarget}
                expandedKeys={expandedKeys}
                onCheck={this.handleCheck}
                onSelect={this.handleSelect}
                onExpand={this.handleExpand}
            >
                {
                    isCheck ?
                        generateTree(dataSource, "", searchStr)
                        : generateRoportTree(dataSource, checkedTarget)
                }
            </Tree>
        );
    }
}

export default AuthTree;