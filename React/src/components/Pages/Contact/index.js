// == Import npm
import React from 'react';

import AddIcCallOutlinedIcon from '@material-ui/icons/AddIcCallOutlined';
import AddLocationOutlinedIcon from '@material-ui/icons/AddLocationOutlined';
import ContactMailOutlinedIcon from '@material-ui/icons/ContactMailOutlined';
// == Import components
import { Grid, Container, Typography } from '@material-ui/core';

// == Import assets & styles
import contactStyles from './contactStyles';

// == Composant
const Contact = () => {
  const classes = contactStyles();
  return (
    <section className={classes.contact}>
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" component="h1" gutterBottom>
          Pour nous contacter, c'est simple !
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <AddIcCallOutlinedIcon />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" component="p" gutterBottom>
              (+33).6.06.06.06.06
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <AddLocationOutlinedIcon />
          </Grid>
          <Grid item xs={4}>
            <Typography>o'Local</Typography>
            <Typography variant="body2" align="left" color="textSecondary" component="p" gutterBottom>
              18, rue des imaginaires
              <br />
              75021 Paris France
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <ContactMailOutlinedIcon />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" component="p" gutterBottom>
              atlantis@oclock.io
            </Typography>
          </Grid>
        </Grid>


      </Container>
    </section>
  );
};

// == Export
export default Contact;
