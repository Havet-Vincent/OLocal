import React, { useState } from 'react';
import PropTypes from 'prop-types';
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

// == Import assets & styles
import shopkeeperStyles from './shopkeeperStyles';

// == Import API server config
const server = require('src/api.config.json');

// == Composant
const Shopkeeper = ({ shopkeeper, currentCategory, uniqueCategories, productsByCategory }) => {
  // console.log(shopkeeper);
  const classes = shopkeeperStyles();

  // Local state
  const [expanded, setExpanded] = useState(false);
  const [categorySelect, setCategorySelect] = useState(currentCategory.id);

  const handleChangeExpand = (panel) => (isExpanded) => {
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
        <Paper className={classes.shopkeeperDescription} elevation={0}>
          <Box className={classes.shopkeepersListNav}>
            <IconButton color="primary" component={RouterLink} to="/liste-commercants">
              <ArrowBackIcon fontSize="large" color="action" />
            </IconButton>
            <IconButton color="primary" component={RouterLink} to="/">
              <HomeRoundedIcon fontSize="large" color="action" />
            </IconButton>
          </Box>
          <Card className={classes.cardWrapper} elevation={0}>
            <Typography variant="h4" component="h1" className={classes.cardHeader} gutterBottom>
              {shopkeeper.companyName}
            </Typography>
            <Container className={classes.card}>
              <Box className={classes.cardDetails}>
                <CardMedia
                  className={classes.cardMedia}
                  image={`${server.url}:${server.port}${shopkeeper.logoPicture}`}
                  title="commerce"
                />
                <Paper className={classes.root} elevation={0}>
                  <Link variant="body1" href={shopkeeper.website}>
                    <Chip
                      icon={<WebIcon className={classes.chipIcon} />}
                      label={shopkeeper.website ? shopkeeper.website.replace(/(^\w+:|^)\/\//, '') : ''}
                      className={classes.chip}
                    />
                  </Link>
                  <Link variant="body1" href={`tel:${shopkeeper.phone}`}>
                    <Chip
                      icon={<CallIcon className={classes.chipIcon} />}
                      label={shopkeeper.phone}
                      className={classes.chip}
                    />
                  </Link>
                  <Link variant="body1" href={`mailto:${shopkeeper.email}`}>
                    <Chip
                      icon={<ContactMailIcon className={classes.chipIcon} />}
                      label={shopkeeper.email}
                      className={classes.chip}
                    />
                  </Link>
                  <Card className={classes.chipAdress} elevation={0}>
                    <CardContent className={classes.chipContent}>
                      <IconButton aria-label="location" className={classes.chipIconAdress} size="medium">
                        <RoomRoundedIcon />
                      </IconButton>
                      <Typography variant="subtitle2" component="p">
                        {`
                          ${shopkeeper.wayNumber ? shopkeeper.wayNumber : ''}
                          ${shopkeeper.repeatIndex ? shopkeeper.repeatIndex : ''}
                          ${shopkeeper.wayName ? shopkeeper.wayName : ''}
                          ${shopkeeper.additionalAddress ? '- '+shopkeeper.additionalAddress : ''}
                          ${shopkeeper.postalCode ? '- '+shopkeeper.postalCode : ''}
                          ${shopkeeper.city ? shopkeeper.city.toUpperCase() : ''}
                        `}
                      </Typography>
                    </CardContent>
                  </Card>
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
                      Nos produits proposés :
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
                </Paper>
              </Paper>
            </Container>
          </Card>
        </Paper>
      </Container>
    </Grid>
  );
};

Shopkeeper.propTypes = {
  shopkeeper: PropTypes.object.isRequired,
  currentCategory: PropTypes.object.isRequired,
};

// == Export
export default Shopkeeper;
