// == Import npm
import React from 'react';
import PropTypes from 'prop-types';

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
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

// == Import assets & styles
import shopkeepersListStyles from './shopkeepersListStyles';

// == Import API server config
const server = require('src/api.config.json');

// == Composant
const ShopkeepersList = ({ searchResults }) => {
  console.log(searchResults);
  const classes = shopkeepersListStyles();

  return (
    <Grid container className={classes.shopkeepersListWrapper}>
      <Paper className={classes.shopkeepersListContent} elevation={2}>
        <IconButton edge="start" color="primary">
          <ArrowBackIcon fontSize="large" color="action"/>
        </IconButton>
        <Typography variant="h4" component="h1" className={classes.shopkeepersListTitle} gutterBottom>
          Liste des commerçants de la région "region" <br />
          <Typography variant="h5" component="strong" className={classes.shopkeepersListSubtitle} gutterBottom>
            proposants des produits de la catégorie "catégorie"
          </Typography>
        </Typography>
        <ul>
          {searchResults.map((item) => (
            <Card key={item.id} className={classes.cardWrapper} elevation={3} component="li">
              <CardMedia
                className={classes.cardImg}
                image="https://cdn.pixabay.com/photo/2016/11/23/15/14/shelf-1853439_960_720.jpg"
                // image={`${server.url}:${server.port}${item.logoPicture}`}
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
                    label={`${item.postalCode} - ${item.city}`} className={classes.cardSubtitle} />
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" className={classes.cardDescription}>
                  {item.companyDescription}
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
};

// == Export
export default ShopkeepersList;
