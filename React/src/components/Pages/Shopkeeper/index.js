import React from 'react';

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
} from '@material-ui/core';


import ContactMailIcon from '@material-ui/icons/ContactMail';
import CallIcon from '@material-ui/icons/Call';
import WebIcon from '@material-ui/icons/Web';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import shop from './dataShop';

// == Import assets & styles
import shopkeeperStyles from './shopkeeperStyles';


const suppliers = [
  {
    id: 2,
    name: 'De Sousa',
    city: 'GautierVille',
    codePostal: '97670',
  },
  {
    id: 3,
    name: 'Pereira',
    city: 'Rouxboeuf',
    codePostal: '26849',
  },
];


// == Composant
const Shopkeeper = () => {
  // console.log('page keeper');
  const classes = shopkeeperStyles();

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <Container className={classes.cardGrid} maxWidth="lg">
        <Grid className={classes.root}>
          <Card className={classes.card}>
            <CardHeader
              title={shop.company}
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
                <Grid item>{shop.additionalAddress}{shop.repeatIndex}{shop.wayNumber}</Grid>
                <br />
                <br />
              </Grid>
              <Typography variant="body2" color="textSecondary">
                {shop.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid className={classes.root}>
          <Typography variant="h6" component="h5">
            Liste des produits
          </Typography>

          {suppliers.map((supplier) => (
            <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
             >
                <Typography className={classes.heading}>{supplier.name}</Typography>
                <Typography className={classes.secondaryHeading}>{supplier.city}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  carottes poireaux
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
