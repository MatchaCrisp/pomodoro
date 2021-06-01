import React, {useState} from 'react';
import Ticker from './components/Ticker';
import Display from './components/Display';
const App = () => {
    //session/break lengths
    const [seshVal,setSeshVal]=useState(1500);
    const [breakVal,setBreakVal]=useState(300);

    //session or break, start with a session
    const [isSesh,setIsSesh]=useState(true);

    //whether timer is running, start with paused
    const [isPause,setIsPause]=useState(true);

    //current timer value
    const [curr,setCurr]=useState(0);

    //interval reference
    const [intRef,setIntRef]=useState(null);
    //increments session length
    //only works when timer not running, and that the increment would not put the overall session length over 60 minutes
    const handleSeshInc=()=>{
        if (!isPause && seshVal+60<=3600) 
            setSeshVal(seshVal+60);
    }

    //decrements session length
    //only works when timer not running, and that the decremet would not put the overall session length under 0 minutes
    const handleSeshDec=()=>{
        if (!isPause && seshVal-60>=0) 
            setSeshVal(seshVal-60);
    }

    //increments break length
    //only works when timer not running, and that the increment would not put the overall break length over 60 minutes
    const handleBreakInc=()=>{
        if (!isPause && breakVal+60<=3600)
            setBreakVal(breakVal+60);
    }

    //decrements break length
    //only works when timer not running, and that the decrement would not put hte overall break length under 0 minutes
    const handleBreakDec=()=>{
        if (!isPause && breakVal-60>=0)
            setBreakVal(breakVal-60);
    }

    //handles start/pause timer action
    const handleTimerAction=()=>{
        //if paused
        if (isPaused) {

        }
        //if started
        else {

        }
    }

    //handles complete reset
    const handleReset=()=>{
        setSeshVal(1500);
        setBreakVal(300);
        setIsPause(true);
        setIsSesh(true);
        setCurr(0);
        setIntRef(null);
    }
    return (
        <div>
            <Ticker id='session' 
                label='session'
                value='00:00'
                handleInc={handleSeshInc}
                handleDec={handleSeshDec}/>
            <Ticker id='break' 
                label='break'
                value='00:00'
                handleInc={handleBreakInc}
                handleDec={handleBreakDec}/>
            <Display isSesh={isSesh}
                isPause={isPause}
                handleTimerAction={handleTimerAction}
                handleReset={handleReset} />
        </div>
    )
}
export default App;