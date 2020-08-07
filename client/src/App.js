import React, { /*useCallback,*/ useState, useEffect } from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import './App.css';
import { AuthContext } from './context/AuthContext'
import { Routes } from './Routes'

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
////////////////////////SEND_REQUEST////////////////////////////
  const dataForRequestInit = {
    house: '',
    tariff: '',
    phone: '',
    email: '',
    name: '',
    done: false
}
const [dataForRequest, setDataForRequest] = useState(dataForRequestInit) 
//const [successModalShow, setSuccessModalShow] = useState(false)

const sendRequest = async() => {
    //setSuccessModalShow(true)
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
    //setAddressFinderCondition('waitingOfStreet')
} 
////////////////////////STATE////////////////////////////
    const [listOfAllAddresses, setListOfAllAddresses] = useState([])
    const [allTariffs, setAllTariffs] = useState([{
        'Провайдер': '' 
    }])

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

    const [houseInput, setHouseInput] = useState('')
    const [streetInput, setStreetInput] = useState('')
    const [addressFinderCondition, setAddressFinderCondition] = useState('waitingOfStreet')

    const submitHandler = () => {
      console.log('submitHandler start')
      const fullInfOfHouse = async() => {
        const response = await fetch('/api/database/houseinfo', {
          method: 'POST',
          body: JSON.stringify({address: `Омск, ${streetInput}, ${houseInput}`}),
          headers: {
          'Content-Type': 'application/json'
          }
        })
        console.log('submitHandler fetch')
        const [houseInfo] = await response.json()
        console.log('submitHandler response')
        setDataForRequest({
          ...dataForRequest,
          house: houseInfo,
          tariff: ''
        })
        console.log('submitHandler done')
      }
      fullInfOfHouse()
  }


  return(
    <AuthContext.Provider value={{
      token, userId, login, logout, isAuthenticated
    }}>
      <div className="App">
        <Router>
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
      </div>
    </AuthContext.Provider>
  )
}
/*
todo

Анимация от скрола как 
В инпуте должно появляться ул. +7 и тд
Направления сортировки для каждого столбца
Убрать логику логина из апп
Убрать запросы из мэйна
Обработка ошибок
Обработка ожидания загрузки
Комментарии к коду
Большще свойств тарифа (дополнительные опции и тд)
Фильтры таблицы
Кнопка скрола вверх
Маска для номера

Шрифт
Изменить скролы в хинтах

Анимация построчного добалениея таблицы
Анимайия на кнопки
Анимация на модальное окно
Скролл вверх после самбита

*/
export default App;
