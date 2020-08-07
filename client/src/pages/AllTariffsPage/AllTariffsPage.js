import  React, { useEffect, useState } from 'react';
import { Header } from '../../components/Header/Header';
import './AllTariffsPage.css'
import { TableOfTariffs } from '../../components/TariffsTable/TableOfTariffs'

export const AllTariffsPage = (props) => {    
    return( 
        <div id='AllTariffsPage'>
            <Header />
            <h2>Все тарифы</h2> 
            <TableOfTariffs 
                allTariffs ={props.allTariffs}
                setDataForRequest={props.setDataForRequest}
            />           
        </div>
    )
}

