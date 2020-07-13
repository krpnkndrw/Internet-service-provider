import  React,  { useEffect, useState/*, useRef*/ } from 'react';
//import ReactDOM from 'react-dom';
import './AddressFinder.css'

export const AddressFinder = (props) => {
    const [addresses, setAddresses] = useState({
        streetsAndHouses: [],
        streets: []
    })  
    const [input, setInput] = useState({
        street: '',
        house: ''        
    })
    const [autoComplete, setAutoComplete] = useState({
        streets: [],
        houses: []
    })
    const [conditionOfForm, setConditionOfForm] = useState({
        steetEntered: false,
        houseEntered: false,
    })
    const [showAutocomplete, setShowAutocomplete] = useState({
        streetAutocompleteShow: false,
        houseAutocompleteShow: false
    })

    //Обработка инпута, сброс списков автозаполнения, сброс состояния формы
    const inputHandler = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value,
        })
        setConditionOfForm({
            steetEntered: false,
            houseEntered: false
        })
        setAutoComplete({
            streets: [],
            houses: []
        })
    }
    //Загрузка массива адресов, разбиение его на 2 массива улиц с домами и домов и сохранение их в state addresses
    useEffect( () => {
        if(props.listOfAllAddresses){
            const listOfStreetsAndHouses = props.listOfAllAddresses.map(element => element.split(', '))
            const listOfStreets = [...new Set(listOfStreetsAndHouses.map(element => element[0]))]
            setAddresses({...addresses, streetsAndHouses: listOfStreetsAndHouses, streets: listOfStreets})
        } 
        //Скрытие списков автозаполнения при клике вне        
        document.addEventListener('click', (event) => {
            showingAutocompleteStreet(event)
        })
    }, [props.listOfAllAddresses] )
    
    //Скрытие списка улиц автозаполнения при клике вне 
    const showingAutocompleteStreet = (event) => {
        const streetInput = document.getElementById('streetInput')
        if(event.path.includes(streetInput) ){
            setShowAutocomplete({ ...showAutocomplete, streetAutocompleteShow: true })
        } else {
            setShowAutocomplete({ ...showAutocomplete, streetAutocompleteShow: false })
        }
    }
    //Скрытие списка улиц автозаполнения при клике вне 
    const showingAutocompleteHouse = (event) => {
        const houseButton = document.getElementById('houseButton')
        if(!event.path.includes(houseButton) ){
            setShowAutocomplete({ ...showAutocomplete, houseAutocompleteShow: false }) 
        } else {
            setShowAutocomplete({ ...showAutocomplete, houseAutocompleteShow: true })
        }
    }

    //Создание массива автозаполнения улиц 
    useEffect( () => {
        if(input.street.length < 1) {
            setAutoComplete({...autoComplete, streets: []})
            return    
        }
        //Проверка по наличию подстроки
        const lowerCaseInput = input.street.toLocaleLowerCase()
        //const autoCompleteStreets = addresses.streets.filter( element => element.toLocaleLowerCase().includes(lowerCaseInput) )
        //Проверка по совпадению первых символов
        const autoCompleteStreets = addresses.streets.filter( element => element.toLocaleLowerCase().startsWith(lowerCaseInput) )
        setAutoComplete({...autoComplete, streets: autoCompleteStreets})
    }, [input.street])  

    //Создание списка автозаполнения улиц
    const autoCompleteStreetsList = () => {
        if(conditionOfForm.steetEntered || autoComplete.streets.length === 0 || !showAutocomplete.streetAutocompleteShow) return null
        let newList = autoComplete.streets.map( (element, index) => {
            return(
            <li key={index}>
                <button onClick={() => autoCompleteStreetButtonHandler(element)}>{element}</button>
            </li>)
        })
        return( <ul id='streetAutocompleteList'>{newList}</ul> )
    }

    //Обработка выбора варианта для автозаполнения улиц
    const autoCompleteStreetButtonHandler = (element) => {
        setInput({...input, street: element})
        setConditionOfForm({...conditionOfForm, steetEntered: true})
        document.removeEventListener('click', (event) => showingAutocompleteStreet(event))
        document.addEventListener('click', (event) => showingAutocompleteHouse(event))
    }
    
    //Создание массива автозаполнения домов по нажатию на кнопку дома
    const houseButtonHandler = () => {
        setInput({ ...input, house: '' })
        setConditionOfForm({ ...conditionOfForm,  houseEntered: false})
        setShowAutocomplete({ ...showAutocomplete, houseAutocompleteShow: true }) 
        const autoCompleteHouses = addresses.streetsAndHouses
            .filter( element => element[0] === input.street)
            .map( element => element[1] )
        setAutoComplete({...autoComplete, houses: autoCompleteHouses})
    }

    //Создание списка автозаполнения домов
    const autoCompleteHousesList = () => {
        if(conditionOfForm.houseEntered || autoComplete.houses.length === 0|| !showAutocomplete.houseAutocompleteShow) return null
        let newList = autoComplete.houses.map( (element, index) => {
            return(
            <li key={index}>
                <button onClick={() => autoCompleteHouseButtonHandler(element)}>{element}</button>
            </li>)
        })
        return( <ul>{newList}</ul> )
    }

    //Обработка выбора варианта для автозаполнения домов
    const autoCompleteHouseButtonHandler = (element) => {
        setInput({...input, house: element})
        setConditionOfForm({...conditionOfForm,  houseEntered: true})
    }
    
    const submitHandler = () => {
        if(conditionOfForm.steetEntered && conditionOfForm.houseEntered){
            const fullInfOfHouse = async() => {
                const response = await fetch('/api/database/houseinfo', {
                    method: 'POST',
                    body: JSON.stringify({address: `Омск, ${input.street}, ${input.house}`}),
                    headers: {
                    'Content-Type': 'application/json'
                    }
                })
                const [houseInfo] = await response.json()
                //console.log(houseInfo)
                console.log(props.dataForRequest)
                props.setDataForRequest({
                    ...props.dataForRequest,
                    house: houseInfo,
                    tariff: ''
                })  
            }
            fullInfOfHouse()
        }
    }

    useEffect( () => {
        if(props.clearAddress){
            setInput({
                street: '',
                house: ''
            })
            setConditionOfForm({
                steetEntered: false,
                houseEntered: false
            })
            setAutoComplete({
                streets: [],
                houses: []
            })
            props.setClearAddress(false)
        }
    }, [props.clearAddress])
    
    return(
        <div id='addressFinder'>
            <div id='street'>
                <input
                    id='streetInput'
                    name='street'
                    type='text'
                    placeholder="Введите улицу"
                    value={input.street}
                    onChange={inputHandler}
                /> 
                {autoCompleteStreetsList()}
            </div>           
            <div id='house'> 
                <button
                    id='houseButton'
                    onClick={houseButtonHandler}
                    disabled={!conditionOfForm.steetEntered}
                >
                    {conditionOfForm.houseEntered?input.house:'Дом'}
                </button>
                {autoCompleteHousesList()}

            </div>
            <button
                id='submitButton'
                onClick={submitHandler}
                disabled={!(conditionOfForm.steetEntered && conditionOfForm.houseEntered)}
            >
                Подобрать тарифы    
            </button>  
        </div>
    )
}