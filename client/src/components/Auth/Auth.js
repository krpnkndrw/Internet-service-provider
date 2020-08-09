import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext'
import './Auth.css'

export const Auth = () => {
    const initialForm = {
        login: '', 
        password: ''
    }
    const auth = useContext(AuthContext)
    const [form, setForm] = useState(initialForm)    
    const [mod, setMod] = useState('Login')
    const [errorMessage, setErrorMessage] = useState('')

    const inputChangeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }
    useEffect( () => {
        setForm(initialForm)
        setErrorMessage('')
    }, [mod])    

    const registerHandler = async(event) => {
        event.preventDefault()
        await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(form)
        })
    }

    const loginHandler = async(event) => {
        event.preventDefault()
        try{        
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(form)
            })
            const user = await response.json() 
            if( response.status === 400) {
                throw user.message
            }      
            auth.login(user.token, user.userId)
        } catch(e) {
            setErrorMessage(e)
        }
    }
    const ModChooser = (nextMod) => {
        setMod(nextMod)
    }
    
    return(
        <div id='Auth'>
            <div>
                <button onClick={() => ModChooser('Login')} className={(mod==='Login')?'ModActive':null}>Вход</button>
                <button onClick={() => ModChooser('Register')} className={(mod==='Register')?'ModActive':null}>Регистрация</button> 
            </div>
            <form>
                <input
                  placeholder="Логин"
                  id="login"
                  type="text"
                  name="login"
                  required
                  value={form.login}
                  onChange={inputChangeHandler}
                />
                <input
                  placeholder="Пароль"
                  id="password"
                  type="password"
                  name="password"
                  required
                  value={form.password}
                  onChange={inputChangeHandler}
                />
                <p className='errorMessage'>{errorMessage}</p>
                {
                    (mod === 'Login')
                        ?<button 
                            type="submit" 
                            onClick = {loginHandler}
                        >
                            Войти
                        </button>
                        :<button 
                            type="submit"
                            onClick = {registerHandler}
                        >
                            Зарегистрироваться
                        </button>
                } 
            </form>       
        </div>
    )
}