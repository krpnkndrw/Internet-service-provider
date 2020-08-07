import  React from 'react'
import { Header } from '../../components/Header/Header'
import { Admin } from '../../components/Admin/Admin'
import './AdminPage.css'

export const AdminPage = (props) => {    
    return( 
        <div id='AdminPage'>
            <Header /> 
            <Admin />      
        </div>
    )
}

