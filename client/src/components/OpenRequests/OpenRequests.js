import React, { useEffect, useState } from 'react'
import { RequestCard } from '../RequestCard/RequestCard'
import './OpenRequests.css'

export const OpenRequests = () => {
    const [allRequest, setAllRequest] = useState([])
    const [allRequestCard, setAllRequestCard] = useState([])

    const loadListOfAddreses = async() => {
        const response = await fetch('/api/database/allnotdonerequests', {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'
            },
        });
        const allrequests = await response.json()
        setAllRequest(allrequests)
    }
    useEffect( () => {        
        loadListOfAddreses()
    }, [] )

    const doneRequestHandle = async(id) => {
       /* const response =*/await fetch('/api/database/updaterequest', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id,
                update: { done: true }        
            }),
        })
        loadListOfAddreses()
    }
    const deleteRequestHandle = async(id) => {
        /*const response = await */fetch('/api/database/deleterequest', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        })
        loadListOfAddreses()
    }

    useEffect( () => {
        setAllRequestCard(
            allRequest.map( (element, index) => {
                return (<RequestCard key={index} request={element} doneRequestHandle={doneRequestHandle} deleteRequestHandle={deleteRequestHandle}/>) 
            })
        )
    }, [allRequest] )

    return(
        <div>
            {allRequestCard} 
        </div>
    )
}