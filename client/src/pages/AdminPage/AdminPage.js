import  React from 'react'
import { Admin } from '../../components/Admin/Admin'
import './AdminPage.css'

export const AdminPage = (props) => {    
    return( 
        <div id='AdminPage' className='page'>
            <h2>Управление заявками</h2>
            <Admin />      
        </div>
    )
}

