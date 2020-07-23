import  React, { useEffect, useState } from 'react';
import { AddressFinder } from '../../components/AddressFinder/AddressFinder';
import { Header } from '../../components/Header/Header';
import './AvailableTariffsPage.css'
import { TariffCards } from '../../components/TariffCards/TariffCards';

export const AvailableTariffsPage = (props) => {
    const [choosenTariffs, setChoosenTariffs] = useState([])
    useEffect( () => {
        if(props.allTariffs && props.dataForRequest && props.dataForRequest.house){
            setChoosenTariffs(
                props.allTariffs.filter( element => {
                    return props.dataForRequest.house['Провайдер'].includes( element['Провайдер'] )
                })
            )
        }
    }, [props.dataForRequest])
    return( 
        <div id='availableTariffsPage'>
            <Header />
            <h2>Подбор тарифа по адресу</h2>
            <AddressFinder
                listOfAllAddresses={props.listOfAllAddresses}
                houseInput={props.houseInput}
                setHouseInput={props.setHouseInput}
                streetInput={props.streetInput}
                setStreetInput={props.setStreetInput}
                addressFinderCondition={props.addressFinderCondition}
                setAddressFinderCondition={props.setAddressFinderCondition}
                submitHandler={props.submitHandler} 
                newClass={'minimize'}
            />
            {(choosenTariffs.length > 0)
                ?<h2>Тарифы доступные по вашему адресу</h2>
                :null
            }
            <TariffCards 
                allTariffs={choosenTariffs}
            />
        </div>
    )
}
/*
обновляет без анимации
*/