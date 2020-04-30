import React, { Component, Fragment } from 'react';
import { Button,Card, Descriptions, Tree,message} from 'antd';
const { TreeNode } = Tree;
export class threeStep extends Component {
    constructor(props) {
        super(props);
        this.state = {
            autoExpandParent: true,
        };
    }

    next = () => {
        const {checkedKeys} = this.props
        if(checkedKeys.length > 0){
            this.props.next()
            return;
        }
        message.warning('配置API不能为空!')   
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
            expandedKeys,
            autoExpandParent: false,
        });
    };

    onCheck = (checkedKeys, info) => {
        this.props.apiOnCheck(checkedKeys, info);
    };

    onSelect = (selectedKeys, info) => {
        this.setState({ selectedKeys });
    };

    onExpand = expandedKeys => {
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.setState({
            autoExpandParent: false,
        });
        this.props.apiOnExpand(expandedKeys);
    };

    render() {
        const { apiTreeData,expandedKeys,checkedKeys,selectedKeys } = this.props
        return (
            <Fragment>
            <Descriptions title="" style={{ margin: "0 auto", maxWidth: 750 }} column={1}>
                    <Descriptions.Item label="* 已获取次可用API列表" ></Descriptions.Item>
                    <Card >
                        <Tree
                            checkable
                            onExpand={this.onExpand}
                            onCheck={this.onCheck}
                            onSelect={this.onSelect}
                            autoExpandParent={this.state.autoExpandParent}
                            checkedKeys={checkedKeys}
                            expandedKeys={expandedKeys}
                            selectedKeys={selectedKeys}
                        >
                            {this.renderTreeNodes(apiTreeData)}
                        </Tree>
                    </Card>
                    <Descriptions.Item label="备注" ><a>查看API说明帮助文档</a></Descriptions.Item>
            </Descriptions>
             <div style={{textAlign:"center"}}>
             <Button style={{ marginRight: 8, marginLeft: 8}} onClick={() => this.props.prev()}>上一步</Button>
             <Button type="primary" onClick={() => this.next()}>提交</Button>
            </div>  
            </Fragment>
        );
    }
}

export default threeStep;
