import React from 'react';
import {Button, Typography} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';
import useTxtStyles from '../hooks/useTxtStyles';
import { ThemeProvider } from '@material-ui/styles';
import buttTheme from '../Themes/buttTheme';

const useStyles=makeStyles({
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
    },
    shifter: {
        animation:'shift 1s infinite'
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
    const txtClasses=useTxtStyles(props);
    return (
        <Box align="center" id="disp">
            <Typography id="timer-label" className={txtClasses.label}>{props.isSesh?'session':'break'}</Typography>
            <Box className={classes.time}>
                <Typography className={`${(!props.isPause&&props.rawVal<=5)?classes.pulser1:classes.inactive} ${txtClasses.digital}`}>{props.value}</Typography>
                <Typography className={`${(!props.isPause&&props.rawVal<=5)?classes.pulser2:classes.inactive} ${txtClasses.digital}`}>{props.value}</Typography>
                <Typography className={`${(!props.isPause&&props.rawVal<=5)?classes.pulser3:classes.inactive} ${txtClasses.digital}`}>{props.value}</Typography>
                <Typography className={`${(!props.isPause&&props.rawVal<=5)?classes.shifter:''} ${txtClasses.digital}`} id="time-left">{props.value}</Typography>
            </Box>
            <ThemeProvider theme={buttTheme}>
                <Button 
                    id="start_stop" 
                    onClick={props.handleTimerAction}
                    variant="contained"
                    disableElevation
                    className={classes.butt}
                    color="primary">{props.isPause?'start':'pause'}</Button>
                <Button 
                    id="reset" 
                    onClick={props.handleReset}
                    variant="outlined"
                    disableElevation
                    className={classes.butt}
                    color="primary">reset</Button>
            </ThemeProvider>
        </Box>
    )
}

export default Display;