// == Import npm
import React from 'react';
import PropTypes from 'prop-types';

// == Import components
import {
  Container,
  Paper,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from '@material-ui/core';

// == Import assets & styles
import shopkeepersListStyles from './shopkeepersListStyles';

// == Composant
const ShopkeepersList = ({ searchResults }) => {
  console.log(searchResults);
  const classes = shopkeepersListStyles();

  return (
    <Container maxWidth="lg" className={classes.shopkeepersListWrapper}>
      <Paper className={classes.searchContent} elevation={2}>
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
                image={item.logoPicture}
                title={`Image de présentation de ${item.companyName}`}
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h6" component="h2">
                  {item.companyName}
                  <em>{`  ${item.postalCode} - ${item.city}`}</em>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {item.companyDescription}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </ul>
      </Paper>
    </Container>
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
