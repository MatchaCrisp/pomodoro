import React from 'react';
import {IconButton, Typography} from '@material-ui/core';
import {makeStyles} from'@material-ui/core/styles';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Box from '@material-ui/core/Box';
const useStyles=makeStyles({
    digital: {
        fontFamily:'Orbitron, sans-serif',
        fontSize:'1.5rem',
        margin:'10px 0 10px 0'
    },
    label: {
        fontFamily:'Roboto, sans-serif',
        marginBottom:'10px'
    }
    
});
//needs from props
//id=string: used for setting id of component elements (therefore must be unique)
//label=string: displayed name of the component
//value=int:displayed value of the component
//handleInc=fn():increment displayed value
//handledec=fn():decrement displayed value
const Ticker=props=>{  
    const classes=useStyles(props);
    return (
        <Box align="center">
            <Typography id={`${props.id}-label`} className={classes.label}>
                {props.label}
            </Typography>
            <IconButton onClick={props.handleInc}
                id={`${props.id}-increment`}>
                    <ArrowDropUpIcon 
                        fontSize='large'/>
            </IconButton>
            <Typography id={`${props.id}-length`} className={classes.digital}>
                {props.value}
            </Typography>
            <IconButton onClick={props.handleDec}
                id={`${props.id}-decrement`}>
                    <ArrowDropDownIcon 
                        fontSize='large'/>
            </IconButton>
        </Box>
    )
}

export default Ticker;