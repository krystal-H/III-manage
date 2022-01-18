import React, { useState, useEffect, useContext } from 'react';
import { Button, notification, Tabs } from 'antd';
import HomeCom from './rightHome'
import PropCom from './rightProp'
import { Context } from "./index";
const { TabPane } = Tabs;
export default function RightCom() {
    const { state, dispatch } = useContext(Context);
    const changeTab = val => {
        if (state.showTab === val) {
            return
        }
        // if (!Object.keys(state.wholeInfo).length) {
        //     notification.info({
        //         message: '提示',
        //         description:
        //             '先完善全局信息',
        //     });
        //     return
        // }
        if (!state.pannelTab.length) {
            notification.info({
                message: '提示',
                description:
                    '先添加规则',
            });
            return
        }
        dispatch({ type: 'changeTab', payload: val })
    }
    const titleDom = () => {
        return <div className='rule-title rule-title-right' >
            <div className={state.showTab === '1' ? 'active-tab' : ''} onClick={() => { changeTab('1') }}>全局属性</div>
            <div className={state.showTab === '2' ? 'active-tab' : ''} onClick={() => { changeTab('2') }}>属性</div>
        </div>
    }
    return (
        <div className='rule-right'>
            {/* <div className='rule-title rule-title-right' >
                <div className={state.showTab === 1 ? 'active-tab' : ''} onClick={() => { changeTab(1) }}>全局属性</div>
                <div className={state.showTab === 2 ? 'active-tab' : ''} onClick={() => { changeTab(2) }}>属性</div>
            </div> */}
            {/* <div className='content'>
                {

                    <div style={{ display: state.showTab === 1 ? 'block' : 'none' }}>
                        <HomeCom />
                    </div>
                }
                {
                    <div style={{ display: state.showTab === 2 ? 'block' : 'none' }}><PropCom /></div>
                }
            </div> */}
            <Tabs  renderTabBar={titleDom} activeKey={state.showTab}>
                <TabPane tab="Tab 1" key='1'>
                    <div className='content'>
                        <HomeCom />
                    </div>
                </TabPane>
                <TabPane tab="Tab 2" key='2'>
                    <div className='content'>
                        <PropCom />
                    </div>
                </TabPane>
            </Tabs>
        </div >
    );
}