/* eslint-disable max-len */
// == Import npm
import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// == Import components
import {
  Grid,
  Paper,
  Typography,
  Box,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';

// == Import styles
import notFoundStyles from './notFoundStyles';
import './notFound.scss';

// == Composant
const NotFound = () => {
  const classes = notFoundStyles();

  useEffect(() => {
    document.title = 'o\'Local - Erreur 404 La page demandée n\'existe pas';
  }, []);

  return (
    <Grid container className={classes.notFoundWrapper}>
      <Paper className={classes.clouds} elevation={0}>
        <Box className="x1">
          <Box className="cloud" />
        </Box>
        <Box className="x2">
          <Box className="cloud" />
        </Box>
        <Box className="x3">
          <Box className="cloud" />
        </Box>
        <Box className="x4">
          <Box className="cloud" />
        </Box>
        <Box className="x5">
          <Box className="cloud" />
        </Box>
      </Paper>
      <Paper className={classes.error} elevation={0}>
        <Box className="notfound">
          <span>4</span>
          <span>0</span>
          <span>4</span>
        </Box>
        <Paper className={classes.notFoundContent} elevation={0} square>
          <Typography color="textSecondary" className={classes.notFoundTitle} component="p" gutterBottom>
            La page demandée est introuvable
          </Typography>
          <Typography color="textSecondary" className={classes.notFoundSubtitle} component="p">
            Vous pouvez rester contempler ce beau paysage ou bien retourner à la page d'acceuil en passant par la petite maison ...
          </Typography>
          <Tooltip title="Retour à l'accueil" aria-label="retour-accueil" placement="bottom">
            <IconButton component={RouterLink} to="/">
              <HomeRoundedIcon className={classes.homeIcon} />
            </IconButton>
          </Tooltip>
        </Paper>
      </Paper>
    </Grid>
  );
};

// == Export
export default NotFound;
