import React from 'react';
import { Form, Select, Input } from 'antd';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import AuthTree from '../../../components/AuthTree';
import { bindActionCreators, Dispatch } from 'redux';
import { IAuthItem, IAuthList, SearchTypes } from './store/types';
import { deepCopy } from '../../../util/utils';
import { debounce } from '../../../util/utils'

const FormItem = Form.Item;
const Option = Select.Option;

interface IProps {
    ref?: any
    getRoleAuth: typeof actionCreators.getRoleAuth
    setRoleAuthTarget: typeof actionCreators.setRoleAuthTarget
    searchAuth: Function
    onRef: any

    authTree: IAuthList[]
    authCheck: string[][]
    targetTree: IAuthList[]
    targetCheck: string[][]
    setAuthTreeCheck: typeof actionCreators.setAuthTreeCheck
    setTargetTreeCheck: typeof actionCreators.setTargetTreeCheck
    mergeToTargetTree: typeof actionCreators.mergeToTargetTree
    clearRoleData: typeof actionCreators.clearRoleData
}

interface IState {
    menu: string
    searchStr: string
    searchType: number
    menuCode: string
    menuIndex: number
}

// 格式化树
const formatTree = (authList: any) => {
    return authList && authList.map((item: IAuthItem) => {
        return {
            id: item.boxId,
            name: (item.boxName || item.groupName || "").split('#')[0],
            children: formatTree(item.subBoxs)
        };
    });
};

// 遍历查找条件
const findExpanded = (authList: any, expandedKeys: string[], filterName: string, pre: string) => {
    return authList && authList.map((item: IAuthItem) => {
        if ((item.boxName && item.boxName.indexOf(filterName) >= 0) || (item.groupName && item.groupName.indexOf(filterName) >= 0)) {
            expandedKeys.push(pre + item.boxId);
        }
        findExpanded(item.subBoxs, expandedKeys, filterName, pre + item.boxId + '-');
    });
};

// 遍历设置所有打钩节点checked为true
const createAuthTree = (res: IAuthItem[], target: string[]) => {
    return res && res.length && res.map((item: IAuthItem) => {
        item.checked = target.includes(item.boxId + '');
        createAuthTree(item.subBoxs, target);
    });
};

// 遍历整棵树，查找勾选项
function flatten(list: IAuthItem[] = [], pre = "", checkedkeys: string[]) {
    list && list.forEach((item: IAuthItem) => {
        // 过滤父节点，所有父节点状态由子节点控制
        if (item.checked && (!item.subBoxs || !item.subBoxs.length)) {
            checkedkeys.push(pre + item.boxId);
        }

        flatten(item.subBoxs, pre + item.boxId + '-', checkedkeys);
    });
};

// 求数组差集
function diff(arr1: string[], arr2: string[]){
    let res1 = arr1.filter((item:string) => !arr2.includes(item));
    let res2 = arr2.filter((item:string) => !arr1.includes(item));
    return [...res1, ...res2];
}

class AuthSetting extends React.Component<IProps, IState>{
    private refInput: Input;
    private refTree: AuthTree;

    constructor(props: IProps) {
        super(props);
        this.state = {
            menu: '',
            menuCode: '',
            menuIndex: 0,
            searchStr: "",
            searchType: SearchTypes.Product, // 默认为产品
        };
        this.props.onRef(this);
    }

    // 修改搜索数据维度
    changeMenu = (val: string) => {
        this.setState({
            menuCode: val,
            searchStr: ""
        }, () => {
            this.refInput.setState({ value: "", expandedKeys: [] });
        });
        if(val === "dataDimension"){
            this.setState({
                searchType: SearchTypes.Label
            })
        }else if(val === "dataObject"){
            this.setState({
                searchType: SearchTypes.Product
            })
        }
    }

    // 修改搜索条件
    changeKey = (e: any) => {
        const { value } = e.target;
        const { menuCode } = this.state;
        const { authTree } = this.props;
        const defaultCode = authTree && authTree.length ? menuCode || authTree[0].menuCode : '';
        const data = authTree.find(item => item.menuCode === defaultCode);
        const list = data ? data.checkBoxGroupList : [];

        this.setState({
            searchStr: value
        }, () => {
            if (value === "") {
                this.refTree.setState({
                    expandedKeys: [],
                    selectedKeys: [],
                });
                return;
            }
            const expandedKeys: string[] = [];
            findExpanded(list, expandedKeys, value, '');
            const mapExpandkeys: string[] = [];
            expandedKeys.map((inner: string) => {
                let temp = inner.split('-').slice(0, -1);
                let str = "";
                temp.forEach(i => {
                    str += i;
                    mapExpandkeys.push(str);
                    str += '-';
                });
            });
            const res = Array.from(new Set(mapExpandkeys));
            this.refTree.setState({
                expandedKeys: res,
                // selectedKeys: expandedKeys,
            });
        });
    }

    // 修改查询选项
    handleSearchType = (val: number) => {
        this.setState({
            searchType: val
        }, () => {
            this.refInput.setState({ value: "" });
        });
    }

    // 特殊查询
    handleSearch = debounce((val: string) => {
        const { searchType } = this.state;
        this.props.searchAuth({type: searchType, typeName: val}).then((res: number) => {
            this.changeKey({target: {value: val}})
        });
       
    }, 800)

    // 勾选节点
    handleChange = (value: any, e: any) => {
        const { authTree, authCheck } = this.props;
        const { menuCode } = this.state;
        const defaultCode = authTree && authTree.length ? menuCode || authTree[0].menuCode : '';
        const index = authTree.findIndex(item => item.menuCode === defaultCode);    
        const diffArr = diff(authCheck[index], value);
        this.props.setAuthTreeCheck([...authCheck.slice(0, index), value, ...authCheck.slice(index + 1)]);

        // 非特殊的查询直接设置        
        if(defaultCode !== "dataDimension" && defaultCode !== "dataObject"){
            this.props.setTargetTreeCheck([...authCheck.slice(0, index), value, ...authCheck.slice(index + 1)])
        }else{
            // 特殊查询需要合并节点, 所有节点添加到右侧，再过滤不需要的节点
            this.props.mergeToTargetTree(index, diffArr, e.checked);
        }
    }

    // 清除所有节点
    handleClear = () => {
        const { targetCheck, authTree, authCheck } = this.props;
        const { menuCode } = this.state;
        const defaultCode = authTree && authTree.length ? menuCode || authTree[0].menuCode : '';
        const index = authTree.findIndex(item => item.menuCode === defaultCode);    
        // this.props.setTargetTreeCheck([...targetCheck.slice(0, index), [], ...targetCheck.slice(index + 1)]);
        this.props.setAuthTreeCheck(authCheck.map(item => []));
        this.props.setTargetTreeCheck(targetCheck.map(item => []));
    }

    // 获取生成权限树
    handleSave = () => {
        const { targetTree, targetCheck } = this.props;
        const authCopy: any = deepCopy(targetTree);
        const target = targetCheck.reduce((x, y) => x.concat(y), []);
        let result: string[] = [];
        // 遍历添加所有节点的父节点
        target.map(item => {
            let arr = item.split('-').slice(1);
            result = result.concat(arr);
        });
        result = Array.from(new Set(result));
        // 遍历为所有勾选节点设置checked为true
        authCopy && authCopy.map((item: IAuthList) => {
            if (item.menuCode === "hideData") {
                return;
            }
            createAuthTree(item.checkBoxGroupList, result);
        });
        return authCopy.reduce((x: IAuthItem[], y: IAuthList) => x.concat(y.checkBoxGroupList), []);
    }

    componentWillUnmount(){
        this.props.clearRoleData();
    }

    render() {
        const {  targetTree, targetCheck, authTree, authCheck  } = this.props;
        const {  searchStr, searchType, menuCode } = this.state;
        const style={ width: 300 };
        const search = {
            "dataDimension": <Input className="auth-key" placeholder="输入关键字查找" maxLength={20} onChange={(e) => this.handleSearch(e.target.value)} ref={(refInput: Input) => this.refInput = refInput} style={style}/>,
            "dataObject": <Input.Group compact className="auth-key" style={style}>
                <Select style={{ width: 110 }} value={searchType} onChange={this.handleSearchType}>
                    <Option key="product" value={SearchTypes.Product}>产品</Option>
                    <Option key="app" value={SearchTypes.App}>APP应用</Option>
                    <Option key="appWeChat" value={SearchTypes.AppWeChat}>微信小程序</Option>
                </Select>
                <Input style={{ width: 190 }} placeholder="输入关键字查找"  maxLength={20} onChange={(e) => this.handleSearch(e.target.value)} ref={(refInput: Input) => this.refInput = refInput} />
            </Input.Group>
        };

        const defaultCode = authTree && authTree.length ? menuCode || authTree[0].menuCode : '';
        const index = authTree.findIndex(item => item.menuCode === defaultCode);    
        let authList = [], targetList = [];
        if(index >= 0){
            authList =  formatTree(authTree[index].checkBoxGroupList);
            targetList = formatTree(targetTree[index].checkBoxGroupList);
        }
        let newTargetTree = targetTree.map((item, index) => {
            return {
                id: item.menuCode,
                name: item.menuName,
                children: formatTree(item.checkBoxGroupList)
            }
        });
        let newTarget = targetCheck.map((item, index) => {
            return item.map(inner => targetTree[index].menuCode + '-' + inner)
        }).reduce((x, y) => x.concat(y), []);

        return (
            <FormItem label="权限配置">
                <div className="interface-role-search">
                    <Select className="auth-api" onChange={this.changeMenu} style={{ width: 180 }} value={defaultCode}>
                        {
                            authTree && authTree.length ? authTree.map((item) => (
                                <Option key={item.menuCode} value={item.menuCode}>{item.menuName}</Option>
                            )) : <Option key={''} value={''}>{''}</Option>
                        }
                    </Select>
                    {/* 搜索框 */}
                    {
                        ["dataDimension", "dataObject"].includes(defaultCode) ? 
                        search[defaultCode] 
                        : 
                        <Input className="auth-key" placeholder="输入关键字查找" maxLength={20} onChange={this.changeKey} ref={(refInput: Input) => this.refInput = refInput} style={style}/>
                    }
                </div>
                <div className="interface-role-auth">
                    <div className="tree-transfer">
                        <div className="tree-transfer-wraper">
                            <AuthTree dataSource={authList} target={authCheck[index]} onChange={this.handleChange}
                                ref={(refTree: AuthTree) => this.refTree = refTree} searchStr={searchStr} />
                        </div>
                        <h3 className="tree-transfer-tab">
                            <span >已选权限</span>
                            <span className="btn-clear" onClick={this.handleClear}>全部清除</span>
                        </h3>
                        <div className="tree-transfer-wraper">
                            <AuthTree dataSource={newTargetTree} target={newTarget} isCheck={false} isExpand={true} />
                        </div>
                    </div>
                </div>
            </FormItem>
        );
    }
}

const mapStateToProps = (state: any) => ({
    authTree: state.getIn(["interfaceRole", "authTree"]).toJS(),
    authCheck: state.getIn(["interfaceRole", "authCheck"]).toJS(),
    targetTree: state.getIn(["interfaceRole", "targetTree"]).toJS(),
    targetCheck: state.getIn(["interfaceRole", "targetCheck"]).toJS(),
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    getRoleAuth: actionCreators.getRoleAuth,
    setRoleAuthTarget: actionCreators.setRoleAuthTarget,
    searchAuth: actionCreators.searchAuth,

    setAuthTreeCheck: actionCreators.setAuthTreeCheck,
    setTargetTreeCheck: actionCreators.setTargetTreeCheck,
    mergeToTargetTree: actionCreators.mergeToTargetTree,
    clearRoleData: actionCreators.clearRoleData
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AuthSetting);