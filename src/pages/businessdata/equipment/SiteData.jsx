import React, { Component } from 'react';
import { Select, Divider } from 'antd';
import './siteData.less';

const {Option} = Select;

export class SiteData extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        };
    }
    componentDidMount() {
        this.props.onRef(this);
    }
    siteInfoList = (list) => {
        let { editState, deviceSiteId } = this.props;
        let idList = !editState?deviceSiteId&&deviceSiteId.split('-')||[]:'';
        return list.map((item,index)=>{
            let elementId = idList.length>0?idList[index]:"请选择";
            return (<div key={'标题'+index} className='site-box'>
                        <span className='title'>{item.summary&&item.summary.summary||''}:</span>
                        <Select className='select' defaultValue={elementId} >
                            {
                                item.elements.map((item_1,index_1)=>{
                                    return <Option key={'位置模型'+item_1.elementId} value={item_1.elementId} onClick={this.props.selectSite.bind(this,item_1.elementId,index)}>{item_1.elementName}</Option>;
                                })
                            }
                        </Select>
                    </div>);
        });
    }
    render() {
        let { siteList, siteInfoList, siteModelId } = this.props;
        let selectTops = siteModelId?siteModelId:"请选择";
        let siteInfoListHtml = this.siteInfoList(siteInfoList);
        return (
            <div className="siteData">
                <div className='site-box'>
                    <span className='title'>位置模型:</span>
                    <Select className='select' value={selectTops} onChange={this.props.getSite}>
                        {
                            siteList.map((item,index)=>{
                                return <Option key={'位置模型'+item.id} value={item.id}>{item.name}</Option>;
                            })
                        }
                    </Select>
                </div>
                <Divider />
                {siteInfoListHtml}
            </div>
        );
    }
}