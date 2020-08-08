import React, { /*useCallback,*/ useState, useEffect } from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import './App.css';
import { AuthContext } from './context/AuthContext'
import { Routes } from './Routes'
import { Header } from './components/Header/Header'
import { Footer } from './components/Footer/Footer'
import { RequestModalWindow } from './components/RequestModalWindow/RequestModalWindow'

function App() {
////////////////////////AUTH////////////////////////////
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(null)
  const isAuthenticated = !!token

  const login = (jwtToken, id) => {
    setToken(jwtToken)
    setUserId(id)
  }
  const logout = () => {
    setToken(null)
    setUserId(null)
  }

  useEffect( () => {
    const user = JSON.parse(localStorage.getItem('User'))
        if(user && user.token) {
            login(user.token, user.userId)
        }
  }, [])

  useEffect( () =>{
    if(!!token && !!userId){
      localStorage.setItem('User', JSON.stringify({
        token, userId
      }))
    }else {
      localStorage.removeItem('User')
    }
  }, [token, userId])
////////////////////////////////////////////////////
const dataForRequestInit = {
  house: '',
  tariff: '',
  phone: '',
  email: '',
  name: '',
  done: false
}
const [dataForRequest, setDataForRequest] = useState(dataForRequestInit) 
const [requestModalWindowShow, setRequestModalWindowShow] = useState(false)
const [listOfAllAddresses, setListOfAllAddresses] = useState([])
const [allTariffs, setAllTariffs] = useState([{
  'Провайдер': '' 
}])
const [houseInput, setHouseInput] = useState('')
const [streetInput, setStreetInput] = useState('')
const [addressFinderCondition, setAddressFinderCondition] = useState('waitingOfStreet')

const sendRequest = async() => {
    setRequestModalWindowShow(true)
    setDataForRequest(dataForRequestInit)
    console.log(dataForRequest)
    fetch('/api/database/newinternetrequest', {
       method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataForRequest),
    })
    setHouseInput('')
    setStreetInput('')    
    //setAddressFinderCondition('waitingOfStreet')
}
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
    <AuthContext.Provider value={{
      token, userId, login, logout, isAuthenticated
    }}>
      <div className="App">
        {
          requestModalWindowShow && <RequestModalWindow 
            requestModalWindowShow={requestModalWindowShow}
            setRequestModalWindowShow={setRequestModalWindowShow}
          /> 
        }               
        <Router>
        <Header />
          <Routes 
            listOfAllAddresses={listOfAllAddresses}
            allTariffs={allTariffs}
            houseInput={houseInput}
            setHouseInput={setHouseInput}
            streetInput={streetInput}
            setStreetInput={setStreetInput}
            addressFinderCondition={addressFinderCondition}
            setAddressFinderCondition={setAddressFinderCondition}
            submitHandler={submitHandler}
            dataForRequest={dataForRequest}
            setDataForRequest={setDataForRequest}
            sendRequest={sendRequest}
          />
        </Router>
        <Footer />
      </div>
    </AuthContext.Provider>
  )
}
/*
todo

Респонсив
Валидация инпутов
Маска инпутов
Обработка ошибок
Обработка ожидания загрузки
Изменить скролы в хинтах
Добавить анимаций
Заполнить пустоту в AvailableTariffPage под инпутами

*/
export default App;
