import React, {useState,useEffect,useRef} from 'react';
import Ticker from './components/Ticker';
import Display from './components/Display';
import {useIsFirstRender} from './hooks/useIsFirstRender';
const App = () => {
    //session/break lengths (in minutes)
    const [seshVal,setSeshVal]=useState(25);
    const [breakVal,setBreakVal]=useState(5);

    //session or break, start with a session
    const [isSesh,setIsSesh]=useState(true);

    //current timer value (in s)
    const [curr,setCurr]=useState(1500);

    //interval reference
    const [basis,setBasis]=useState(-1);
    const [intRef,setIntRef]=useState(null);

    //audio reference
    const audio = useRef(null);

    //first render state
    const isFR=useIsFirstRender();
    //object storing all functions related to changing timer lengths
    const timeChange={
        //increment session length by 1 if is paused and result would not go over 60
        handleSInc:()=>{        
            if (basis===-1 && seshVal+1<=60) 
                setSeshVal(seshVal+1);
        },
        //decrement session length by 1 if is paused and result would not go under 0
        handleSDec:()=>{        
            if (basis===-1 && seshVal-1>0) 
                setSeshVal(seshVal-1);
        },
        //increment break length by 1 if is paused and result would not go over 60
        handleBInc:()=>{        
            if (basis===-1 && breakVal+1<=60)
                setBreakVal(breakVal+1);
        },
        //decrement break length by 1 if is paused and result would not go under 0
        handleBDec:()=>{        
            if (basis===-1 && breakVal-1>0)
                setBreakVal(breakVal-1);
        }
    }

    //changes basis state
    const handleTimerAction=()=>{
        if (basis===-1) 
            setBasis(new Date());
        else 
            setBasis(-1);
    };

    //handles complete reset
    const handleReset=()=>{
        setIsSesh(true);
        setSeshVal(25);
        setBreakVal(5);
        //useeffect would be unreliable since timer on default setting being reset would not trigger it
        setCurr(1500);
        //useeffect would clearinterval here
        setBasis(-1);
        //stop alarm if playing
        audio.current.pause();
        audio.current.currentTime=0;
    }

    //turns curr timer value (in seconds) to "XX:XX" for display
    const clock=seconds=>{
        const minute=Math.floor(seconds/60).toString();
        const second=(seconds%60).toString();
        //add leading zero to minute/second value if not two digits
        return (minute<10?`0${minute}`:minute)+':'+(second<10?`0${second}`:second);
    };


    //counts down timer value
    const calc=(rem,base)=>setCurr(rem-~~((Date.now()-base)/1000));

    useEffect(()=>{
        if (isFR)
            return;
        
            if (basis===-1) {
                clearInterval(intRef);
                setIntRef(null);
            }
            else {
                setIntRef(setInterval(()=>calc(curr,basis),1000));
            }
    },[basis]);
    //when session value changes, check if necessary to change curr timer value
    useEffect(()=>{
        if (isFR)
            return;
        console.log('seshval.breakval,issesh state change triggered useeffect');
        console.log(`issesh ${isSesh}, seshVal ${seshVal}, breakVal ${breakVal}`);
        if (isSesh)
            setCurr(seshVal*60);
        else
            setCurr(breakVal*60);
    },[isSesh,seshVal,breakVal]);

            
    const handleSwap=currTimerState=>{
        setIsSesh(!currTimerState);
    }
    //when curr value changes, check if necessary to swap session/break
    useEffect(()=>{
        if (isFR)
            return;

            console.log('curr state change triggered useeffect');
            console.log(`curr ${curr}`);
        if (curr===5) {
            //play animation
        }
        else if (curr===0) {
            audio.current.currentTime=0;
            audio.current.play();
        }
        else if (curr<0) {
            handleSwap(isSesh);
        }
    },[curr]);

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
                isPause={basis===-1}
                value={clock(curr)}
                handleTimerAction={handleTimerAction}
                handleReset={handleReset} />
            <audio 
                className="alarmSound" 
                id="beep" 
                ref={audio}
                src="https://github.com/MatchaCrisp/pomodoro/blob/main/src/alarms/neverIntro.mp3?raw=true" />
        </div>
    )
}
export default App;