import  React from 'react'
import { Link } from 'react-router-dom'
import { AddressFinder } from '../../components/AddressFinder/AddressFinder'
import { pathToFiles } from '../../components/pathToFilesFinder'
import './TitlePage.css'

export const TitlePage = (props) => {
    return(
        <div id='titlePage'>            
            <div id='titlePageBackground'>
                <video autoPlay muted loop id="titlePageBackgroundVideo">
                    <source src={`${pathToFiles}office_1.webm`} type="video/mp4" />
                </video>
                <div id='titlePageBackgroundFilter'></div>
            </div>
            <div id='titlePageContent'>                
                <nav>
                    <h2 id='titlePageTitle'
                        >Подключение интернета в Омске</h2>
                    <div>
                        <Link to='/allTariffs'>
                            Все тарифы 
                        </Link>
                        <Link to='/admin'> 
                            Админ 
                        </Link>
                    </div> 
                </nav>
                <h1 id='titlePageH1'>
                    <p>Введите адрес</p>
                    <p>и мы подберем вам подходящий тариф</p>
                </h1>
                <AddressFinder
                    listOfAllAddresses={props.listOfAllAddresses}
                    houseInput={props.houseInput}
                    setHouseInput={props.setHouseInput}
                    streetInput={props.streetInput}
                    setStreetInput={props.setStreetInput}
                    addressFinderCondition={props.addressFinderCondition}
                    setAddressFinderCondition={props.setAddressFinderCondition}
                    submitHandler={props.submitHandler}
                />
            </div>
        </div>
    )
}
