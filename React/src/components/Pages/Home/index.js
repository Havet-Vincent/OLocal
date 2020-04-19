// == Import npm
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// == Import components
import {
  Grid,
  Paper,
} from '@material-ui/core';
import Loader from 'src/components/Loader';
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
  const loader = loadingRegions || loadingCategories;

  useEffect(() => {
    getRegionsData();
    getCategoriesData();
  }, []);

  return (
    <>
      <Loader loader={loader} />
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
