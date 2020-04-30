import React, { useEffect } from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {Badge, Icon} from 'antd'
import {actionCreators} from '../../message/store'

const TopHeaderMsg = ({count, getMessageCount}) =>{
    useEffect(() => {
        getMessageCount();
    },[])

    return (
        <NavLink to="/message" style={{marginRight: 5}}>
            <span style={{ marginRight: 2, display: "inline-block" }}>
                <Badge count={count || 0}>
                    <Icon type="bell" className="icon" />
                </Badge>
            </span>
            <div style={{display: "inline-block", color: "white"}}>
                消息
            </div>
        </NavLink>
    )
}

const mapStateToProps = (state) => ({
    count: state.getIn(["message", "count"]),
})

const mapDispatchToProps = (dispatch) => ({
    getMessageCount: () => {
        dispatch(actionCreators.getMsgCount())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(TopHeaderMsg)