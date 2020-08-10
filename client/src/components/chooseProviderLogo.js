import  React from 'react'
import { pathToFiles } from './pathToFilesFinder'
export const chooseProviderLogo = (provider) => {
    const providerLogo = (provider) => {
        if(provider === 'ДОМ.ru')       return 'domru3.png'
        if(provider === 'Beeline')      return 'Beeline.png'
        if(provider === 'МТС')          return 'mts.png'
        if(provider === 'Ростелеком')   return 'Rostelecom.png'
    }
    return (
        <img src={`${pathToFiles}${providerLogo(provider)}`} alt={provider}></img>
    )
}