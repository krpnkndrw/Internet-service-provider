import  React, { useState } from 'react'
import { TariffInfo } from '../../components/TariffInfo/TariffInfo'
import { TariffRequestForm } from '../../components/TariffRequestForm/TariffRequestForm'
import { Redirect } from 'react-router-dom'
import './AboutTariffPage.css'


export const AboutTariffPage = (props) => {
    const [addOptions, setAddOptions] = useState({
        router: '',
        tvRouter: ''
    })
    if(!props.dataForRequest.tariff){
        return <Redirect to="/"/>
    }
    return(
        <div id='AboutTariffPage'  className='page'>
            <div id='AboutTariffPageContent'>
                <TariffInfo 
                    dataForRequest={props.dataForRequest}
                    addOptions={addOptions}
                    setAddOptions={setAddOptions}
                />
                <div id='TariffRequestFormSidebar'>
                    <div>
                        <TariffRequestForm 
                            dataForRequest={props.dataForRequest}
                            setDataForRequest={props.setDataForRequest}
                            sendRequest={props.sendRequest}
                            addOptions={addOptions}
                        />
                    </div>
                </div>
            </div>
        </div>        
    )
}