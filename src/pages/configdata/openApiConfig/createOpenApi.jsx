import React, { Component, Fragment } from 'react';
import { Steps, message, Card,Tree, Select} from 'antd';
import './openApiDetail.less';
import { GetUserInfoRequest,GetLabelAndOpenapiRequest, SaveOpenApiRequest } from '../../../apis/openApiList';
import './createOpenApi.less';
import FirstStep from './firstStep';
import SecondStep from './secondStep';
import ThreeStep from './threeStep';
import { connect } from 'react-redux';
const { Step } = Steps;
const { Meta } = Card;
const { TreeNode } = Tree;
const { Option } = Select;

class createOpenApi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            data: [],
            value: undefined,

            labelCheckedKeys: [],
            labelSelectedKeys: [],
            labelExpandedKeys: [],
            labelTreeData: [],

            apiCheckedKeys: [],
            apiSelectedKeys: [],
            apiExpandedKeys: [],
            apiTreeData: [],
            isExpand: false,

            labelArr: [],
            apiArr: [],
            labelTypeIdArr:[]
        };
    }

    // 主页面切换步骤
    next = () => {
        const { current } = this.state;
        this.setState({ current: current + 1 });
    };

    prev = () => {
        const { current } = this.state;
        this.setState({ current: current - 1 });
    };

    // 确认身份
    handleSearch = value => {
        if (value) {
            GetUserInfoRequest({ userName: value }).then(res => {
                let code = res.data.code
                if (code === 0) {
                    this.setState(() => ({
                        data: res.data.data
                    }))
                }
            })
        } else {
            this.setState({ data: [] });
        }
    };

    handleChange = value => {
        this.setState({ value });
    };

    // 配置标签范围
    onExpand = expandedKeys => {
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    };

    getLabelList = (params) => {
        GetLabelAndOpenapiRequest(params).then(res => {
            let code = res.data.code
            if (code === 0) {
                console.log("获得该账号下所有设备的标签数据：", res.data.data);
                let labelTreeData = res.data.data.labelList;
                let apiTreeData =  res.data.data.openapiList;
                this.setState(() => ({
                    labelTreeData: this.makeLabelTreeData(labelTreeData),
                    apiTreeData: this.makeApiTreeData(apiTreeData)
                }))
                this.next();
            }
        })
    }

    makeLabelTreeData = (data) => {
        let treeData = [];
        data.map((item, index) => {
            treeData.push(
                {
                    title: item.labelTypeName,
                    key: `label-${item.labelTypeId}`,
                    children: this.makeChildrenLabel(item.labelDatas, index)
                }
            )
        })
        return treeData;
    }

    makeChildrenLabel = (data, outIndex) => {
        let children = [];
        data.map((item, index) => {
            children.push(
                {
                    title: item.labelName,
                    // key: `${outIndex}-${index}`,
                    key: item.labelId,
                }
            )
        })
        return children;
    }

    labelOnCheck = (checkedKeys, info) => {
        console.log('labelOnCheck', checkedKeys, info);
        var labelArr = checkedKeys.filter(item => item.startsWith('label') == false);
        var tempArr = checkedKeys.filter(item => item.startsWith('label') == true);
        console.log(labelArr);
        var labelTypeIdArr = this.getLabelTypeIdArr(tempArr);
        console.log(labelTypeIdArr);
        this.setState({ labelCheckedKeys:checkedKeys, labelArr,labelTypeIdArr});
    };

    getLabelTypeIdArr =(array)=>{
        let newArr = [];
        array.map((item, index) => {
            var str = item.substring(6);
            newArr.push(str);
        })
        return newArr;
    }

    labelOnSelect = (selectedKeys, info) => {
        this.setState({ labelSelectedKeys:selectedKeys });
    };

    labelOnExpand = expandedKeys => {
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.setState({
            labelExpandedKeys:expandedKeys,
            autoExpandParent: false,
        });
    };

     // 配置api范围
    apiOnCheck = (checkedKeys, info) => {
        console.log('apiOnCheck', checkedKeys, info);
        // var apiArr = checkedKeys.filter(item => item.startsWith('api') == false)
        // console.log(apiArr);
        this.setState({ apiCheckedKeys:checkedKeys, apiArr: checkedKeys});
    };

    apiOnSelect = (selectedKeys, info) => {
        this.setState({ apiOnSelect:selectedKeys });
    };

    apiOnExpand = expandedKeys => {
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.setState({
            apiExpandedKeys:expandedKeys,
            autoExpandParent: false,
        });
    };

    getGroupMenuList = () => {
        // GetGroupMenuListRequest().then(res => {
        //     let code = res.data.code
        //     if (code === 0) {
        //         // console.log("获得该账号下所有设备的标签数据：", res.data.data);
        //         this.setState(() => ({
        //             apiTreeData: this.makeApiTreeData(res.data.data)
        //         }))
        //         this.next();
        //     }
        // })
        this.next();
    }

    makeApiTreeData = (data) => {
        let treeData = [];
        data.map((item, index) => {
            treeData.push(
                {
                    title: item.resourceName,
                    // key: `api-${ item.resourceId}`,
                    key: `${item.resourceId}`,
                    children: this.makeChildrenApi(item.resourceInfoBusinessOutDtos, index)
                }
            )
        })
        return treeData;
    }

    makeChildrenApi = (data, outIndex) => {
        let children = [];
        data.map((item, index) => {
            children.push(
                {
                    title: item.resourceName,
                    // key: `${outIndex}-${index}`,
                    key: item.resourceId,
                }
            )
        })
        return children;
    }

    compare = (prop) => {
        return (a, b) => {
            return a[prop] > b[prop] ? 1 : -1
        }
    }

    SaveOpenApi = () => {
        const { value, data, labelArr, apiArr,labelTypeIdArr } = this.state;
        var selectArr = data.filter(item => item.userId == parseInt(value));
        let selectAccount = selectArr[0];
        let params = {
            labelIdList: labelArr.join(","),
            openapiIdList: apiArr.join(","),
            userId: value,
            userName: selectAccount.userName,
            labelTypeIdList:labelTypeIdArr.join(",")
        }
        SaveOpenApiRequest(params).then(res => {
            let code = res.data.code
            if (code === 0) {
                message.success('Processing complete!',1,()=>this.props.history.go(-1))  
            }
        })
    }

    dataLabelAction = ()=>{
        this.props.history.push(`/businessdata/dataLabel`);
      }

    render() {
        const { current, value, isExpand, data, labelCheckedKeys, labelExpandedKeys, labelSelectedKeys,
            apiCheckedKeys,apiSelectedKeys,apiExpandedKeys,labelTreeData,apiTreeData } = this.state;
        const steps = [
            {
                title: '确认身份',
                content:
                    <FirstStep data={data} isExpand={isExpand} value={value} getLabelList={this.getLabelList} 
                    handleSearch={this.handleSearch} handleChange={this.handleChange}></FirstStep>
            },
            {
                title: '配置标签范围',
                content:
                    <SecondStep prev={this.prev} dataLabelAction={this.dataLabelAction} checkedKeys={labelCheckedKeys}  expandedKeys={labelExpandedKeys} selectedKeys={labelSelectedKeys}
                     labelTreeData={labelTreeData} labelOnExpand={this.labelOnExpand} labelOnCheck={this.labelOnCheck} getGroupMenuList={this.getGroupMenuList}></SecondStep>
            },
            {
                title: '配置API范围',
                content:
                <ThreeStep prev={this.prev} next={this.SaveOpenApi} checkedKeys={apiCheckedKeys} selectedKeys={apiSelectedKeys} expandedKeys={apiExpandedKeys}
               apiTreeData={apiTreeData} apiOnExpand={this.apiOnExpand} apiOnCheck={this.apiOnCheck} ></ThreeStep>
            },
        ];
        return (
            <Fragment>
                <Card >
                    <Meta title="新增OpenAPI配置" description="" />
                </Card>

                <Card style={{ marginTop: 10 }}>
                    <div className="createOpenApi">
                        <Steps current={current} className="createOpenApiStep">
                            {steps.map(item => (
                                <Step key={item.title} title={item.title} />
                            ))}
                        </Steps>
                        <div className="steps-content" >{steps[current].content}</div>
                    </div>
                </Card>
            </Fragment>
        );
    }
}
export default createOpenApi;

