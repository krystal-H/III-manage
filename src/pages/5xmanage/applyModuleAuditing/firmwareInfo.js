import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Tabs, Radio} from 'antd';
const FormItem = Form.Item;
import './style.scss'
import axios from '../../../util/api.request';


function firmwareInfo({
    productId,
    closeFirmware
}){
    const [info, setInfo] = useState({})
    useEffect(() => {
        if(productId){
            axios.Post('manage-open/product/show/firmware/config',{productId},{},{ headers: {"Content-Type":"application/json"}}).then( ({data={}}) => {
                let res = data.data || {};
                setInfo({...res})
              });

        }
    }, [productId])
    const {productName,schemeType,moduleName,type,num,account,tel,address,mailType,expressNum} = info
    

    return (
        <Modal
            visible={!!productId}
            width={600}
            title="固件信息"
            onCancel={closeFirmware}
            onOk={closeFirmware}
            wrapClassName="apply-modul-auditing-firmware"
            afterClose={()=>{setInfo({})}}
        >
            9999999
        </Modal>
    )
}
export default firmwareInfo;