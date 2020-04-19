// == Import npm
import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';

// == Import components
import Container from '@material-ui/core/Container';
import Header from '../../containers/Header';
import Pages from '../../containers/Pages';
import Footer from '../Footer';

// == Import styles
import appTheme from './appTheme';
import appStyles from './appStyles';

// == Composant
const App = () => {
  const classes = appStyles();
  return (
    <ThemeProvider theme={appTheme}>
      <Container className={classes.wrapper}>
        <Header />
        <Pages />
        <Footer />
      </Container>
    </ThemeProvider>
  );
};

// == Export
export default App;
