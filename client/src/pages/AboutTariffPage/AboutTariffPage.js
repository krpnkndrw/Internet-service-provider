import  React from 'react'
import { Header } from '../../components/Header/Header'
import { TariffInfo } from '../../components/TariffInfo/TariffInfo'
import { TariffRequestForm } from '../../components/TariffRequestForm/TariffRequestForm'
import { Redirect } from 'react-router-dom'
import './AboutTariffPage.css'


export const AboutTariffPage = (props) => {
    if(!props.dataForRequest.tariff){
        return <Redirect to="/"/>
    }
    return(
        <div id='AboutTariffPage'>
            <Header />
            <div id='AboutTariffPageContent'>
                <TariffInfo 
                    dataForRequest={props.dataForRequest}
                />
                <div id='TariffRequestFormSidebar'>
                    <div>
                        <TariffRequestForm 
                            dataForRequest={props.dataForRequest}
                            setDataForRequest={props.setDataForRequest}
                            sendRequest={props.sendRequest}
                        />
                    </div>
                </div>
            </div>
        </div>        
    )
}