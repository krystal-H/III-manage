import React from 'react';
import { Tabs } from 'antd';
import AuthTree from '../../../components/AuthTree';

const TabPane = Tabs.TabPane;

const RoleAuth = ({dataSource, target}) => {
    return (
        <div className="account-auth">
            <h3>权限设置：</h3>
            <div className="account-auth-wrapper">
                <Tabs>
                    {
                        dataSource.map((item, index) => (
                            <TabPane tab={item.name} key={item.id}>
                                <AuthTree dataSource={[item]} target={target[index]} isCheck={false} isExpand={true}/>
                            </TabPane>
                        ))
                    }
                </Tabs>
            </div>
        </div>
    );
};

export default RoleAuth;