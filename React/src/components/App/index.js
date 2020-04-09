// == Import npm
import React from 'react';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import BackgroundImg from '../../assets/img/landscape_background.png';

// == Import
import Header from '../Header';
import './app.scss';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1EA4E9',
    },
    secondary: {
      main: '#44C868',
    },
    // secondary: {
    //   light: '',
    //   main: '',
    //   dark: '',
    //   contrastText: '',
    // },
  },
});

const useStyles = makeStyles(() => ({
  container: {
    maxWidth: '100%',
    minHeight: '100vh',
    background: `url(${BackgroundImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'top center',
  },
}));

// == Composant
const App = () => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <Container fixed className={classes.container}>
          <Header />
        </Container>
      </div>
    </ThemeProvider>
  );
};

// == Export
export default App;
