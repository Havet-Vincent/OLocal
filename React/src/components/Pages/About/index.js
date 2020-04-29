/* eslint-disable max-len */
// == Import npm
import React from 'react';

// == Import components
import {
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardHeader,
} from '@material-ui/core';

// == Import styles
import aboutStyles from './aboutStyles';

// == Composant
const About = () => {
  const classes = aboutStyles();

  return (
    <Grid container component="section" className={classes.aboutWrapper}>
      <Paper className={classes.aboutContent} elevation={2} square>
        <Typography variant="h4" align="center" component="h1" gutterBottom>
          Qui sommes-nous ?
        </Typography>
        <Typography color="textSecondary" variant="subtitle2" align="center" component="p" gutterBottom>
          Étudiants au sein de l’institut de formation O’Clock, nous mettons en place ce site web dans le cadre de notre projet de fin d’études.
          Nous avons fait le choix du projet O’Local car il correspond à notre éthique, aux enjeux économiques et aux défis environnementaux actuels. C’est pourquoi, nous avons voulu mettre à profit nos compétences fraîchement acquises dans un projet qui nous tient vraiment à coeur de mener à bien.
        </Typography>
        <Typography className={classes.cardPosTitle} variant="h5" align="center" component="p" gutterBottom>
          Notre équipe :
        </Typography>
        <Typography className={classes.cardPos} variant="h6" align="center" component="p" color="textSecondary">
          Front-end
        </Typography>
        <Grid container className={classes.containerGrid}>
          <Card className={classes.cardGrid} elevation={3}>
            <CardHeader
              title="Olivier GONNET"
              subheader="Git Master"
              titleTypographyProps={{ align: 'center' }}
              subheaderTypographyProps={{ align: 'center' }}
              className={classes.cardHeader}
            />
            <CardContent className={classes.cardContent}>
              <Typography className={classes.cardPos} color="textPrimary" variant="body1" component="p">
                Originaire de Bourgogne, Olivier est sensible à la promotion des produits du terroir et pas que le vin, on est d&apos;accord!
              </Typography>
            </CardContent>
          </Card>
          <Card className={classes.cardGrid} elevation={3}>
            <CardHeader
              title="Vincent HAVET"
              subheader="Lead Dev Front"
              titleTypographyProps={{ align: 'center' }}
              subheaderTypographyProps={{ align: 'center' }}
              className={classes.cardHeader}
            />
            <CardContent>
              <Typography className={classes.cardPos} color="textPrimary" variant="body1">
                Amateur de fraises gariguettes, Vincent a pour credo de consommer local et aussi de saison.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <br />
        <Typography className={classes.cardPos} variant="h6" align="center" component="p" color="textSecondary">
          Back-end
        </Typography>
        <Grid container className={classes.containerGrid}>
          <Card className={classes.cardGrid} elevation={3}>
            <CardHeader
              title="Nicolas CHOPIN"
              subheader="Product Owner et Lead Dev Back"
              titleTypographyProps={{ align: 'center' }}
              subheaderTypographyProps={{ align: 'center' }}
              className={classes.cardHeader}
            />
            <CardContent>
              <Typography className={classes.cardPos} color="textPrimary" variant="body1" component="p">
                Jardinier à ses heures perdues et grand ami des bêtes, Nicolas est l&apos;initiateur de ce projet.
              </Typography>
            </CardContent>
          </Card>
          <Card className={classes.cardGrid} elevation={3}>
            <CardHeader
              title="Leila MOHAMMED"
              subheader="Scrum Master"
              titleTypographyProps={{ align: 'center' }}
              subheaderTypographyProps={{ align: 'center' }}
              className={classes.cardHeader}
            />
            <CardContent>
              <Typography className={classes.cardPos} color="textPrimary" variant="body1">
                Desperate Housewife overbookée, Leila est soucieuse de proposer à ses enfants une alimentation de qualité.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Paper>
    </Grid>
  );
};

// == Export
export default About;
