import React from 'react';
import {Button, Typography} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';

const useStyles=makeStyles({
    digital: {
        fontFamily:'Orbitron, sans-serif',
        fontSize:'1.5rem',
        margin:'10px 0 10px 0'
    },
    label: {
        fontFamily:'Roboto, sans-serif',
        marginBottom:'10px'
    },
    butt: {
        fontSize:'0.75rem',
        margin:'0 10px 0 10px'
    },
    time: {
        position:'relative',
        margin:'5px auto 15px auto',
        height:'2rem',
        width:'200px'
    },
    inactive: {
        display:'none'
    },
    pulser1: {
        position:'absolute',
        left:'0',
        right:'0',
        top:'-10px',
        marginLeft:'auto',
        marginRight:'auto',
        animation:'pulse1 1s infinite'
    },
    pulser2: {
        position:'absolute',
        left:'0',
        right:'0',
        top:'-10px',
        marginLeft:'auto',
        marginRight:'auto',
        animation:'pulse2 1s infinite'
    },
    pulser3: {
        position:'absolute',
        left:'0',
        right:'0',
        top:'-10px',
        marginLeft:'auto',
        marginRight:'auto',
        animation:'pulse3 1s infinite'
    }

});
//needs from props:
//isSesh=boolean:session or break
//isPause=boolean:state of clock
//value=string:time left
//handleTimerAction=fn():start/pause click event
//handleReset=reset whole thing click event
const Display = props => {
    const classes=useStyles(props);
    return (
        <Box align="center" id="disp">
            <Typography id="timer-label" className={classes.label}>{props.isSesh?'session':'break'}</Typography>
            <Box className={classes.time}>
                <Typography className={`${(!props.isPause&&props.rawVal<=5)?classes.pulser1:classes.inactive} ${classes.digital}`}>{props.value}</Typography>
                <Typography className={`${(!props.isPause&&props.rawVal<=5)?classes.pulser2:classes.inactive} ${classes.digital}`}>{props.value}</Typography>
                <Typography className={`${(!props.isPause&&props.rawVal<=5)?classes.pulser3:classes.inactive} ${classes.digital}`}>{props.value}</Typography>
                <Typography className={classes.digital} id="time-left">{props.value}</Typography>
            </Box>
            <Button 
                id="start_stop" 
                onClick={props.handleTimerAction}
                variant="contained"
                disableElevation
                size="small"
                className={classes.butt}>{props.isPause?'start':'pause'}</Button>
            <Button 
                id="reset" 
                onClick={props.handleReset}
                variant="outlined"
                disableElevation
                size="small"
                className={classes.butt}>reset</Button>
        </Box>
    )
}

export default Display;