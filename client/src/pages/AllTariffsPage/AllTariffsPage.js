import  React/*, { useEffect, useState }*/ from 'react';
import './AllTariffsPage.css'
import { TableOfTariffs } from '../../components/TariffsTable/TableOfTariffs'

export const AllTariffsPage = (props) => {    
    return( 
        <div id='AllTariffsPage'  className='page'>
            <h2>Все тарифы</h2> 
            <TableOfTariffs 
                allTariffs ={props.allTariffs}
                setDataForRequest={props.setDataForRequest}
            />           
        </div>
    )
}

