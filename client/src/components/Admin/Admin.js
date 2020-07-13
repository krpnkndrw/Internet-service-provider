import React/*, { useState, useContext }*/ from 'react'
//import { AuthContext } from '../../context/AuthContext'
import { CloseRequests } from '../CloseRequests/CloseRequests'
import { OpenRequests } from '../OpenRequests/OpenRequests'
import './Admin.css'
import {
    //BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    //useParams
  } from "react-router-dom";

export const Admin = () => {
    let match = useRouteMatch();
    return(
        <div id='adminPlace'>            
            <div id='adminPlaceSideMenu'>
                <ul>
                    <li>
                        <Link to={`${match.url}/openrequests`}>
                            <button>
                                Открытые заявки
                            </button>
                        </Link>
                    </li>
                    <li>
                        <Link to={`${match.url}/closerequests`}>
                            <button>
                                Закрытые заявки
                            </button>
                        </Link>
                    </li>
                </ul>
            </div>
            <div id='adminPlaceBody'>
                <Switch id ='adminPlaceBody'>
                    <Route path={`${match.path}/openrequests`}>
                        <OpenRequests /> 
                    </Route>
                    <Route path={`${match.path}/closerequests`}>
                        <CloseRequests />
                    </Route>
                </Switch>
            </div>
        </div>
    )
}