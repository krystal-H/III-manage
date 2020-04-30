import React from 'react'
import { connect } from 'react-redux'
import { Input, Card, Button, notification,AutoComplete,Divider,Modal } from 'antd'
import { actionCreators } from './store'
import ModelData from './ModelData'
import TitleTab from '../../../components/TitleTab'
import axios from '../../../util/api.request'

const prefix = '/manage-open';

class PositionModelEdit extends React.Component {
    state = {
        modelName: "",
        modelDesc: "",

        editid:-1,//正在编辑的标签id
        editkey:'',
        editval:'',
        addkey:'',
        addval:'',
        delLabelId:'',//标记将要删除的标签id，为空时，关闭删除确认框
        deleteLoading:false,
        dellabelKey:'',
        dellabelValue:'',
        keylist:[],
        valuesource:[]
    }

    // 修改输入
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    // 保存基本数据
    handleSave = () => {
        const { modelName, modelDesc } = this.state;
        const { modelId } = this.props.match.params;
        if(!modelName){
            notification.error({
                message: "位置数据模型名称不能为空",
                duration: 3,
            })
            return ;
        }
        this.props.saveModelDetail({ modelName, modelDesc, modelId: parseInt(modelId) || '' }).then(code => {
            if (code === 0) {
                notification.success({
                    message: "保存数据成功",
                    duration: 3,
                })
                // 保存数据成功之后并不会返回该位置模型id，为了避免刷新之后获取不到数据，请求位置数据来获取modelId
                if (modelId == 0) {
                    this.props.getLocationList().then(res => {
                        if (res) {
                            const data = res.list ? res.list[0] : {};
                            const { modelId } = data;
                            if (modelId) {
                                this.props.history.replace(`/config/positionmodel/${modelId}`)
                            }
                        }
                    })
                }
            } 
        })
    }

    // 返回
    handleBack = () => {
        this.props.history.go(-1);
    }

    componentDidMount() {
        const { modelId } = this.props.match.params;
        const _this = this;
        this.props.resetModelList();
        this.getLabelKeyList();

        if (+modelId) {
            this.props.getModelDetail(modelId).then((params) => {
                if (!params) {
                    return;
                }
                const { modelName, modelDesc } = params;
                _this.setState({ modelName, modelDesc })
            });
            this.props.getModelList(modelId);
            this.props.getModLabelList(modelId);
            
        }
    }

    getLabeListHtml(){
        let list = this.props.modList || [],
            {editid,editkey,editval,valuesource} = this.state;

        let html = list.map((item,i) => {
            let {relaId,keyName,valueName} = item;
            if(relaId == editid){
                return  <tr key={'tr_'+i} >
                            <td>
                                <AutoComplete
                                    value={editkey}
                                    dataSource={this.getKeySource()}
                                    style={{ width: "80%" }}
                                    onChange={this.onChangeInput.bind(this,'editkey')}
                                    placeholder="Key"
                                    filterOption={true}
                                />
                            </td>
                            <td>
                                <AutoComplete
                                    value={editval}
                                    dataSource={valuesource}
                                    style={{ width: "80%" }}
                                    onChange={this.onChangeInput.bind(this,'editval')}
                                    // onFocus={this.getValueSource(editkey)}
                                    placeholder="Value"
                                    filterOption={true}
                                />
                            </td>
                            <td>
                                <a href="javascript:" onClick={this.editConfirm.bind(this,keyName,valueName)}>确认</a><Divider type="vertical" />
                                <a href="javascript:" onClick={this.editLabel.bind(this,-1,'','')}>取消</a>
                            </td>
                        </tr>;

            }else{
                return <tr key={'tr_'+i} >
                            <td>{keyName}</td><td>{valueName}</td>
                            <td>
                                <a href="javascript:" onClick={this.editLabel.bind(this,relaId,keyName,valueName)}>编辑</a>
                                <Divider type="vertical" />
                                <a href="javascript:" onClick={()=>this.openDelMod(relaId,keyName,valueName)}>删除</a>
                            </td>
                        </tr>;
            }
        });
        return html;
    }

openDelMod(id,key,val){
    let modelId = this.props.match.params.modelId;
    Modal.confirm({
        title: "是否删除该标签？",
        centered: true,
        onOk: () => {
            axios.Get(prefix+'/position/label/rela/delete',{relaId:id}).then((model) => {
                if(model.data.code==0){
                    
                    this.props.getModLabelList(modelId);
                }
            });
            
            
        }
    })
}

addConfirm(){
    let {addkey,addval} =this.state;
    if(addkey==''||addval==''){
        notification.warning({
            message: "请将正在添加的标签输入框补充完整",
            duration: 3
        });
        return false;
    }
    let modelId = this.props.match.params.modelId;
    axios.Get(prefix+'/position/label/rela/save',
        {
            modelId:modelId,
            keyName:addkey,
            valueName:addval,
        }
    ).then((model) => {
        if(model.data.code==0){
            this.setState({addkey:'',addval:''});
            this.props.getModLabelList(modelId);
            this.getLabelKeyList();
        }
    });
}

editLabel(id,key,val){
    this.setState({
        editid:id,
        editkey:key,
        editval:val
    });
}
editConfirm(key,val){//点击编辑并没修改又保存的时候 保存原key value
    let {editid,editkey,editval } =this.state;
    let modelId = this.props.match.params.modelId;
    if(editkey==''&&editval==''){
        notification.warning({
            message: "请将标签编辑输入框补充完整",
            duration: 3
        });
    }

    axios.Get(prefix+'/position/label/rela/save',
        {
            modelId:modelId,
            relaId:editid,
            keyName:editkey||key,
            valueName:editval||val,
        }
    ).then((model) => {
        if(model.data.code==0){
            this.setState({editid:-1,editkey:'',editval:''});
            this.props.getModLabelList(modelId);
            this.getLabelKeyList();
        }
    });

}



getDataSource(key){
    // let LabelBaseList = this.props.LabelBaseList,
    //     keysource = [],valuesource=[];
    // LabelBaseList.forEach(item => {
    //     keysource.push(item.labelTypeName||'无法识别的Key');
    //     if(key && key == item.labelTypeName){
    //         item.labelDatas.forEach(label=>{
    //             valuesource.push(label.labelName||'无法识别的Value');
    //         });
    //     }
    // })
    // if(key == undefined){ return keysource; }
    // return valuesource;

}
getKeySource(){
    let keynamelist = this.state.keylist.map((item,index)=>{
        return item.keyName
    });
    return keynamelist;
}

getLabelKeyList(){
    axios.Get(prefix+'/position/label/key/getList',{}).then((model) => {
        if(model.data.code==0){
            let keylist = model.data.data||[];
            this.setState({keylist});
        }
    });

}
getValueSource(keyname){
    let keyid = '-1';
    this.state.keylist.forEach(label=>{
       if(label.keyName == keyname){
        keyid = label.keyId;
       } 
    });
    console.log(keyid);
    if(keyid !== '-1' ){
        axios.Get(prefix+'/position/label/value/getList',{keyId:keyid}).then((model) => {
            if(model.data.code==0){
                let valuelist = model.data.data||[];
                let valuenamelist = valuelist.map((item,index)=>{
                    return item.valueName
                });
                this.setState({valuesource:valuenamelist});
            }
        });
    }else{
        this.setState({valuesource:[]});
    }


}


    onChangeInput(type,value){
        if(value&&value.length>20){
            return false;
        }
        let _state = {};
        _state[type] = value;
        this.setState(_state);

        if(type == "addkey" || type == "editkey"){
            this.getValueSource(value);

        }

    }

    render() {
        const { modelId } = this.props.match.params;
        const { modelName, modelDesc,addkey,addval,valuesource } = this.state;

        

        return (
            <div className="location-data">
                <TitleTab title={`${modelId !== '0' ? "管理" : "新建"}位置数据模型`} />
                <Card className="location-detail">
                    <div className="het-list">
                        <Button type="primary" className="btn-back" onClick={this.handleBack.bind(this)}>返回</Button>
                        <h2>基本信息</h2>
                        <div className="form-item">
                            <p className="label">
                                <span> <i className="dot">*</i>名称：</span>
                            </p>
                            <Input placeholder="请输入名称" value={modelName} maxLength={20} name="modelName" onChange={this.handleChange} />
                        </div>
                        <div className="form-item">
                            <p className="label">
                                <span>描述：</span>
                            </p>
                            <Input.TextArea placeholder="请输入名称" value={modelDesc} maxLength={100} name="modelDesc" onChange={this.handleChange} />
                        </div>
                        <div className="footer">
                            <Button type={"primary"} className="btn-save" onClick={this.handleSave}>保存</Button>
                        </div>
                    </div>
                    <div className="het-list">
                        <h2>数据模型</h2>
                        <ModelData modelId={modelId} />
                    </div>
                    { +modelId>0 && <div className="het-list">
                        <h2>标签管理</h2>
                        <table className="labeltable" >
                            <thead >
                                <tr><th style={{width:"38%"}}>标签Key</th><th style={{width:"38%"}}>标签Value</th><th style={{width:"24%"}}>管理</th></tr>
                            </thead>
                            <tbody>
                                { this.getLabeListHtml() }
                                <tr>
                                    <td>
                                        <AutoComplete
                                            value ={addkey}
                                            dataSource={this.getKeySource()}
                                            style={{ width: "80%" }}
                                            onChange={this.onChangeInput.bind(this,'addkey')}
                                            placeholder="Key"
                                            maxLength='20'
                                            filterOption={true}
                                        />
                                    </td>
                                    <td>
                                        <AutoComplete
                                            value={addval}
                                            dataSource={valuesource}
                                            style={{ width: "80%" }}
                                            onChange={this.onChangeInput.bind(this,'addval')}
                                            // onFocus={this.getValueSource(addkey)}
                                            placeholder="Value"
                                            maxLength='20'
                                            filterOption={true}
                                        />
                                    </td>
                                    <td>
                                        <a href="javascript:" onClick={this.addConfirm.bind(this)}>确认</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                       
                       

                    </div>}
                </Card>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    modelDetail: state.getIn(["positionModel", "modelDetail"]).toJS(),
    modList: state.getIn(["positionModel", "modList"]).toJS(),
})

const mapDispatchToProps = (dispatch) => ({
    getModelDetail: (id) => dispatch(actionCreators.getLocationDetail(id)),
    saveModelDetail: (params) => dispatch(actionCreators.saveLocationDetail(params)),
    getLocationList: () => dispatch(actionCreators.getLocationList()),
    getModelList: (id) => dispatch(actionCreators.getLocationDetailList(id)),
    resetModelList: () => dispatch(actionCreators.resetModelList()),
    getModLabelList:(modelId) => dispatch(actionCreators.getModLabelList(modelId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PositionModelEdit)