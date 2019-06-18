import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import moment from 'moment';
import 'moment/locale/es';

const theme = createMuiTheme({
    palette: {
        primary: { main: red['A700'] }, // Purple and green play nicely together.
        secondary: { main: grey[50] }, // This is just green.A700 as hex.
    },
    typography: {
        // In Japanese the characters are usually larger.
        fontSize: 13,
    },
});

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils} moment={moment} locale="es">
            <App />
        </MuiPickersUtilsProvider>
    </MuiThemeProvider>, document.getElementById('root')
);
