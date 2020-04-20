import React, { useState } from 'react';

import { getUniqueCategories, getProductsByCategory } from 'src/utils/selectors';

// == Import components
import {
  TextField,
  Container,
  Paper,
  Box,
  Avatar,
  Typography,
  Button,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Grid,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Chip,
  TextareaAutosize,
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BusinessIcon from '@material-ui/icons/Business';

import shopkeeper from './dataShop';

// == Import assets & styles
import shopkeeperProfilStyles from './shopkeeperProfilStyles';

// == Import API server config
const server = require('src/api.config.json');


// == Composant
const ShopkeeperProfil = () => {
  const classes = shopkeeperProfilStyles();

  // Temp state (redux)
  const [currentCategory, setCurrentCategory] = useState({ id: 1, name: 'Fruits' });

  // state
  const [categorySelect, setCategorySelect] = useState(currentCategory.id);
  const [expanded, setExpanded] = useState(false);

  // Filter unique categories for Select
  const categories = shopkeeper.catalogs.map((catalog) => {
    return catalog.product.category;
  });
  const uniqueCategories = getUniqueCategories(categories);

  // Filter products for selected category
  const products = shopkeeper.catalogs.map((catalog) => {
    return { ...catalog.product, localSupplier: catalog.localSupplier };
  });
  const productsByCategory = getProductsByCategory(products, categorySelect);

  const MenuProps = {
    PaperProps: {
      style: {
        // sub-menu size
        maxHeight: 300,
        maxWidth: 320,
      },
    },
  };

  const handleChangeExpand = (panel) => (isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleChangeCategory = (event) => {
    setCategorySelect(event.target.value);
  };

  return (
    <>
      <Container className={classes.shopkeeperProfilContent} component="main" maxWidth="lg">
        <Box className={classes.cardDetails}>
          <Paper>
            <Typography variant="h4" component="h1" gutterBottom>
              Vos informations
            </Typography>
            <Avatar className={classes.avatar} alt={server.companyName} src={`${server.url}:${server.port}${shopkeeper.logoPicture}`} />
            <Typography variant="h4" component="h3" gutterBottom>
              {shopkeeper.companyName}
            </Typography>
            <Typography variant="h6" component="h4" gutterBottom>
              siret : {shopkeeper.siret}
            </Typography>
            <Typography variant="subtitle2" component="p">
              {`
                  ${shopkeeper.wayNumber ? shopkeeper.wayNumber : ''}
                  ${shopkeeper.repeatIndex ? shopkeeper.repeatIndex : ''}
                  ${shopkeeper.wayName ? shopkeeper.wayName : ''}
                  ${shopkeeper.additionalAddress ? `- ${shopkeeper.additionalAddress}` : ''}
                  ${shopkeeper.postalCode ? `- ${shopkeeper.postalCode}` : ''}
                  ${shopkeeper.city ? shopkeeper.city.toUpperCase() : ''}
                `}
            </Typography>
          </Paper>
        </Box>
        <Box>
          <form>
            <TextField
              id="email"
              label={shopkeeper.email ? shopkeeper.email : ''}
              className={classes.textField}
              type="email"
              name="email"
              autoComplete={shopkeeper.email}
              margin="dense"
              variant="outlined"
              helperText="Email"
            />
            <TextField
              id="website"
              label={shopkeeper.website ? shopkeeper.website.replace(/(^\w+:|^)\/\//, '') : ''}
              className={classes.textField}
              type="text"
              name="website"
              autoComplete="site web"
              margin="dense"
              variant="outlined"
              helperText="Nom site Web"

            />
            <TextField
              id="phone"
              label={shopkeeper.phone ? shopkeeper.phone : ''}
              className={classes.textField}
              type="text"
              name="phone"
              autoComplete={shopkeeper.phone}
              margin="dense"
              variant="outlined"
              helperText="N° de téléphone"

            />
          </form>
        </Box>
        <Paper className={classes.shopkeeperProducts} elevation={0}>
          <Typography variant="h6" component="h4" gutterBottom>
            Ajout article
          </Typography>
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
          <FormControl variant="outlined" className={classes.formControl} size="small">
            <InputLabel id="search-produit">Produit</InputLabel>
            <Select
              fullWidth
              className={classes.regionsSelect}
              label="produit"
              labelId="search-produit"
              id="search-produit"
              value={categorySelect}
              onChange={handleChangeCategory}
              MenuProps={MenuProps}
            >
              {uniqueCategories.map((category) => (
                <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl} size="small">
            <InputLabel id="search-supplier">Producteurs</InputLabel>
            <Select
              fullWidth
              className={classes.regionsSelect}
              label="Producteur"
              labelId="search-supplier"
              id="search-supplier"
              value={categorySelect}
              onChange={handleChangeCategory}
              MenuProps={MenuProps}
            >
              {uniqueCategories.map((category) => (
                <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Paper>
        <Paper>
          <Typography variant="h6" component="h4" gutterBottom>
            vos articles par catégories
          </Typography>
        </Paper>

        <Paper className={classes.shopkeeperProducts} elevation={0}>
          <FormControl variant="outlined" className={classes.formControl} size="small">
            <InputLabel id="search-category">Catégorie de produits</InputLabel>
            <Select
              fullWidth
              className={classes.regionsSelect}
              label="Catégorie de produits proposés"
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
            <Typography variant="h6" component="h5" gutterBottom>
              Mes produits  proposés :
            </Typography>
            {productsByCategory.map((product) => (
              <ExpansionPanel
                className={classes.expansionPanel}
                expanded={expanded === `panel${product.id}`}
                key={product.id}
                onChange={handleChangeExpand(`panel${product.id}`)}
              >
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${product.id}-content`}
                  id={`panel${product.id}-header`}
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
          <Typography variant="h6" component="h4" gutterBottom>
            Description de votre compagnie :
          </Typography>
          <TextareaAutosize
            aria-label="description-companyName"
            defaultValue={shopkeeper.companyDescription}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Enregister
          </Button>
        </Paper>
      </Container>
    </>
  );
};


// == Export
export default ShopkeeperProfil;
