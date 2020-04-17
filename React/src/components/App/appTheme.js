import { createMuiTheme } from '@material-ui/core/styles';
import { green, red, blue } from '@material-ui/core/colors';

const appTheme = createMuiTheme({
  typography: {
    fontFamily: ['Noto Sans TC', 'sans-serif'],
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
  palette: {
    primary: green,
    secondary: red,
    info: blue,
    type: 'light',

    // primary: {
    //   main: '#1EA4E9',
    // },
    // secondary: {
    //   main: '#44C868',
    // },
    // secondary: {
    //   light: '',
    //   main: '',
    //   dark: '',
    //   contrastText: '',
    // },
  },
});

export default appTheme;
