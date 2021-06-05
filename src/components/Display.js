import React from 'react';

//needs from props:
//isSesh=boolean:session or break
//isPause=boolean:state of clock
//value=string:time left
//handleTimerAction=fn():start/pause click event
//handleReset=reset whole thing click event
const Display = props => {
    return (
        <div>
            <p id="timer-label">{props.isSesh?'session':'break'}</p>
            <p id="time-left">{props.value}</p>
            <button id="start_stop" onClick={props.handleTimerAction}>{props.isPause?'start':'pause'}</button>
            <button id="reset" onClick={props.handleReset}>reset</button>
        </div>
    )
}

export default Display;