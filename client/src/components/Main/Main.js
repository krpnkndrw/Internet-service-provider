import React, { useState, useEffect } from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import './Main.css'
import { InternetConnectionRequest } from '../InternetConnectionRequest/InternetConnectionRequest'
//import { AllTariffs } from '../AllTariffs/AllTariffs'
import { AuthPage } from '../AuthPage/AuthPage'
import { Admin } from '../Admin/Admin'
//import { AuthContext } from '../../context/AuthContext'
import { PrivateRoute } from '../../PrivateRoute/PrivateRoute'
import { PublicRoute } from '../../PrivateRoute/PublicRoute'
import { TariffsTable } from '../TariffsTable/TariffsTable'
import { TableOfTariffs } from '../TariffsTable/TableOfTariffs'

 
export const Main = () => {
    //const auth = useContext(AuthContext)
    const [listOfAddresses, setListOfAddresses] = useState([])
    const [listOfTariffs, setListOfTariffs] = useState([])

    useEffect( () => {
        const loadListOfAddreses = async() => {
            const response = await fetch('/api/database/listOfAddresses', {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json'
                },
            });
            const [listOfAddresses] = await response.json()          
            setListOfAddresses(listOfAddresses.list)
        }
        loadListOfAddreses()
    }, [] )
    useEffect( () => {
        const loadListOfTariffs= async() => {
            const response = await fetch('/api/database/tariffs', {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json'
                },
            });
            const allTariffs = await response.json()            
            setListOfTariffs(allTariffs)
        }
        loadListOfTariffs() 
    }, [] ) 
    //useEffect( () => {console.log(listOfTariffs)}, [listOfTariffs])

    return(
        <main>
            <Switch>
                 <Route path='/' exact>
                    <InternetConnectionRequest 
                        listOfAddresses={listOfAddresses} 
                        listOfTariffs={listOfTariffs}
                    />
                </Route>
                <Route path='/tariffs' exact>
                    <TableOfTariffs 
                        listOfTariffs={listOfTariffs}
                    />
                </Route>
                <PrivateRoute path='/admin' component={Admin} to='/login'/>
                <PublicRoute path='/login' component={AuthPage} to='/admin'exact/>
                {/* <Redirect to="/"/> */}
            </Switch>    
        </main>
    )
}