import  React, { useEffect, useState } from 'react';
import './AddressFinder.css'

export const AddressFinder = (props) => {

    const [allAddresses, setAllAddresses] = useState([])
    const [allStreets, setAllStreets] = useState([])

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
        props.setAddressFinderCondition( 'waitingOfStreet' )
        props.setStreetInput( event.target.value )        
    }

    const streetInputHints = () => {
        if(props.streetInput.length === 0)  return ( <ul id='streetHintsList' className='hide' style={{border: 0}}></ul> )
        const streetsHints = allStreets.filter(element => element.toLocaleLowerCase().startsWith(props.streetInput.toLocaleLowerCase()))
        if(streetsHints.length === 0) return ( <ul id='streetHintsList' className='hide' style={{border: 0}}></ul> )
        return( <ul id='streetHintsList' className='hide'>{createLiArr(streetsHints, hintsStreetButtonHandler)}</ul> )
    }

    const houseButtonHints = () => {
        const housesHints = allAddresses.filter(element => element[0] === props.streetInput).map(element => element[1])
        if(housesHints.length === 0) return 
        return( <ul id='houseHintsList' className='hide'>{createLiArr(housesHints, hintsHouseButtonHandler)}</ul> )
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

    const createLiArr = (data, buttonHandler) => {
        return data.map( (element, index) => {
            return(
                <li key={index}>
                    <button onClick={() => buttonHandler(element)}>{element}</button>
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

    return(
        <div id='addressFinder'>
            <div id='street'>
                <input
                    id='streetInput'
                    name='street'
                    type='text'
                    placeholder="Введите улицу"
                    value={props.streetInput}
                    onChange={inputHandler}
                /> 
                {streetInputHints()}
            </div>           
            <div id='house'> 
                <button
                    id='houseButton'
                    disabled={props.addressFinderCondition === 'waitingOfStreet'}
                >
                    {(props.addressFinderCondition === 'waitingOfSubmit')?props.houseInput:'Дом'}
                </button>
                {houseButtonHints()}
            </div>
            <button
                id='submitButton'
                onClick={props.submitHandler}
                disabled={props.addressFinderCondition !== 'waitingOfSubmit'}
            >
                Подобрать тарифы    
            </button>
        </div>
    )
}