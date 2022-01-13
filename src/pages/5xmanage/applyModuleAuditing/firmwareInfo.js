import React, { useState, useEffect } from 'react';
import { Modal, Form} from 'antd';
const FormItem = Form.Item;
import './style.scss'
import axios from '../../../util/api.request';


function firmwareInfo({
    productId,
    closeFirmware
}){
    const [info, setInfo] = useState([])
    useEffect(() => {
        if(productId){
            axios.Post('manage-open/product/show/firmware/config',{productId},{ headers: {"Content-Type":"application/json"}}).then( ({data={}}) => {
                let res = data.data || {};
                setInfo(res.firmwareModuleList || [])
              });
        }
    }, [productId])
    

    return (
        <Modal
            visible={!!productId}
            width={600}
            title="固件信息"
            onCancel={closeFirmware}
            onOk={closeFirmware}
            afterClose={()=>{setInfo([])}}
        >
           <Form
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 10 }}>
                {
                  
                  info.map((item,i) => (
                    item.firmwareFuncList && item.firmwareFuncList.map((ele, index) => (
                      <div key={i+'_'+index}>
                        {
                          ele.dataType.type === 'int' &&
                          <FormItem key={ele.funcName +i + "int"+index} label={ele.funcName} >{ele.dataType.specs.defaultValue}</FormItem>
                        }
                        {
                          ele.dataType.type === 'enum' &&
                          <FormItem key={ele.funcName+i + "enum" +index} label={ele.funcName}>{ele.dataType.specs.defaultValue[0].k}</FormItem>
                        }
                      </div>
                    ))
                  ))
                }
            </Form>
        </Modal>
    )
}
export default firmwareInfo;