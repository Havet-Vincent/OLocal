// == Import npm
import React from 'react';

// == Import components
// == Import components
import { Grid, Paper } from '@material-ui/core';
import Search from './Search';
import About from './About';

// == Import assets & styles
import homeStyles from './homeStyles';

// == Composant
const Home = () => {
  const classes = homeStyles();
  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} sm={10} lg={8}>
        <Paper className={classes.search} elevation={3}>
          <Search />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.about} elevation={0} square>
          <About />
        </Paper>
      </Grid>
    </Grid>
  );
};

// == Export
export default Home;
