// == Import npm
import React from 'react';

// == Import components
import { Container, Typography } from '@material-ui/core';

// == Import assets & styles
import planDuSiteStyles from './planDuSiteStyles';

// == Composant
const PlanDuSite = () => {
  const classes = planDuSiteStyles();
  return (
    <section className={classes.planDuSite}>
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" component="h1" gutterBottom>
          Plan du site
        </Typography>

      </Container>
    </section>
  );
};

// == Export
export default PlanDuSite;
