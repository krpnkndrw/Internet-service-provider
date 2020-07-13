import React, { useState, useEffect } from 'react'
import {/*BrowserRouter as Router,*/ Switch, Route/*, Redirect*/} from 'react-router-dom'
import './Main.css'
import { InternetConnectionRequest } from '../InternetConnectionRequest/InternetConnectionRequest'
//import { AllTariffs } from '../AllTariffs/AllTariffs'
import { AuthPage } from '../AuthPage/AuthPage'
import { Admin } from '../Admin/Admin'
//import { AuthContext } from '../../context/AuthContext'
import { PrivateRoute } from '../../PrivateRoute/PrivateRoute'
import { PublicRoute } from '../../PrivateRoute/PublicRoute'
//import { TariffsTable } from '../TariffsTable/TariffsTable'
import { TableOfTariffs } from '../TariffsTable/TableOfTariffs'

 
export const Main = () => {
    //const auth = useContext(AuthContext)
    const [listOfAllAddresses, setListOfAllAddresses] = useState([])
    const [allTariffs, setAllTariffs] = useState([])

    useEffect( () => {
        const loadListOfAllAddreses = async() => {
            const response = await fetch('/api/database/listOfAllAddresses', {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json'
                },
            });
            const [listOfAllAddresses] = await response.json()          
            setListOfAllAddresses(listOfAllAddresses.list)
        }
        const loadAllTariffs= async() => {
            const response = await fetch('/api/database/tariffs', {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json'
                },
            });
            const newAllTariffs = await response.json()            
            setAllTariffs(newAllTariffs)
        }
        loadListOfAllAddreses()
        loadAllTariffs() 
    }, [] )


    //useEffect( () => {console.log(listOfTariffs)}, [listOfTariffs])

    const dataForRequestInit = {
        house: '',
        tariff: '',
        phone: '',
        email: '',
        name: '',
        done: false
    }
    const [dataForRequest, setDataForRequest] = useState(dataForRequestInit) 
    const [successModalShow, setSuccessModalShow] = useState(false)

    const requestSend = async() => {
        setSuccessModalShow(true)
        setDataForRequest(dataForRequestInit)
        console.log(dataForRequest)
        /*const response = await */fetch('/api/database/newinternetrequest', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataForRequest),
        })
        setHouseInput('')
        setStreetInput('')
        setAddressFinderCondition('waitingOfStreet')
    }  
/////////
    const [houseInput, setHouseInput] = useState('')
    const [streetInput, setStreetInput] = useState('')
    const [addressFinderCondition, setAddressFinderCondition] = useState('waitingOfStreet')
    const submitHandler = () => {
        const fullInfOfHouse = async() => {
             const response = await fetch('/api/database/houseinfo', {
                method: 'POST',
                body: JSON.stringify({address: `Омск, ${streetInput}, ${houseInput}`}),
                headers: {
                'Content-Type': 'application/json'
                }
            })
            const [houseInfo] = await response.json()
            setDataForRequest({
                ...dataForRequest,
                house: houseInfo,
                tariff: ''
            })  
        }
        fullInfOfHouse()
    }

    return(
        <main>
            <Switch>
                 <Route path='/' exact>
                    <InternetConnectionRequest 
                        listOfAllAddresses={listOfAllAddresses} 
                        dataForRequest={dataForRequest}
                        setDataForRequest={setDataForRequest}
                        houseInput={houseInput} 
                        setHouseInput={setHouseInput}
                        streetInput={streetInput}
                        setStreetInput={setStreetInput}
                        addressFinderCondition={addressFinderCondition}
                        setAddressFinderCondition={setAddressFinderCondition}
                        submitHandler={submitHandler}
                        allTariffs={allTariffs}                                                
                        requestSend={requestSend}                        
                        setSuccessModalShow={setSuccessModalShow}
                        successModalShow={successModalShow}
                    />
                </Route>
                <Route path='/tariffs' exact>
                    <TableOfTariffs 
                        allTariffs={allTariffs}
                        showButton={false}
                    />
                </Route>
                <PrivateRoute path='/admin' component={Admin} to='/login'/>
                <PublicRoute path='/login' component={AuthPage} to='/admin'exact/>
                {/* <Redirect to="/"/> */}
            </Switch>    
        </main>
    )
}