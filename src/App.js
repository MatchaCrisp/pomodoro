import React, {useState,useEffect,useRef} from 'react';
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
    const [basis,setBasis]=useState(-1);
    const [intRef,setIntRef]=useState(null);

    //audio reference
    const audio = useRef(null);

    //object storing all functions related to changing timer lengths
    const timeChange={
        //increment session length by 1 if is paused and result would not go over 60
        handleSInc:()=>{        
            if (isPause && seshVal+1<=60) 
                setSeshVal(seshVal+1);
        },
        //decrement session length by 1 if is paused and result would not go under 0
        handleSDec:()=>{        
            if (isPause && seshVal-1>0) 
                setSeshVal(seshVal-1);
        },
        //increment break length by 1 if is paused and result would not go over 60
        handleBInc:()=>{        
            if (isPause && breakVal+1<=60)
                setBreakVal(breakVal+1);
        },
        //decrement break length by 1 if is paused and result would not go under 0
        handleBDec:()=>{        
            if (isPause && breakVal-1>0)
                setBreakVal(breakVal-1);
        }
    }

    //changes ispause state
    const handleTimerAction=()=>setIsPause(!isPause);

    //handles complete reset
    const handleReset=()=>{
        setIsPause(true);
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
    const calc=()=>setCurr(curr-~~((Date.now()-basis)/1000));

    ///handles start/pause timer action by setting a time basis to compare against
    useEffect(()=>{
        //stop timer
        if (isPause)
            setBasis(-1);
        //start timer
        else
            setBasis(new Date());
    },[isPause]);

    //start a countdown when basis is set
    useEffect(()=>{
        if (basis===-1) {
            //important to clear interval first
            clearInterval(intRef);
            setIntRef(null);
        }
        else {
            setIntRef(setInterval(calc,1000));
        }
    },[basis]);

    //when session value changes, check if necessary to change curr timer value
    useEffect(()=>{
        if (isSesh)
            setCurr(seshVal*60);
    },[seshVal]);

    //when break value changes, check if necessary to change curr timer value
    useEffect(()=>{
        if (!isSesh)
            setCurr(breakVal*60);
    },[breakVal]);

    //when curr value changes, check if necessary to swap session/break
    useEffect(()=>{

        if (curr<=0) {
            //pause timer
            if (audio.current!==null) {
                audio.current.currentTime=0;
                audio.current.play();
            }
            setTimeout(setIsSesh(!isSesh),1000);
        }
    },[curr]);

    //when session/break changes 
    useEffect(()=>{
        setCurr(isSesh?seshVal*60:breakVal*60);
    },[isSesh]);
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
                value={clock(curr)}
                handleTimerAction={handleTimerAction}
                handleReset={handleReset} />
            <audio 
                className="alarmSound" 
                id="beep" 
                ref={audio}
                src="./alarms/neverIntro.mp3" />
        </div>
    )
}
export default App;