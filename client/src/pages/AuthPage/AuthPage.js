import  React from 'react'
import { Auth } from '../../components/Auth/Auth'
import './AuthPage.css'

export const AuthPage = (props) => {    
    return( 
        <div id='AuthPage' className='page'>             
            <Auth />             
        </div>
    )
}