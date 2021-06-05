import React from 'react';

//needs from props
//id=string: used for setting id of component elements (therefore must be unique)
//label=string: displayed name of the component
//value=int:displayed value of the component
//handleInc=fn():increment displayed value
//handledec=fn():decrement displayed value
const Ticker=props=>{  
    return (
        <div>
            <p id={`${props.id}-label`}>
                {props.label}
            </p>
            <button onClick={props.handleInc}
                id={`${props.id}-increment`}>Inc</button>
            <p id={`${props.id}-length`}>
                {props.value}
            </p>
            <button onClick={props.handleDec}
                id={`${props.id}-decrement`}>Dec</button>
        </div>
    )
}

export default Ticker;