// == Import npm
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// == Import components
import {
  Grid,
  Paper,
  Backdrop,
  CircularProgress,
  Snackbar,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Search from 'src/containers/Home/Search';
import About from './About';

// == Import assets & styles
import homeStyles from './homeStyles';

// Search Snackbar Alert & transition effect
const Alert = (props) => (
  <MuiAlert elevation={6} variant="filled" {...props} />
);

// == Composant
const Home = ({
  loadingRegions,
  loadingCategories,
  getRegionsData,
  getCategoriesData,
  snackbar,
  snackbarType,
  snackbarMessage,
  resetSnackbar,
}) => {
  const classes = homeStyles();
  const displayLoader = loadingRegions || loadingCategories;

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    resetSnackbar();
  };

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
      <Snackbar
        open={snackbar}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={snackbarType}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
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
  snackbar: PropTypes.bool.isRequired,
  snackbarType: PropTypes.string.isRequired,
  snackbarMessage: PropTypes.string.isRequired,
  resetSnackbar: PropTypes.func.isRequired,
};

// == Export
export default Home;
