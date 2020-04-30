import React, { Component, Fragment } from 'react';
import { Card, Descriptions, Tree, Button,message } from 'antd';
const { TreeNode } = Tree;

class secondStep extends Component {

    constructor(props) {
        super(props);
        this.state = {
            autoExpandParent: true,
        };
    }

    next = () => {
        const {checkedKeys} = this.props
        if(checkedKeys.length > 0){
            this.props.getGroupMenuList()
            return;
        }   
        message.warning('配置标签不能为空!')
    }

    renderTreeNodes = data => {
        return data.map(item => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode key={item.key} {...item} />;
        });
    }

    onExpand = expandedKeys => {
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.setState({
            autoExpandParent: false,
        });
        this.props.labelOnExpand(expandedKeys);
    };

    labelOnCheck = (checkedKeys, info) => {
        this.props.labelOnCheck(checkedKeys, info);
    };

    onSelect = (selectedKeys, info) => {
        this.setState({ selectedKeys });
        console.log(selectedKeys);
    };

    dataLabelAction = ()=>{
        this.props.dataLabelAction();
    }

    render() {
        const { labelTreeData,expandedKeys,checkedKeys,selectedKeys } = this.props
        return (
            <Fragment>
                <Descriptions title="" style={{ margin: "0 auto", maxWidth: 750 }} column={1}>
                    <Descriptions.Item label="* 已获取次账号下标签" ></Descriptions.Item>
                    <Card >
                        <Tree
                            checkable
                            onExpand={this.onExpand}
                            onCheck={this.labelOnCheck}
                            onSelect={this.onSelect}
                            autoExpandParent={this.state.autoExpandParent}
                            checkedKeys={checkedKeys}
                            expandedKeys={expandedKeys}
                            selectedKeys={selectedKeys}
                        >
                            {this.renderTreeNodes(labelTreeData)}
                        </Tree>
                    </Card>
                    <Descriptions.Item label="备注" >若无标签，则需要先给所属设备标注标签。<a href="javascript:" onClick={this.dataLabelAction}>标注标签入口</a>。</Descriptions.Item>
                </Descriptions>
                <div style={{textAlign:"center"}}>
                    <Button style={{ marginRight: 8, marginLeft: 8}} onClick={() => this.props.prev()}>上一步</Button>
                    <Button type="primary" onClick={() => this.next()}>下一步</Button>
                </div>  
            </Fragment>
        );
    }
}

export default secondStep;
