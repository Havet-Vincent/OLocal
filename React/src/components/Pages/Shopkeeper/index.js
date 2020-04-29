import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink, useParams } from 'react-router-dom';

// == Import components
import {
  Tooltip,
  Link,
  Grid,
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Paper,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Chip,
} from '@material-ui/core';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import CallIcon from '@material-ui/icons/Call';
import WebIcon from '@material-ui/icons/Web';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import RoomRoundedIcon from '@material-ui/icons/RoomRounded';
import BusinessIcon from '@material-ui/icons/Business';
import NotFound from 'src/components/Pages/NotFound';
import Loader from 'src/components/Loader';

// == Import styles
import shopkeeperStyles from './shopkeeperStyles';

// == Composant
const Shopkeeper = ({
  notMatch,
  loader,
  shopkeeper,
  productsCategoryId,
  uniqueCategories,
  productsByCategory,
  getShopkeeperData,
  changeProductsCategory,
  clearShopkeeperData,
}) => {
  // console.log('productsByCategory:', productsByCategory);
  const classes = shopkeeperStyles();
  // Get id from url param for fetch shopkeeper data
  const { id } = useParams();

  // Local state
  const [expanded, setExpanded] = useState(false);

  // First render => fetch data
  useEffect(() => {
    getShopkeeperData(id);
  }, []);

  // When Unmounted => clear data
  useEffect(() => () => clearShopkeeperData(),
    []);

  const handleChangeExpand = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleChangeCategory = (event) => {
    changeProductsCategory(event.target.value);
  };

  const MenuProps = {
    PaperProps: {
      style: {
        // sub-menu size
        maxHeight: 300,
        maxWidth: 320,
      },
    },
  };

  // Google Map format address
  // eslint-disable-next-line no-useless-concat
  const shopkeeperMapAddress = 'https://maps.google.fr/maps?f=q&hl=fr&geocode=&q=' + `${shopkeeper.wayNumber ? shopkeeper.wayNumber : ''} ${shopkeeper.repeatIndex ? shopkeeper.repeatIndex : ''}+${shopkeeper.wayType ? shopkeeper.wayType : ''} ${shopkeeper.wayName}+${shopkeeper.additionalAddress ? `${shopkeeper.additionalAddress}` : ''}+${shopkeeper.postalCode}+${shopkeeper.city}`;

  return (
    <>
      {!notMatch && (
        <>
          <Loader loader={loader} />
          {!loader && (
            <Grid container className={classes.shopkeeperWrapper}>
              <Container className={classes.shopkeeperContent}>
                <Paper className={classes.shopkeeperDescription} elevation={0}>
                  <Box className={classes.shopkeepersListNav}>
                    <Tooltip title="Revenir à la recherche" aria-label="retour-recherche" placement="top">
                      <IconButton color="primary" component={RouterLink} to="/liste-commercants">
                        <ArrowBackIcon fontSize="large" color="action" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Retour à l'accueil" aria-label="retour-accueil" placement="top">
                      <IconButton color="primary" component={RouterLink} to="/">
                        <HomeRoundedIcon fontSize="large" color="action" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <Card className={classes.cardWrapper} elevation={0}>
                    <Typography variant="h4" component="h1" className={classes.cardHeader} gutterBottom>
                      {shopkeeper.companyName}
                    </Typography>
                    <Container className={classes.card}>
                      <Box className={classes.cardDetails}>
                        <CardMedia
                          className={classes.cardMedia}
                          image={shopkeeper.logoPicture}
                          title={`Image de ${shopkeeper.companyName}`}
                        />
                        <Paper className={classes.root} elevation={0}>
                          {shopkeeper.website && (
                            <Tooltip title="Site web commerçant" aria-label="site-web-commercant" placement="top">
                              <Chip
                                classes={{
                                  root: classes.chip,
                                  label: classes.chipLabel,
                                }}
                                icon={<WebIcon className={classes.chipIcon} />}
                                component="a"
                                href={shopkeeper.website}
                                label={shopkeeper.website ? shopkeeper.website.replace(/(^\w+:|^)\/\//, '') : ''}
                                clickable
                                target="_blank"
                                rel="noopener noreferrer"
                              />
                            </Tooltip>
                          )}
                          {shopkeeper.phone && (
                            <Tooltip title="Téléphone contact commerçant" aria-label="telephone-contact-commercant" placement="top">
                              <Chip
                                classes={{
                                  root: classes.chip,
                                  label: classes.chipLabel,
                                }}
                                icon={<CallIcon className={classes.chipIcon} />}
                                component="a"
                                href={`tel:${shopkeeper.phone}`}
                                label={shopkeeper.phone}
                                clickable
                              />
                            </Tooltip>
                          )}
                          <Tooltip title="Email contact commerçant" aria-label="email-contact-commercant" placement="top">
                            <Chip
                              classes={{
                                root: classes.chip,
                                label: classes.chipLabel,
                              }}
                              icon={<ContactMailIcon className={classes.chipIcon} />}
                              component="a"
                              href={`mailto:${shopkeeper.email}`}
                              label={shopkeeper.email}
                              clickable
                            />
                          </Tooltip>
                          <Tooltip title="Adresse commerçant" aria-label="adresse-commercant" placement="top">
                            <Card className={classes.chipAdress} elevation={0}>
                              <CardContent className={classes.chipContent}>
                                <Link
                                  href={shopkeeperMapAddress}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={classes.chipAdressLink}
                                >
                                  <RoomRoundedIcon className={classes.chipIconAdress} />
                                  {`
                                    ${shopkeeper.wayNumber ? shopkeeper.wayNumber : ''}
                                    ${shopkeeper.repeatIndex ? shopkeeper.repeatIndex : ''}
                                    ${shopkeeper.wayType ? shopkeeper.wayType : ''}
                                    ${shopkeeper.wayName ? shopkeeper.wayName : ''}
                                    ${shopkeeper.additionalAddress ? `- ${shopkeeper.additionalAddress}` : ''}
                                    ${shopkeeper.postalCode ? `- ${shopkeeper.postalCode}` : ''}
                                    ${shopkeeper.city ? shopkeeper.city.toUpperCase() : ''}
                                  `}
                                </Link>
                              </CardContent>
                            </Card>
                          </Tooltip>
                        </Paper>
                      </Box>
                      <Paper className={classes.cardProducts} elevation={2}>
                        <CardContent className={classes.cardContent} elevation={0}>
                          <Typography variant="h6" component="h5" gutterBottom>
                            Description :
                          </Typography>
                          <Typography variant="body1" color="textSecondary">
                            {shopkeeper.companyDescription}
                          </Typography>
                        </CardContent>
                        <Paper className={classes.shopkeeperProducts} elevation={0}>
                          {productsCategoryId && (
                            <FormControl variant="outlined" className={classes.formControl}>
                              <InputLabel id="search-category">Catégorie de produits</InputLabel>
                              <Select
                                fullWidth
                                className={classes.regionsSelect}
                                label="Catégorie de produits proposés"
                                labelId="search-category"
                                id="search-category"
                                value={uniqueCategories.length > 0 ? productsCategoryId : ''}
                                onChange={handleChangeCategory}
                                MenuProps={MenuProps}
                              >
                                {uniqueCategories.map((category) => (
                                  <MenuItem
                                    key={category.id}
                                    value={category.id}
                                  >
                                    {category.name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          )}
                          <Grid className={classes.root}>
                            <Typography variant="h6" component="h5" gutterBottom>
                              Les produits proposés :
                            </Typography>
                            {productsByCategory.map((product, index) => (
                              <ExpansionPanel
                                className={classes.expansionPanel}
                                expanded={expanded === `panel${index}`}
                                key={product.id}
                                onChange={handleChangeExpand(`panel${index}`)}
                              >
                                <ExpansionPanelSummary
                                  expandIcon={<ExpandMoreIcon />}
                                  aria-controls={`panel${index}-content`}
                                  id={`panel${index}-header`}
                                >
                                  <Typography className={classes.heading}>
                                    {product.name}
                                  </Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails className={classes.expensionPanelDetails}>
                                  <Box className={classes.secondaryHeading}>
                                    <Typography variant="body2" className={classes.localSupplierTitle}>
                                      Producteur:
                                    </Typography>
                                  </Box>
                                  <Box className={classes.localSupplierAddress}>
                                    <Typography variant="body1" color="primary" gutterBottom>
                                      {product.localSupplier.name}
                                    </Typography>
                                    <Chip
                                      variant="outlined"
                                      color="primary"
                                      component="em"
                                      icon={<BusinessIcon />}
                                      label={`${product.localSupplier.postalCode} - ${product.localSupplier.city.toUpperCase()}`}
                                    />
                                  </Box>
                                </ExpansionPanelDetails>
                              </ExpansionPanel>
                            ))}
                          </Grid>
                        </Paper>
                      </Paper>
                    </Container>
                  </Card>
                </Paper>
              </Container>
            </Grid>
          )}
        </>
      )}
      {notMatch && (
        <NotFound />
      )}
    </>
  );
};

Shopkeeper.propTypes = {
  notMatch: PropTypes.bool.isRequired,
  loader: PropTypes.bool.isRequired,
  shopkeeper: PropTypes.object.isRequired,
  productsCategoryId: PropTypes.number,
  uniqueCategories: PropTypes.array.isRequired,
  productsByCategory: PropTypes.array.isRequired,
  getShopkeeperData: PropTypes.func.isRequired,
  changeProductsCategory: PropTypes.func.isRequired,
  clearShopkeeperData: PropTypes.func.isRequired,
};

Shopkeeper.defaultProps = {
  productsCategoryId: null,
};

// == Export
export default Shopkeeper;
