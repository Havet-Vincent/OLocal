import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// == Import components
import {
  Link,
  Grid,
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardHeader,
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
import LocationCityIcon from '@material-ui/icons/LocationCity';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

// == Import Selectors
import { getUniqueCategories, getProductsByCategory } from 'src/utils/selectors';

import shop from './dataShop';

// == Import assets & styles
import shopkeeperStyles from './shopkeeperStyles';

// == Import API server config
const server = require('src/api.config.json');


// == Composant
const Shopkeeper = () => {
  const classes = shopkeeperStyles();

  // Temp state (redux)
  const [currentCategory, setCurrentCategory] = useState({ id: 1, name: 'Fruits' });

  // state
  const [expanded, setExpanded] = useState(false);
  const [categorySelect, setCategorySelect] = useState(currentCategory.id);

  // Filter unique categories for Select
  const categories = shop.catalogs.map((catalog) => {
    return catalog.product.category;
  });
  const uniqueCategories = getUniqueCategories(categories);

  // Filter products for selected category
  const products = shop.catalogs.map((catalog) => {
    return { ...catalog.product, localSupplier: catalog.localSupplier };
  });
  const productsByCategory = getProductsByCategory(products, categorySelect);


  const handleChangeExpand = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleChangeCategory = (event) => {
    setCategorySelect(event.target.value);
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

  return (
    <Grid container className={classes.shopkeeperWrapper}>
      <Container className={classes.shopkeeperContent}>
        <Paper className={classes.shopkeeperDescription} elevation={2}>
          <Box className={classes.shopkeepersListNav}>
            <IconButton edge="start" color="primary" component={RouterLink} to="/">
              <ArrowBackIcon fontSize="large" color="action" />
            </IconButton>
          </Box>
          <Card elevation={0}>
            <CardHeader
              title={shop.companyName}
              titleTypographyProps={{ align: 'center', variant: 'h4' }}
              component="h1"
              className={classes.cardHeader}
            />
            <Container className={classes.card}>
              <Box className={classes.cardDetails}>
                <CardMedia
                  className={classes.cardMedia}
                  image={`${server.url}:${server.port}${shop.logoPicture}`}
                  title="commerce"
                />
                <Paper className={classes.root} elevation={0}>
                  <Link variant="body1" href={shop.website}>
                    <Chip
                      icon={<WebIcon className={classes.chipIcon} />}
                      label={shop.website}
                      className={classes.chip}
                    />
                  </Link>
                  <Link variant="body1" href={`tel:${shop.phone}`}>
                    <Chip
                      icon={<CallIcon className={classes.chipIcon} />}
                      label={shop.phone}
                      className={classes.chip}
                    />
                  </Link>
                  <Link variant="body1" href={`mailto:${shop.email}`}>
                    <Chip
                      icon={<ContactMailIcon className={classes.chipIcon} />}
                      label={shop.email}
                      className={classes.chip}
                    />
                  </Link>
                  <Typography component="p" variant="body2" className={classes.chipAdress}>
                    <LocationCityIcon />
                    {`
                      ${shop.wayNumber}
                      ${shop.repeatIndex}
                      ${shop.wayType}
                      ${shop.wayName}
                      ${shop.additionalAddress}
                      ${shop.postalCode}
                      ${shop.city}
                    `}
                  </Typography>
                </Paper>
              </Box>
              <Box className={classes.cardProducts}>
                <CardContent className={classes.cardContent} elevation={0}>
                  <Typography variant="body1" color="textSecondary">
                    {shop.companyDescription}
                  </Typography>
                </CardContent>
                <Paper className={classes.shopkeeperProducts} elevation={0}>
                  <FormControl variant="outlined" className={classes.formControl} size="small">
                    <InputLabel id="search-category">Catégorie de produits</InputLabel>
                    <Select
                      fullWidth
                      className={classes.regionsSelect}
                      label="Catégorie de produits"
                      labelId="search-category"
                      id="search-category"
                      value={categorySelect}
                      onChange={handleChangeCategory}
                      MenuProps={MenuProps}
                    >
                      {uniqueCategories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Grid className={classes.root}>
                    <Typography variant="h6" component="h5">
                      Liste des produits
                    </Typography>

                    {productsByCategory.map((product) => (
                      <ExpansionPanel
                        size="small"
                        expanded={expanded === `panel${product.id}`}
                        key={product.id}
                        onChange={handleChangeExpand(`panel${product.id}`)}
                      >
                        <ExpansionPanelSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls={`panel${product.id}-content`}
                          id={`panel${product.id}-header`}
                        >
                          <Typography className={classes.heading}>{product.name}</Typography>
                          {/* <Typography className={classes.secondaryHeading}>{supplier.city}</Typography> */}
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                          <Typography>
                            {`Producteur: ${product.localSupplier.name}`}
                          </Typography>
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                    ))}
                  </Grid>
                </Paper>
              </Box>
            </Container>
          </Card>
        </Paper>
      </Container>
    </Grid>
  );
};


// == Export
export default Shopkeeper;
