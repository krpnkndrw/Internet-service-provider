import  React from 'react'
import { Header } from '../../components/Header/Header'
import { Auth } from '../../components/Auth/Auth'
import './AuthPage.css'

export const AuthPage = (props) => {    
    return( 
        <div id='AuthPage'>
            <Header />                
            <Auth />             
        </div>
    )
}