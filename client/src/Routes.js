import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import { PrivateRoute } from './PrivateRoute/PrivateRoute'
import { PublicRoute } from './PrivateRoute/PublicRoute'

import { TitlePage } from './pages/TitlePage/TitlePage'
import { AvailableTariffsPage } from './pages/AvailableTariffsPage/AvailableTariffsPage'
import { AllTariffsPage } from './pages/AllTariffsPage/AllTariffsPage'
import { AboutTariffPage } from './pages/AboutTariffPage/AboutTariffPage'
import { AuthPage } from './pages/AuthPage/AuthPage'
import { AdminPage } from './pages/AdminPage/AdminPage'


export const Routes = (props) => {
  return (
    <Switch>
      <Route path="/" exact>
        <TitlePage 
            listOfAllAddresses={props.listOfAllAddresses}
            houseInput={props.houseInput}
            setHouseInput={props.setHouseInput}
            streetInput={props.streetInput}
            setStreetInput={props.setStreetInput}
            addressFinderCondition={props.addressFinderCondition}
            setAddressFinderCondition={props.setAddressFinderCondition}
            submitHandler={props.submitHandler}
        />
      </Route>
      <Route path="/availableTariffs" exact>
        <AvailableTariffsPage
            listOfAllAddresses={props.listOfAllAddresses}
            houseInput={props.houseInput}
            setHouseInput={props.setHouseInput}
            streetInput={props.streetInput}
            setStreetInput={props.setStreetInput}
            addressFinderCondition={props.addressFinderCondition}
            setAddressFinderCondition={props.setAddressFinderCondition}
            submitHandler={props.submitHandler} 
            allTariffs={props.allTariffs}
            dataForRequest={props.dataForRequest}
            setDataForRequest={props.setDataForRequest}
        />
      </Route>
      <Route path="/allTariffs" exact>
        <AllTariffsPage
          allTariffs={props.allTariffs}
          dataForRequest={props.dataForRequest}
          setDataForRequest={props.setDataForRequest}
        />
      </Route>
      <Route path="/aboutTariff" exact>
        <AboutTariffPage 
          dataForRequest={props.dataForRequest}
          setDataForRequest={props.setDataForRequest}
          sendRequest={props.sendRequest}
        />
      </Route>
      <PrivateRoute path='/admin' component={AdminPage} to='/auth'/>
      <PublicRoute path='/auth' component={AuthPage} to='/admin'exact/>
      <Redirect to="/" />
    </Switch>
  )
}