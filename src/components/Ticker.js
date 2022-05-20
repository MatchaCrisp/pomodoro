// external
// react
import React from 'react';
// material ui
import {IconButton, Typography} from '@material-ui/core';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Box from '@material-ui/core/Box';
import { ThemeProvider } from '@material-ui/styles';

// internal
// mui style/theme
import useTxtStyles from '../hooks/useTxtStyles';
import buttTheme from '../Themes/buttTheme';

//needs from props
//id=string: used for setting id of component elements (therefore must be unique)
//label=string: displayed name of the component
//value=int:displayed value of the component
//handleInc=fn():increment displayed value
//handledec=fn():decrement displayed value

// displays a number and up/down arrow
// up increments number
// down decrements number
const Ticker=props=>{  
    const txtClasses=useTxtStyles(props);
    return (
        <Box align="center" margin="1rem">
            <ThemeProvider theme={buttTheme}>
            <Typography id={`${props.id}-label`} className={txtClasses.label}>
                {props.label}
            </Typography>
            <IconButton onClick={props.handleInc}
                id={`${props.id}-increment`}
                color="primary">
                    <ArrowDropUpIcon 
                        fontSize='large'/>
            </IconButton>
            <Typography id={`${props.id}-length`} className={txtClasses.digital}>
                {props.value}
            </Typography>
            <IconButton onClick={props.handleDec}
                id={`${props.id}-decrement`}
                color="primary">
                    <ArrowDropDownIcon 
                        fontSize='large'/>
            </IconButton>
            </ThemeProvider>
        </Box>
    )
}

export default Ticker;