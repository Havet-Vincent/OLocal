// == Import npm
import React from 'react';

// == Import components
// == Import components
import { Container } from '@material-ui/core';
import Search from './Search';

// == Import assets & styles
import homeStyles from './homeStyles';

// == Composant
const Home = () => {
  const classes = homeStyles();
  return (
    <Container>
      <div className={classes.searchMenu}>
        <Search />
      </div>
    </Container>
  );
};

// == Export
export default Home;
