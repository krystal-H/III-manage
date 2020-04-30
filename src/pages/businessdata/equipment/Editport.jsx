import React, { Component } from 'react';
import { Input, Button } from 'antd';
import './editport.less';

export class Editport extends Component {
    constructor(props){
        super(props);
        this.state = {
            portList:this.portInfoEdit()||[],
        };
    }
    
    portInfoEdit = () => {
        let { portInfo } = this.props;
        return portInfo.split(',').map((item,index)=>{
            return item.split('-')[1];
        });
    }

    dataBackfill = () => {
        this.setState({portList:this.portInfoEdit()});
    }

    componentDidMount() {
        this.props.onRef(this);
    }
    portInput = (index,val) => {
        let portList = this.state.portList;
        portList[index] = val.target.value;
        this.setState({portList});
    }
    render() {
        let { portNum } = this.props;
        let portList = this.state.portList;
        let portListHtml = [];
        for(let a=0; a<portNum; a++){
            portListHtml.push(
                <div className='port-box' key={a}>
                    <span className='title'>端口{a+1}:</span>
                    <Input value={portList[a]} className='input' onChange={this.portInput.bind(this,a)}/>
                </div>
            );
        }
        return (
            <div className="editport">
                {portListHtml.length>0?portListHtml:<p style={{textAlign:'center'}}>暂无数据</p>}
            </div>
        );
    }
}