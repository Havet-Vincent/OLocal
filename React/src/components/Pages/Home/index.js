// == Import npm
import React, { useEffect } from 'react';

// == Import components
// == Import components
import { Grid, Paper } from '@material-ui/core';
import Search from 'src/containers/Home/Search';
import About from './About';

// == Import assets & styles
import homeStyles from './homeStyles';

// == Composant
const Home = ({ getRegionsData, getCategoriesData }) => {
  const classes = homeStyles();

  useEffect(() => {
    getRegionsData();
    getCategoriesData();
  }, []);

  return (
    <>
      <Grid container className={classes.searchWrapper}>
        <Grid item xs={12} sm={10} lg={8}>
          <Paper className={classes.searchContent} elevation={3}>
            <Search />
          </Paper>
        </Grid>
      </Grid>
      <Grid container className={classes.aboutWrapper}>
        <Grid item xs={12}>
          <Paper className={classes.aboutContent} elevation={0} square>
            <About />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

// == Export
export default Home;
