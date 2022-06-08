import React, { useEffect, useState, useRef, useContext, useMemo } from 'react';//首先引入hooks常用方法
import { connect } from 'react-redux';
import { getMenuList, getMenuList2 } from '../../../../apis/ruleSet'
import { Tree, Input } from 'antd';  //引入组件
import TreeCom from './treeCom'
import { Context } from "./index";
import { cloneDeep } from "lodash"
const { Search } = Input;
const { TreeNode } = Tree;
const myDemo = (props) => {
    const { state, dispatch } = useContext(Context);
    const [treeData, setTreeData] = useState([]) //tree数据  
    const [originData, setOriginData] = useState([]) //总tree数据 
    const treeData1 = useMemo(() => {
        let arr = [{
            title: '逻辑符',
            key: '1-0',
            children: [
                {
                    title: 'AND',
                    key: '2-and',
                },
                {
                    title: 'OR',
                    key: '2-or',
                }
            ]
        }]
        return arr
    }, [])
    const treeData2 = useMemo(() => {
        let arr = [{
            title: '设备',
            key: '1-0',
            children: [
                {
                    title: '设备动作',
                    key: '2-active',
                },
            ]
        }]
        return arr
    }, [])
    const [searchData, setsearchData] = useState('')  //搜索
    const searchValue = (val) => { //更新input值
        let originData2 = cloneDeep(originData)
        if (!val || !val.trim()) {
            setTreeData(originData2)
            return
        }
        let arr = []
        originData2.forEach(item => {
            if (item.children && item.children.length) {
                let parents = cloneDeep(item)
                parents.children = []
                item.children.forEach(item2 => {
                    if (item2.title.indexOf(val) > -1) {
                        parents.children.push(item2)
                    }
                })
                arr.push(parents)
            }
        })
        setTreeData(arr)
    }
    const getMenu = () => {
        getMenuList2().then(res => {
            if (res.data.code === 0) {
                let val = res.data.data.map((item, index) => {
                    let oneArr = {}
                    item.conditionOptions[0].conditions = item.conditionOptions[0].conditions || []
                    if (res.data.data.length === index + 1) {
                        item.conditionOptions[0].conditions = [{ conditionId: 1, conditionName: '设备触发', conditionTypeId: 1 }]
                        item.conditionOptions[0].conditionOptionId = 1
                    }
                    oneArr.children = item.conditionOptions[0].conditions
                    oneArr.key = '1-' + item.conditionTypeId
                    oneArr.title = item.conditionTypeName
                    item.conditionOptions[0].conditions.forEach(item3 => {
                        item3.key = '2-' + item3.conditionId + '-' + item.conditionOptions[0].conditionOptionId
                        item3.title = item3.conditionName,
                            item3.conditionOptionId = item.conditionOptions[0].conditionOptionId,
                            item3.conditionTypeName = item.conditionTypeName
                    })
                    return oneArr
                })
                setTreeData(val)
                setOriginData(val)
            }
        })
    }
    //获取数据
    useEffect(() => {
        getMenu()
    }, [])
    const renderTreeNodes = data =>
        data.map(item => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key} dataRef={item} >
                        {renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode key={item.key} {...item} className='active-tree' />;
        });
    return (
        <div className="rule-left">
            <div className='rule-title'>
                <Search
                    placeholder="请输入内容"
                    className="searchBox"
                    value={searchData}
                    onSearch={searchValue}
                    onChange={(e) => { setsearchData(e.target.value) }}
                    allowClear
                />
            </div>
            <div>
                <div>
                    <h1>触发条件</h1>
                    <TreeCom treeData={treeData} tabType={1} />
                </div>
                <div>
                    <h1>功能节点</h1>
                    <TreeCom treeData={treeData1} tabType={2} />
                </div>
                <div>
                    <h1>执行动作</h1>
                    <TreeCom treeData={treeData2} tabType={3} />
                </div>
            </div>
        </div>
    )

}

//暴露此组件
export default myDemo

