import React, { useEffect, useState, useRef } from 'react'
import { Input, notification, Select } from 'antd'
import { DateTool } from "../../../util/utils";
import {axiosNobaseurl} from '../../../util/api.request';
import './style.scss'
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
const sendMsg = (message='',receiverId='')=>{
    let m = {type:1,message,receiverId}
    return JSON.stringify(m)
}
const pagerows = 6;


export default ()=>{
    const connectRef = useRef(false);//记录连接成功
    const containerRef = useRef();//聊天信息容器
    
    const pageRef = useRef(1);//记录历史聊天下一页将是第几页,当值设为-1时代表 没有更多的历史信息了
    const [inputValue, setInputValue] = useState("")
    const [content, setContent] = useState({data:[],isscroll:false});//isscroll 区分是否滚动的方式加载出数据，决定回显数据后滚动条位置
    const [customerLi, setCustomerLi] = useState([])
    const [receiverId, setReceiverId] = useState(undefined) //当前窗口的客户id
    const [senderNam, setSenderNam] = useState(undefined) //当前窗口的客户nam

    const {data,isscroll} = content;
    
    useEffect(() => {
        getCustomerList()
        return closeWebsocket //组件卸载时关闭ws
    }, [])
    useEffect(() => {
        if(receiverId){
            pageRef.current = 1;
            getHistoryChat()
        }
    }, [receiverId])

    //聊天内容变化处理滚动条：非滚动加载的内容 滚动到最底端；滚动加载完成向下滚动300px的内容
    useEffect(() => {
        if(data.length>0){
            let scrolltop = containerRef.current.scrollHeight;
            if(isscroll){
                scrolltop = 300;
            }
            containerRef.current.scrollTop = scrolltop;
        }
    }, [data,isscroll])

    
    //客户列表
    const getCustomerList=(index)=>{
        axiosNobaseurl.Post('/v5x/web/manage/support/getCustomers',{},{},{loading:true, headers: {"Content-Type":"application/json"}}).then( ({data={}}) => {
            let res = data.data || [];
            setCustomerLi(res)
        });
    }
    //单个客户的一页历史消息
    const getHistoryChat= ()=>{
        axiosNobaseurl.Post('/v5x/web/manage/support/getHistory',{
            receiverId,
            pageIndex: pageRef.current,
            pageRows:pagerows
        },{},{ headers: {"Content-Type":"application/json"}}).then( ({data={}}) => {
            let list = data.data && data.data.list || [], 
                len = list.length,
                isscroll = pageRef.current>1;
            if(len<pagerows){
                pageRef.current = -1
                if(len==0){
                    return;
                }
            }else{
                pageRef.current += 1;
            }
            setContent( ({data}) => ({data:[ ...list.reverse(), ...data ],isscroll}))
        });
    }

    //建立 ws 连接
    const newWebSocket = ()=> {
        ws = new WebSocket(`wss://${hostname}/v5x/web/manage/tech/support/ws`);
        ws.onopen = ()=> {//连接成功
            console.log("---连接成功----")
            connectRef.current = true;
            clearInterval(wsTimer);
            wsTimer = setInterval(()=>{ ws.send(sendMsg()) }, 10000); //告诉服务器“请保持联系”
        };
        ws.onmessage =  ({data="{}"})=> {//接收到消息
            let onemsg = JSON.parse(data)
            setContent( ({data}) => ({data:[ ...data, onemsg ],isscroll:false}))
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

    const sendHandle = ()=>{
        if(inputValue && /[\S]/.test(inputValue)){
            if(ws){
                ws.send(sendMsg(inputValue,receiverId))
                setInputValue("")
            }else{
                notification.info({
                    description: '连线中......'
                })
            }
        }  
    }
    const changeInput = (e)=>{
        setInputValue(e.target.value.replace(/[\r\n]/g, ""))
    }

    //选择客户
    const selectCustomer = (id,nam)=>{
        if(!ws){
            newWebSocket()
        }
        setReceiverId(id);
        setSenderNam(nam);
    }

    //滚动加载历史消息
    const scrolHandle = ()=>{
        if(containerRef.current.scrollTop==0 && pageRef.current>0){
            getHistoryChat()
        }
    }


    return <div className='comm-contont-cardw'>
        <div className='customer-service-box'>
        <div className='customer'>
            <div className='list'>
                {
                    customerLi.map(({senderName,senderId})=>{
                        return <div className={`a${receiverId==senderId?' cur':''}`}
                            key={senderId} 
                            onClick={()=>{selectCustomer(senderId,senderName)}}
                         >
                            <span> {senderName}</span>
                        </div>

                    })
                }
            </div>
        </div>
        {
            receiverId && <div className="customer-service" >
            <div className='tit'>{senderNam}</div>
            <div className='content' ref={containerRef} onScrollCapture={scrolHandle}>
                {
                    data.map(({message,senderName,time},index)=>{
                        return <div className={`onechat ${senderName=='客服'?'right':'left'}`}  key={index+'_'+time} >
                                    <span className='bubble'>{message}</span>
                                    <span className='time'>{DateTool.formateDate(time,'MM-dd hh:mm:ss',8)}</span>
                                </div>
    
                    })
                }
            </div>
            <div className='inputbox'>                                                                                                                                                                                             
                <span className='imgbtn'></span>
                <span className='sendbtn' onClick={sendHandle}>发送</span>
                <Input.TextArea className='textarea' placeholder="输入回复 ......" maxLength={200}
                    value={inputValue}
                    onChange={changeInput}
                    onPressEnter={sendHandle}
                />
            </div>
            </div> || <div className='nosender'><div>喝杯茶吧，让精神抖擞起来。</div></div>
        }
        
        </div> 
    </div>  

}
