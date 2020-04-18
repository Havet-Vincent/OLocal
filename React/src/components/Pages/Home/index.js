// == Import npm
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// == Import components
import {
  Grid,
  Paper,
  Backdrop,
  CircularProgress,
} from '@material-ui/core';
import Search from 'src/containers/Home/Search';
import About from './About';

// == Import assets & styles
import homeStyles from './homeStyles';

// == Composant
const Home = ({
  loadingRegions,
  loadingCategories,
  getRegionsData,
  getCategoriesData,
}) => {
  const classes = homeStyles();
  const displayLoader = loadingRegions || loadingCategories;

  useEffect(() => {
    getRegionsData();
    getCategoriesData();
  }, []);

  return (
    <>
      <Grid container className={classes.searchWrapper}>
        <Grid item xs={10} md={9} sm={8}>
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
      <Backdrop className={classes.backdrop} open={displayLoader}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

Home.propTypes = {
  loadingRegions: PropTypes.bool.isRequired,
  loadingCategories: PropTypes.bool.isRequired,
  getRegionsData: PropTypes.func.isRequired,
  getCategoriesData: PropTypes.func.isRequired,
};

// == Export
export default Home;
