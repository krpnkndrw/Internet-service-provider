import React from 'react'

export const StreetHouseSubmitContainer = (props) => {
    return(
        <div id='streetHouseSubmitContainer' className={props.addressSelected ? 'minimalize': undefined}>
            <div id='street' className={props.addressSelected ? 'minimalize': undefined}>
                <input
                    id='streetInput'                    
                    name='street'
                    type='text'
                    placeholder="Введите улицу"
                    autoComplete="off"
                    value={props.streetInput}
                    onChange={props.inputHandler}
                /> 
                {props.streetInputHints()}
            </div>           
            <div id='house' className={props.addressSelected ? 'minimalize': undefined}> 
                <button
                    id='houseButton'                    
                    disabled={props.addressFinderCondition === 'waitingOfStreet'}
                    /*onClick={() => setAddressSelected(false)}*/
                >
                    {(props.addressFinderCondition === 'waitingOfSubmit')?props.houseInput:'Дом'}
                </button>
                {props.houseButtonHints()}
            </div>
            <button
                id='submitButton'
                className={props.addressSelected ? 'minimalize': undefined}
                onClick={props.submitHandler}
                disabled={props.addressFinderCondition !== 'waitingOfSubmit'}
            >
                {props.addressSelected ? 'Изменить адрес': 'Подобрать тарифы'}
            </button>
        </div>
    )
}