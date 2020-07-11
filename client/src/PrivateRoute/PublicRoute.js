import React, { useContext } from 'react'
import {Redirect, Route} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export const PublicRoute = ({ component: Component, to, ...rest }) => {
    const auth = useContext(AuthContext)
    return (
        <Route 
            {...rest}
            render = {props => {
                if(auth.isAuthenticated){
                    return <Redirect to={to}/>                    
                } else {
                    return <Component {...props} />
                }
            }}
       /> 
    )  
}