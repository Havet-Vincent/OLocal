// == Import npm
import React from 'react';
import PropTypes from 'prop-types';
import EllipsisText from "react-ellipsis-text";
import { Link as RouterLink } from 'react-router-dom';

// == Import components
import {
  Grid,
  Paper,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Button,
  IconButton,
} from '@material-ui/core';
import BusinessIcon from '@material-ui/icons/Business';
import LocationSearchingRoundedIcon from '@material-ui/icons/LocationSearchingRounded';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

// == Import assets & styles
import shopkeepersListStyles from './shopkeepersListStyles';

// == Import API server config
const server = require('src/api.config.json');

// == Composant
const ShopkeepersList = ({ currentCategory, currentRegion, searchResults }) => {
  console.log(currentCategory, currentRegion, searchResults);
  const classes = shopkeepersListStyles();

  return (
    <Grid container className={classes.shopkeepersListWrapper}>
      <Paper className={classes.shopkeepersListContent} elevation={2}>
        <div className={classes.shopkeepersListNav}>
          <IconButton edge="start" color="primary" component={RouterLink} to="/">
            <ArrowBackIcon fontSize="large" color="action"/>
          </IconButton>
          <Chip
              color="secondary"
              icon={<LocationSearchingRoundedIcon />}
              label={`${searchResults.length} Résultats`}
            />
          </div>
          <Typography variant="h4" component="h1" className={classes.shopkeepersListTitle} gutterBottom>
            Liste des commerçants de la région <span>{currentRegion.name}</span> <br />
            <Typography variant="h5" component="strong" className={classes.shopkeepersListSubtitle} gutterBottom>
              proposants des produits de la catégorie <span>{currentCategory.name}</span>
            </Typography>
          </Typography>
        <ul>
          {searchResults.map((item) => (
            <Card key={item.id} className={classes.cardWrapper} elevation={3} component="li">
              <CardMedia
                className={classes.cardImg}
                image={`${server.url}:${server.port}${item.logoPicture}`}
                title={`Image de présentation de ${item.companyName}`}
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h6" component="h2" className={classes.cardTitle}>
                  {item.companyName}
                  <Chip
                    variant="outlined"
                    color="primary"
                    component="em"
                    icon={<BusinessIcon />}
                    label={`${item.postalCode} - ${item.city}`} className={classes.cardSubtitle}
                  />
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" className={classes.cardDescription}>
                  <EllipsisText
                    text={item.companyDescription}  
                    length={400} 
                  />   
                </Typography>
                <Button variant="contained" size="small" color="primary" component="a" className={classes.cardLink}>
                  Voir plus
                </Button>
              </CardContent>
            </Card>
          ))}
        </ul>
      </Paper>
    </Grid>
  );
};

ShopkeepersList.propTypes = {
  searchResults: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      postalCode: PropTypes.number.isRequired,
      city: PropTypes.string.isRequired,
      companyName: PropTypes.string.isRequired,
      companyDescription: PropTypes.string.isRequired,
      logoPicture: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  currentCategory: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  currentRegion: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

// == Export
export default ShopkeepersList;
