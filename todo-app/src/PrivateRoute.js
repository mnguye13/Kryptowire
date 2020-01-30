import React from "react";
import {Route, Redirect} from "react-router-dom";
import { useSelector } from 'react-redux';
function PrivateRoute({component: Component, path, ...rest}){
    const isAuthenticated = useSelector(state => state.isAuthenticate)
    return(
        <Route path ={path} {...rest} render = {(props)=> isAuthenticated? (
            <Component {...props} />
        ): (
        <Redirect to = {{pathname:"/users", state:{
            prevLocation: path,
            error: "You need to login first!",
        }}}/>
        )
    }/>
    );
}

export default PrivateRoute;