import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import './Header.css';

export const Header = () => {
    const auth = useContext(AuthContext)
    const logoutHandler = () => {
        auth.logout()
    }
    return(
        <header>
            <h2>Подключение интернета в Омске</h2>
            <nav>
                <ul>
                    <li>
                        <Link to='/'> 
                            <button>Подбор тарифа</button> 
                        </Link>
                    </li>
                    <li>
                        <Link to='/tariffs'> 
                            <button>Все тарифы</button> 
                        </Link>
                    </li>
                    <li>
                        <Link to='/admin'> 
                            <button>Админ</button> 
                        </Link>
                    </li>
                    {auth.isAuthenticated?<button
                        onClick ={logoutHandler}
                    >
                        Выйти
                    </button>:null} 
                </ul>
            </nav>
        </header>
    )
}