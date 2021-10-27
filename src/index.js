import React from 'react';
import { render } from 'react-dom';
import App from './pages/app';

import './index.scss';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
// if (process.env.NODE_ENV === 'development') {
//   require('../mock/index')
// }

const root = document.querySelector('#root');
function getParentNode (trigger) {
    if (trigger) {
        return trigger.parentNode
    }
    return document.body
}

render(<ConfigProvider locale={zhCN} 
    getPopupContainer={getParentNode}
    ><App /></ConfigProvider>,root)
