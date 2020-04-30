import React from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'
import {Home} from '../pages/home/Home'

let isAuthenticated = true
function PrivateRoute({ component: Component, ...rest }) {
  // console.log("PrivateRoute rest" + rest);
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} routes={rest.routes}/>
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

/**
 *  RouteWithSubRoutes 会通过递归的方式调用路由配置表，一级一级的自动添加，
 * @param {*} route 
 */
function RouteWithSubRoutes(route) {
  // console.log("addroute"+JSON.stringify(route));
  if (route.component == null && route.routes) {
    let childrenRoute = route.routes;
    // console.log("addroute1"+JSON.stringify(route));
    let subRoute = childrenRoute.map((item, i) => (
      <RouteWithSubRoutes key={i} {...item} />
    ));
    let redirectItem = null;
    if(route.redirect){
      redirectItem = <Redirect to={route.redirect} from={route.path}></Redirect>
    }
    return (
      <Switch>
        {subRoute}
        {redirectItem}
      </Switch> );
  } else {
    return <PrivateRoute  
            component={route.component}
            routes={route.routes}
            path={route.path} 
            {...route}
          />

  }
} 

export {PrivateRoute, RouteWithSubRoutes}
