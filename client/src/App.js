import React, { useCallback, useState, useEffect } from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import './App.css';
import { Header } from './components/Header/Header'
import { Main } from './components/Main/Main'
import { Footer } from './components/Footer/Footer'
import { AuthContext } from './context/AuthContext'

function App() {

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


  return(
    <AuthContext.Provider value={{
      token, userId, login, logout, isAuthenticated
    }}>
      <div className="App">
        <Router> 
          <Header />          
          <Main />
          <Footer />
        </Router>   
      </div>
    </AuthContext.Provider>
    )  
}
/*
todo

Направления сортировки для каждого столбца
Убрать логику логина из апп
Убрать запросы из мэйна
Кнопки выбора тарифа в таблице всех тарифов
Поднять состояния до main
Обработка ошибок
Обработка ожидания загрузки
Исправить говнокод(слишком много лишних состояний и функций)
Автокомплит иногда багует и не показывает
Комментарии к коду
Большще свойств тарифа (дополнительные опции и тд)
Фильтры таблицы
Кнопка скрола вверх
Маска для номера

Шрифт
Изменить скролы в автокомплитах

Анимация построчного добалениея таблицы
Анимайия на кнопки
Анимация на модальное окно
Скролл вверх после самбита

*/
export default App;
