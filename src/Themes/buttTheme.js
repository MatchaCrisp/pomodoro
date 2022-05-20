// external
// material ui
import { createMuiTheme } from "@material-ui/core";

// change mui color palette
const buttTheme=createMuiTheme({
    palette:{
        primary:{
            light: '#fffcf6',
            main: '#fffaed',
            dark: '#FAEBD7',
            contrastText: '#5a5a5a',
          },
        secondary: {
            light: '#E6E6E6',
            main: '#808080',
            dark: '#5a5a5a',
            contrastText: '#fffaed',
          },  
    }
});

export default buttTheme;