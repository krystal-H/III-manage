import React, { Component }  from 'react'
import { connect } from 'react-redux';

import {Icon} from 'antd'
import './loading.scss'

const TEXT = '数据加载中...';

const mapStateToProps = state => {
    return {
        loadingShow: state.getIn(['loadingShow', 'loadingShow'])
    }
}
const mapDispatchToProps = dispatch => {
    return {
        // getCatalogList: () => dispatch(getCatalogListAction()),
    }
}
@connect(mapStateToProps, mapDispatchToProps)
export default class Loading extends Component  {
    render() {
        let {loadingShow} = this.props;
        return (
            loadingShow ?
            <div className='loading_box'>
                <div className='img_box'>
                    <Icon className='img' type='loading'></Icon>
                    <span className='test'>{TEXT}</span>
                </div>
            </div> :
            null
        )
    }
}
