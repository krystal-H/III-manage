import React, { useEffect, useState, useRef } from 'react'
import { Input, Button, Select } from 'antd'
import { DateTool } from "../../../util/utils";

import axios from '../../../util/api.request';
import './style.scss'

const getList=(index)=>{
  if(index){
    this.setState({pageIndex:index})
  }
  let {searchName,searchType,pageIndex} = this.state;
  let param = {
      pageIndex:index||pageIndex,
      pageRows:10,
      productName:searchName,
      mode:searchType=="undefined"? undefined : searchType
  }
  axios.Post('manage-open/moduleApplyVerify/getModuleApplyListByPage',param,{},{loading:true, headers: {"Content-Type":"application/json"}}).then( ({data={}}) => {
    let res = data.data || {};
    let { list=[] , pager={} } = res
    this.setState({list,pager})
  });
    

}



let hostname = location.hostname ;
if( hostname =='localhost' ){
    hostname = 'dp.clife.net'
}

let ws = null, //保存websocket连接
    wsTimer = null; //websocket心跳连接定时器，页面销毁时，需要同时销毁定时器
// 如果存在连接的ws, 关闭，并置空（下次启动是新的连接） 
const closeWebsocket = ()=>{
    if(ws){
        ws.close();
        ws = null;
    }
    clearInterval(wsTimer);
}
const sendMsg = (message="")=>{
    let m = {type:1,message}
    return JSON.stringify(m)
}
const defaultMsg = {message:'欢迎联系C-life客服，请问有什么可以帮您的吗？',senderName:'客服',time:''}


export default ()=>{
  useEffect(() => {

   
}, [])
const connectRef = useRef(false);//记录连接成功
const [inputValue, setInputValue] = useState("")
const [content, setContent] = useState([defaultMsg])

//建立 ws 连接
const newWebSocket = ()=> {
    ws = new WebSocket(`wss://${hostname}/v5x/web/open/tech/support/ws`);
    ws.onopen = ()=> {//连接成功
        console.log("---连接成功----")
        connectRef.current = true;
        clearInterval(wsTimer);
        wsTimer = setInterval(()=>{ ws.send(sendMsg()) }, 10000); //告诉服务器“请保持联系”
    };
    ws.onmessage =  ({data="{}"})=> {//接收到消息
        let onemsg = JSON.parse(data)

        setContent(pre=>[...pre,onemsg])
        
    };
    ws.onclose = (e) =>{//检测到断开连接
        console.log("---断开连接----")
        clearInterval(wsTimer);
        ws = null;
        if ( connectRef.current && e.code == '1006') {//如果异常断开，尝试重连
            setTimeout(newWebSocket,5000);
        }
        connectRef.current = false;
        
    }
}

const switchOpen=()=>{
    let newShow = !showMod;
    store.dispatch(showCustomerService(newShow));
    if(newShow && !ws){//开启连接
        newWebSocket();
    }else{//关闭连接
        closeWebsocket()

    }
}
const sendHandle = ()=>{
    if(inputValue){
        if(ws){
            ws.send(sendMsg(inputValue))
            setInputValue("")
        }else{
            Notification({
                // type: 'warn',
                description: '连线中......'
            })
        }
    }  
}
const changeInput = (e)=>{
    setInputValue(e.target.value)
}


return <div className='comm-contont-cardw'>
    <div className='customer-service-box'>
      <div className='customer'>
        <div className='list'>
          <div className='a'>客户1</div>
          <div className='a'>客户3</div>
          <div className='a'>客户4</div>
        </div>
      </div>
      <div className="customer-service" >
        <div className='tit'>客服<span className="close" onClick={switchOpen}> </span></div>
        <div className='content'>
            {
                content.map(({message,senderName,time},index)=>{
                    return <div className={`onechat ${senderName=='客服'?'left':'right'}`}  key={index+'_'+time} >
                                <span className='bubble'>{message}</span>
                            </div>

                })
            }
        </div>
        <div className='inputbox'>                                                                                                                                                                                             
            <span className='imgbtn'></span>
            <span className='sendbtn' onClick={sendHandle}>发送</span>
            <Input.TextArea className='textarea' placeholder="请输入..." maxLength={200}
                value={inputValue}
                onChange={changeInput}
            />
        </div>
      </div>
    </div> 
  </div>  

}