import React, {useState,useEffect} from 'react';
import Ticker from './components/Ticker';
import Display from './components/Display';
const App = () => {
    //session/break lengths (in minutes)
    const [seshVal,setSeshVal]=useState(25);
    const [breakVal,setBreakVal]=useState(5);

    //session or break, start with a session
    const [isSesh,setIsSesh]=useState(true);

    //whether timer is running, start with paused
    const [isPause,setIsPause]=useState(true);

    //current timer value (in s)
    const [curr,setCurr]=useState(1500);

    //interval reference
    const [intRef,setIntRef]=useState(null);

    //object storing all functions related to changing timer lengths
    //update curr value if relevant
    const timeChange={
        //increment session length by 1 if is paused and result would not go over 60
        handleSInc:()=>{        
            if (isPause && seshVal+1<=60) 
            setSeshVal(seshVal+1);
        },
        //decrement session length by 1 if is paused and result would not go under 0
        handleSDec:()=>{        
            if (isPause && seshVal-1>=0) 
            setSeshVal(seshVal-1);
        },
        //increment break length by 1 if is paused and result would not go over 60
        handleBInc:()=>{        
            if (isPause && breakVal+1<=60)
            setBreakVal(breakVal+1);
        },
        //decrement break length by 1 if is paused and result would not go under 0
        handleBDec:()=>{        
            if (isPause && breakVal-1>=0)
            setBreakVal(breakVal-1);
        }
    }

    //handles start/pause timer action
    const handleTimerAction=()=>{
        //if paused
        if (isPause) {

        }
        //if started
        else {

        }
    }

    //handles complete reset
    const handleReset=()=>{
        setSeshVal(25);
        setBreakVal(5);
        setIsPause(true);
        setIsSesh(true);
        setCurr(1500);
        setIntRef(null);
    }

    const clock=seconds=>{
        let minute=Math.floor(seconds/60).toString();
        let second=(seconds%60).toString();
        return (minute<10?`0${minute}`:minute)+':'+(second<10?`0${second}`:second);
    };
    const currClock=clock(curr);
    useEffect(()=>{
        if (isSesh)
            setCurr(seshVal*60);
    },[seshVal]);
    useEffect(()=>{
        if (!isSesh)
            setCurr(breakVal*60);
    },[breakVal]);
    return (
        <div>
            <Ticker id='session' 
                label='session'
                value={seshVal}
                handleInc={timeChange.handleSInc}
                handleDec={timeChange.handleSDec}/>
            <Ticker id='break' 
                label='break'
                value={breakVal}
                handleInc={timeChange.handleBInc}
                handleDec={timeChange.handleBDec}/>
            <Display isSesh={isSesh}
                isPause={isPause}
                value={currClock}
                handleTimerAction={handleTimerAction}
                handleReset={handleReset} />
        </div>
    )
}
export default App;