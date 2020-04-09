// == Import npm
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import BackgroundImg from '../../assets/img/landscape_background.png';

// == Import
import Header from '../Header';
import './app.scss';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
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
    <div className="app">
      <Container className={classes.container}>
        <Header />
      </Container>
    </div>
  );
};

// == Export
export default App;
