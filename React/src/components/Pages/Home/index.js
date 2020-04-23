// == Import npm
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// == Import components
import {
  Grid,
  Paper,
} from '@material-ui/core';
import Search from 'src/containers/Home/Search';
import About from './About';

// == Import styles
import homeStyles from './homeStyles';

// == Composant
const Home = ({
  getRegionsData,
  getCategoriesData,
}) => {
  const classes = homeStyles();

  useEffect(() => {
    getRegionsData();
    getCategoriesData();
  }, []);

  return (
    <>
      <Grid container className={classes.searchWrapper}>
        <Grid item>
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

Home.propTypes = {
  getRegionsData: PropTypes.func.isRequired,
  getCategoriesData: PropTypes.func.isRequired,
};

// == Export
export default Home;
