import  React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
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
        if(props.streetInput.length === 0) return ( <ul id='streetHintsList' className='hide' style={{border: 0}}></ul> )
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
        <div id='addressFinder' className={props.newClass?props.newClass:null}>
            <div>
                <input
                    id='streetInput'                    
                    name='street'
                    type='text'
                    placeholder="Введите улицу"
                    autoComplete="off"
                    value={props.streetInput}
                    onChange={inputHandler}
                /> 
                {streetInputHints()}
            </div>           
            <div id='addressFinderHouse'> 
                <button
                    id='houseButton'                    
                    disabled={props.addressFinderCondition === 'waitingOfStreet'}
                    /*onClick={() => setAddressSelected(false)}*/
                >
                    {(props.addressFinderCondition === 'waitingOfSubmit')?props.houseInput:'Дом'}
                </button>
                {houseButtonHints()}
            </div>
            <Link to='/availableTariffs'>
                <button
                    id='submitButton'
                    onClick={submitHandler}
                    disabled={props.addressFinderCondition !== 'waitingOfSubmit'}
                >
                    {addressSelected ? 'Изменить адрес': 'Подобрать тарифы'}
                </button>
            </Link>
        </div>       
    )
}