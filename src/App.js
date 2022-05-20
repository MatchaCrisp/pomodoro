// external
// react
import React, {useState,useEffect,useRef} from 'react';

// material ui
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

// internal
// components
import Ticker from './components/Ticker';
import Display from './components/Display';
// hooks
import useIsFirstRender from './hooks/useIsFirstRender';

// app that renders two tickers, one for break and one for productive time
// and one display that shows the timer countdown and two buttons: start/pause and reset 
// default is 25 min work: 5 min break
const App = () => {
    //session/break lengths (in minutes)
    const [seshVal,setSeshVal]=useState(25);
    const [breakVal,setBreakVal]=useState(5);

    //session or break, start with a session
    const [isSesh,setIsSesh]=useState(true);

    //current timer value (in s)
    const [curr,setCurr]=useState(1500);

    //audio reference
    const audio = useRef(null);

    //first render state
    const isFR=useIsFirstRender();

    //for timer
    //expected time lapse: the expected date.now() value when next settimeout is executed
    //the timeout value for next settimeout
    const [timeItems,updateTimeItems]=useState({
        expTimeLapse:0,
        nextUp:1000
    });
    //timeout reference for stopping
    const [timeRef,setTimeRef]=useState(0);

    //object storing all functions related to changing timer lengths
    const timeChange={
        //increment session length by 1 if is paused and result would not go over 60
        handleSInc:()=>{        
            if (timeItems.expTimeLapse===0 && seshVal+1<=60) 
                setSeshVal(seshVal+1);
        },
        //decrement session length by 1 if is paused and result would not go under 0
        handleSDec:()=>{        
            if (timeItems.expTimeLapse===0 && seshVal-1>0) 
                setSeshVal(seshVal-1);
        },
        //increment break length by 1 if is paused and result would not go over 60
        handleBInc:()=>{        
            if (timeItems.expTimeLapse===0 && breakVal+1<=60)
                setBreakVal(breakVal+1);
        },
        //decrement break length by 1 if is paused and result would not go under 0
        handleBDec:()=>{        
            if (timeItems.expTimeLapse===0 && breakVal-1>0)
                setBreakVal(breakVal-1);
        }
    }

    //decrement current function used as callback for check
    const updateCurr=()=>setCurr(curr-1);

    //when timer running, call every settimeout
    const check=()=>{
        //calculating drift from expected time lapsed
        const d=Date.now()-timeItems.expTimeLapse;
        //if drift is larger than 1 second, 
        //consider: immediately run next settimeout to catch up
        //or: stop timer?
        if (d>1000) {
            console.log(d,1000,'skipped time!');
        }
        updateCurr();
        //current solution: immediately run next settimeout to catch up
        //update the list of timer items to new ones
        updateTimeItems({
            expTimeLapse:timeItems.expTimeLapse+1000,
            nextUp:1000>=d?1000-d:0
        });
    }

    //runs when no timer is running 
    //settimeout handled by useeffect
    const startTimer=()=>{
        updateTimeItems({
            expTimeLapse:Date.now()+1000,
            nextUp:1000
        });
    }

    //stops timer when one is running
    //cleartimeout handled by useeffect
    const stopTimer=()=>{
        updateTimeItems({
            expTimeLapse:0,
            nextUp:1000
        });
    }

    //checks if to start or pause timer by checking expectd time lapsed value
    const handleTimerAction=()=>{
        if (timeItems.expTimeLapse===0) {
            startTimer();
        }
        else {
            stopTimer();
        }
    };

    //handles complete reset
    const handleReset=()=>{
        setIsSesh(true);
        setSeshVal(25);
        setBreakVal(5);
        //useeffect would be unreliable since timer on default setting being reset would not trigger it
        setCurr(1500);
        //cleartimeout handled by useeffect
        stopTimer();
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

    //when timer items changes:
    //if expected time lapsed is 0, means timer is now paused, respond by clear running timer and resetting the timeout reference
    //else the next settimeout should be set to check against new expected time lapsed, respond by settimeout
    useEffect(()=>{
        if (isFR)
            return;
        if (timeItems.expTimeLapse===0) {
            clearTimeout(timeRef);
            setTimeRef(0);
        }
        else {
            setTimeRef(setTimeout(check,timeItems.nextUp));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[timeItems]);

    //when session value changes, check if necessary to change curr timer value
    useEffect(()=>{
        if (isFR)
            return;
        console.log('seshval.breakval,issesh state change triggered useeffect');
        console.log(`issesh ${isSesh}, seshVal ${seshVal}, breakVal ${breakVal}, curr ${curr}`);
        if (isSesh)
            setCurr(seshVal*60);
        else
            setCurr(breakVal*60);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[seshVal,breakVal]);

    //in charge of what to do when curr passes certain threshold
    useEffect(()=>{
        //5 seconds left, play blinking animation
        if (curr===5) {
            console.log('animation');
        }
        //timers up, play alarm
        else if (curr===0) {
            audio.current.currentTime=0;
            audio.current.play();
        }
        //last second up, swap timer phase
        else if (curr<0) {
            const nextState=!isSesh;
            stopTimer();
            setIsSesh(nextState);
            setCurr(nextState?seshVal*60:breakVal*60);
            startTimer();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[curr]);

    return (
        <Box height="100%" width="100%" id="bg">
        <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={0}
                id="app">
            <Grid
                container
                spacing={0}
                direction="row"
                justify="center"
                alignItems="center"
                id="ctrl">
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
            </Grid>
            <Display isSesh={isSesh}
                isPause={timeItems.expTimeLapse===0}
                value={clock(curr)}
                rawVal={curr}
                handleTimerAction={handleTimerAction}
                handleReset={handleReset} />
            <audio 
                className="alarmSound" 
                id="beep" 
                ref={audio}
                src="https://github.com/MatchaCrisp/pomodoro/blob/main/src/alarms/chime.mp3?raw=true" />
        </Grid>
        </Box>
    )
}
export default App;