import  React, { useEffect, useState } from 'react';
import { StreetHouseSubmitContainer } from './StreetHouseSubmitContainer'
import './AddressFinder.css'

export const AddressFinder = (props) => {

    const [allAddresses, setAllAddresses] = useState([])
    const [allStreets, setAllStreets] = useState([])
    const [addressSelected, setAddressSelected] = useState(false)

    useEffect( () => {
        if(props.listOfAllAddresses){
            const listOfStreetsAndHouses = props.listOfAllAddresses.map(element => element.split(', '))
            const listOfStreets = [...new Set(listOfStreetsAndHouses.map(element => element[0]))]
            setAllAddresses(listOfStreetsAndHouses)
            setAllStreets(listOfStreets)
        }
        document.addEventListener('click', (event) => showHide(event, document.getElementById('streetInput'), document.getElementById('streetHintsList')))
    }, [props.listOfAllAddresses] )

    const inputHandler = (event) => {
        //setAddressSelected(false)
        props.setAddressFinderCondition( 'waitingOfStreet' )
        props.setStreetInput( event.target.value )        
    }

    const streetInputHints = () => {
        if(props.streetInput.length === 0)  return ( <ul id='streetHintsList' className='hide' style={{border: 0}}></ul> )
        const streetsHints = allStreets.filter(element => element.toLocaleLowerCase().startsWith(props.streetInput.toLocaleLowerCase()))
        if(streetsHints.length === 0) return ( <ul id='streetHintsList' className='hide' style={{border: 0}}></ul> )
        return( <ul id='streetHintsList' className='hide'>{createArrOfLi(streetsHints, hintsStreetButtonHandler, 'streetHintsListButton')}</ul> )
    }

    const houseButtonHints = () => {                
        const housesHints = allAddresses.filter(element => element[0] === props.streetInput).map(element => element[1])
        if(housesHints.length === 0) return 
        return( <ul id='houseHintsList' className='hide'>{createArrOfLi(housesHints, hintsHouseButtonHandler, 'houseHintsListButton')}</ul> )
    }

    const hintsStreetButtonHandler = (element) => {
        props.setStreetInput( element )
        props.setAddressFinderCondition( 'waitingOfHouse' )
        document.removeEventListener('click', (event) => showHide(event, document.getElementById('streetInput'), document.getElementById('streetHintsList')))
        document.addEventListener('click', (event) => showHide(event, document.getElementById('houseButton'), document.getElementById('houseHintsList')))
    }

    const hintsHouseButtonHandler = (element) => {
        props.setHouseInput( element )
        props.setAddressFinderCondition( 'waitingOfSubmit' )
        document.removeEventListener('click', (event) => showHide(event, document.getElementById('streetInput'), document.getElementById('streetAutocompleteList')))
    }

    const createArrOfLi = (data, buttonHandler, btnClassName) => {
        return data.map( (element, index) => {
            return(
                <li key={index}>
                    <button className={addressSelected ? 'minimalize': undefined} onClick={() => buttonHandler(element)}>{element}</button>
                </li>
            )
        })
    }
    
    const showHide = (event, triger, component) => {
        if(!component || !triger) return
        if( event.path.includes(triger) ){
            component.className = "show"
        } else {
            component.className = "hide"
        }
    }

    const submitHandler = () => {
        props.submitHandler()
        setAddressSelected(true)
    }
    return(
        <React.Fragment>
        <div id='addressFinderFiller' className={addressSelected ? 'minimalize': undefined}></div>
        <div id='addressFinder' className={addressSelected ? 'minimalize toFixed': undefined}>            
            <div id='addressFinderBackground'>
                <video autoPlay muted loop id="addressFinderBackgroundVideo">
                    <source src='http://localhost:3000/static/office_1.webm' type="video/mp4" />
                </video>
                <div id='addressFinderBackgroundFilter'></div>
            </div>            
            <div id='addressFinderContent'>                
                <nav>
                    <h2 id='addressFinderTitle' className={addressSelected ? 'disappearance': undefined}
                        >Подключение интернета в Омске</h2>
                    <div>
                        <button>Все тарифы</button>
                        <button>Логин</button>
                    </div>                  
                </nav>
                <h1 id='addressFinderH1' className={addressSelected ? 'disappearance': undefined}>
                    <p>Введите адрес</p>
                    <p>и мы подберем вам подходящий тариф</p>
                </h1>
                <StreetHouseSubmitContainer 
                    addressSelected={addressSelected}
                    inputHandler={inputHandler}
                    streetInputHints={streetInputHints}
                    houseButtonHints={houseButtonHints}
                    submitHandler={submitHandler}
                    streetInput={props.streetInput}
                    addressFinderCondition={props.addressFinderCondition}
                    houseInput={props.houseInput}
                />
            </div>            
        </div>
        </React.Fragment>
    )
}