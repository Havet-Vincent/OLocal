import React, { useState } from 'react';

// == Import components
import {
  Link,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardHeader,
  Container,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import CallIcon from '@material-ui/icons/Call';
import WebIcon from '@material-ui/icons/Web';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// == Import Selectors
import { getUniqueCategories, getProductsByCategory } from 'src/utils/selectors';

import shop from './dataShop';

// == Import assets & styles
import shopkeeperStyles from './shopkeeperStyles';

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
    <>
      <Container className={classes.cardGrid} maxWidth="lg">
        <Grid className={classes.root}>
          <Card className={classes.card}>
            <CardHeader
              title={shop.companyName}
              titleTypographyProps={{ align: 'center', variant: 'h3'}}
              className={classes.cardHeader}
            />
            <CardMedia
              className={classes.cardMedia}
              image="../uploads/frontoffice1.jpg"
              title="commerce"
            />
            <CardContent className={classes.cardContent}>
              <Grid className={classes.gridLink}>
                <Link display="block" variant="body1" href="#" key={shop.website}>
                  <Grid container direction="row" spacing={1} alignItems="center">
                    <Grid item>
                      <WebIcon />
                    </Grid>
                    <Grid item>{shop.website}</Grid>
                  </Grid>
                </Link>
                <Link display="block" variant="body1" href="#" key={shop.phone}>
                  <Grid container direction="row" spacing={1} alignItems="center">
                    <Grid item>
                      <CallIcon />
                    </Grid>Container
                    <Grid item>{shop.phone}</Grid>
                  </Grid>
                </Link>
                <Link display="block" variant="body1" href="#" key={shop.email}>
                  <Grid container direction="row" spacing={1} alignItems="center">
                    <Grid item>
                      <ContactMailIcon />
                    </Grid>
                    <Grid item>{shop.email}</Grid>
                  </Grid>
                </Link>
              </Grid>
              <Grid container direction="row" spacing={1} alignItems="center">
                <Grid item>
                  <LocationCityIcon />
                </Grid>
                <Grid className={classes.gridAdress}>
                  {shop.wayNumber}
                  {shop.repeatIndex}
                  {shop.wayType}
                  {shop.wayName}
                  {shop.additionalAddress}
                  {shop.postalCode}
                  {shop.city}
                </Grid>
                <br />
                <br />
              </Grid>
              <Typography variant="body2" color="textSecondary">
                {shop.companyDescription}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <FormControl variant="outlined" className={classes.formControl}>
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
            <ExpansionPanel expanded={expanded === `panel${product.id}`} key={product.id} onChange={handleChangeExpand(`panel${product.id}`)}>
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
      </Container>
    </>
  );
};


// == Export
export default Shopkeeper;
