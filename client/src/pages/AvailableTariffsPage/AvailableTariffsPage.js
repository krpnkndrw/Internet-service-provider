import  React, { useEffect, useState } from 'react'
import { AddressFinder } from '../../components/AddressFinder/AddressFinder'
import './AvailableTariffsPage.css'
import { TariffCards } from '../../components/TariffCards/TariffCards'
import { EmptySpaceAnimation } from '../../components/EmptySpaceAnimation/EmptySpaceAnimation'

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
        <div id='availableTariffsPage' className='page'>
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
                :<EmptySpaceAnimation />
            }
            <TariffCards 
                allTariffs={choosenTariffs}
                dataForRequest={props.dataForRequest}
                setDataForRequest={props.setDataForRequest}
            />
        </div>
    )
}
/*
обновляет без анимации
*/