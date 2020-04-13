// == Import npm
import React from 'react';

import { Route } from 'react-router-dom';

import { ThemeProvider } from '@material-ui/core/styles';

// == Import components
import Container from '@material-ui/core/Container';
import Header from '../Header';
import Footer from '../Footer';
import LegalNotices from '../Pages/LegalNotices';

// == Import assets & styles
import appTheme from './appTheme';
import appStyles from './appStyles';

// == Composant
const App = () => {
  const classes = appStyles();
  return (
    <ThemeProvider theme={appTheme}>
      <div className="app">
        <Container fixed className={classes.container}>
          <Header />
          <Route exact path="/mentions-légales">
            <LegalNotices />
          </Route>
          <Footer />
        </Container>
      </div>
    </ThemeProvider>
  );
};

// == Export
export default App;
