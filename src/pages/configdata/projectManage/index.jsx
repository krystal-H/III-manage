import React from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'
import ProjectList from './projectList'
import ProjectEdit from './projectEdit'
import './style.less'

const ProjectManage = ({match}) => {
    return (
        <Switch>
            <Route path={`${match.url}/list`} component={ProjectList}/>
            <Route path={`${match.url}/:projectId`} component={ProjectEdit} />
            <Redirect from={`${match.url}/`} to={`${match.url}/list`} />
        </Switch>
    )
}

export default ProjectManage