import  React, { /*useState,, useEffect*/} from 'react';
import { AddressFinder } from '../AddressFinder/AddressFinder';
import { TariffsTable } from '../TariffsTable/TariffsTable'
import { TableOfTariffs } from '../TariffsTable/TableOfTariffs'
import { RequestForm } from '../RequestForm/RequestForm';
import { SuccessModalWindow } from '../SuccessModalWindow/SuccessModalWindow';
import './InternetConnectionRequest.css'

export const InternetConnectionRequest = (props) => {
    return( 
        <div id='internetConnectionRequest'>
            <h1>Введите адрес и мы подберем вам подходящий тариф</h1>
            <AddressFinder 
                listOfAllAddresses={props.listOfAllAddresses}
                dataForRequest={props.dataForRequest}
                setDataForRequest={props.setDataForRequest} 
                houseInput={props.houseInput}
                setHouseInput={props.setHouseInput} 
                streetInput={props.streetInput}               
                setStreetInput={props.setStreetInput} 
                addressFinderCondition={props.addressFinderCondition}                
                setAddressFinderCondition={props.setAddressFinderCondition}                
                submitHandler={props.submitHandler}
            />
            {(props.dataForRequest.house.length !== 0) &&
                <TableOfTariffs
                    allTariffs={ () => {
                        return props.allTariffs.filter( element => {
                            return props.dataForRequest.house['Провайдер'].includes( element['Провайдер'] )
                        })
                    }}
                    dataForRequest={props.dataForRequest}
                    setDataForRequest={props.setDataForRequest}
                    showButton={true}                                 
                />
            }
            {(props.dataForRequest.tariff.length !== 0) &&
                <RequestForm
                    dataForRequest={props.dataForRequest} 
                    setDataForRequest={props.setDataForRequest}                    
                    requestSend={props.requestSend}
                />
            }
            {props.successModalShow &&
                <SuccessModalWindow 
                    setSuccessModalShow={props.setSuccessModalShow}
                />
            }
        </div>
    )
}