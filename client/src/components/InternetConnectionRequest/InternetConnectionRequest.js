import  React, { useState,/*, useEffect*/} from 'react';
import { AddressFinder } from '../AddressFinder/AddressFinder';
import { TariffsTable } from '../TariffsTable/TariffsTable'
import { RequestForm } from '../RequestForm/RequestForm';
import { SuccessModalWindow } from '../SuccessModalWindow/SuccessModalWindow';
import './InternetConnectionRequest.css'

export const InternetConnectionRequest = (props) => {
    const [dataForRequest, setDataForRequest] = useState({
        house: '',
        tariff: '',
        phone: '',
        email: '',
        name: '',
        done: false
    })
    const [successModalShow, setSuccessModalShow] = useState(false)
    const [clearAddress, setClearAddress] = useState(false)
    
    
    const requestSend = async() => {
        setSuccessModalShow(true)
        setDataForRequest({
            house: '',
            tariff: '',
            phone: '',
            email: '',
            name: '',
            done: false
        })
        setClearAddress(true)
        /*if(Object.values(dataForRequest).includes('')){
            if(dataForRequest.house === ''){
                console.log('Введите адресс')
            }
            if(dataForRequest.tariff === ''){
                console.log('Выберите тариф')
            }
            if(dataForRequest.phone === ''){
                console.log('Введите номер')
            }
            if(dataForRequest.name === ''){
                console.log('Введите имя')
            }
            if(dataForRequest.email === ''){
                console.log('Введите почту')
            }
        } else {*/
            console.log(dataForRequest)
            const response = await fetch('/api/database/newinternetrequest', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataForRequest),
            })
            setDataForRequest({
                house: '',
                tariff: '',
                phone: '',
                email: '',
                name: '',
                done: false
            })
            //const body = await response.text();
            console.log(response);
        //}
    }

    return( 
        <div id='internetConnectionRequest'>
            <h1>Введите адрес и мы подберем вам подходящий тариф</h1>
            <AddressFinder 
                setDataForRequest={setDataForRequest} 
                dataForRequest={dataForRequest}
                clearAddress={clearAddress}
                setClearAddress={setClearAddress}
                listOfAddresses={props.listOfAddresses}
            />
            {(dataForRequest.house.length !== 0) &&
                <TariffsTable
                    listOfTariffs={props.listOfTariffs}
                    setDataForRequest={setDataForRequest} 
                    dataForRequest={dataForRequest}            
                />
            }
            {(dataForRequest.tariff.length !== 0) &&
                <RequestForm 
                    setDataForRequest={setDataForRequest} 
                    dataForRequest={dataForRequest}
                    requestSend={requestSend}
                />
            }
            {successModalShow &&
                <SuccessModalWindow 
                    setSuccessModalShow={setSuccessModalShow}
                />
            }
        </div>
    )
} 