import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import { TitlePage } from './pages/TitlePage/TitlePage'
import { AvailableTariffsPage } from './pages/AvailableTariffsPage/AvailableTariffsPage'
import { AllTariffsPage } from './pages/AllTariffsPage/AllTariffsPage'


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
        />
      </Route>
      <Route path="/allTariffs" exact>
        <AllTariffsPage
          allTariffs={props.allTariffs}
          dataForRequest={props.dataForRequest}
        />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}