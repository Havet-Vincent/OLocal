// == Import npm
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import EllipsisText from 'react-ellipsis-text';
import { Link as RouterLink, Redirect } from 'react-router-dom';

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
  Tooltip,
} from '@material-ui/core';
import BusinessIcon from '@material-ui/icons/Business';
import LocationSearchingRoundedIcon from '@material-ui/icons/LocationSearchingRounded';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

// == Import styles
import shopkeepersListStyles from './shopkeepersListStyles';

// == Composant
const ShopkeepersList = ({
  currentCategory,
  currentRegion,
  searchResults,
}) => {
  // console.log(currentCategory, currentRegion, searchResults);
  const classes = shopkeepersListStyles();
  const nbResults = searchResults.length;

  useEffect(() => {
    document.title = `o'Local - Recherche de ${currentCategory.name} en ${currentRegion.name}`;
  }, []);

  return (
    <>
      {nbResults === 0 && (
        <Redirect to="/" push />
      )}
      <Grid container className={classes.shopkeepersListWrapper}>
        <Paper className={classes.shopkeepersListContent} elevation={2} square>
          <div className={classes.shopkeepersListNav}>
            <Tooltip title="Retour à l'accueil" aria-label="retour-accueil" placement="top">
              <IconButton edge="start" color="primary" component={RouterLink} to="/">
                <ArrowBackIcon fontSize="large" color="action" />
              </IconButton>
            </Tooltip>
            <Chip
              color="secondary"
              icon={<LocationSearchingRoundedIcon />}
              label={nbResults === 1 ? `${nbResults} Résultat` : `${nbResults} Résultats`}
            />
          </div>
          <Typography variant="h4" component="h1" className={classes.shopkeepersListTitle} gutterBottom>
            Liste des commerçants de la région <span>{currentRegion.name}</span> <br />
            <Typography variant="h5" component="strong" className={classes.shopkeepersListSubtitle} gutterBottom>
              proposants des produits de la catégorie <span>{currentCategory.name}</span>
            </Typography>
          </Typography>
          <ul className={classes.cardListWrapper}>
            {searchResults.map((item) => (
              <Card key={item.id} className={classes.cardWrapper} elevation={3} component="li">
                <CardMedia
                  className={classes.cardImg}
                  image={`${process.env.URL_API}${item.logoPicture}`}
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
                      label={`${item.postalCode} - ${item.city}`}
                      className={classes.cardSubtitle}
                    />
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p" className={classes.cardDescription}>
                    <EllipsisText
                      text={item.companyDescription ? item.companyDescription : ''}
                      length={400}
                    />
                  </Typography>
                  <Tooltip title="Voir la page commercant" aria-label="page-commercant" placement="top">
                    <Button
                      className={classes.cardLink}
                      variant="contained"
                      size="small"
                      color="primary"
                      component={RouterLink}
                      to={`/commercant/${item.id}`}
                    >
                      Voir plus
                    </Button>
                  </Tooltip>
                </CardContent>
              </Card>
            ))}
          </ul>
        </Paper>
      </Grid>
    </>
  );
};

ShopkeepersList.propTypes = {
  searchResults: PropTypes.array.isRequired,
  currentCategory: PropTypes.object.isRequired,
  currentRegion: PropTypes.object.isRequired,
};

// == Export
export default ShopkeepersList;
