/* eslint-disable max-len */
// == Import npm
import React from 'react';

// == Import components
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from '@material-ui/core';

// == Import styles
import NicoleImg from '../../../../assets/img/nicole.svg';
import BernardImg from '../../../../assets/img/bernard.svg';
import aboutStyles from './aboutStyles';

// == Composant
const About = () => {
  const classes = aboutStyles();

  return (
    <Container className={classes.aboutWrapper}>
      <Typography variant="h5" component="h1" className={classes.aboutTitle}>
        Bienvenue  sur <span className={classes.aboutTitleSecondary}>o</span>&#x27;Local
      </Typography>
      <div className={classes.aboutIntro}>
        <Typography variant="body1" align="center" color="textSecondary" component="p">
          Créé en 2020, o&#x27;Local a pour objectif de mettre à disposition des consommateurs un moyen de connaître les commerçants de proximité proposant des produits issus de producteurs locaux.
        </Typography>
        <Typography variant="body1" align="center" color="textSecondary" component="p">
          o&#x27;Local a pour but de réunir les différentes adresses des commerçants proche de chez vous, vous donnant la possibilité d&#x27;obtenir divers articles au même endroit. Ainsi, nous privilégions une réduction des déplacements nécessaires pour faire ses achats.
        </Typography>
        <Typography variant="body1" align="center" color="textSecondary" component="p">
          Nous tenons à valoriser les produits de nos terroirs et à contribuer à une consommation plus saine, éco-responsable, tout en encourageant l&#x27;économie locale.
        </Typography>
      </div>
      <Card className={classes.cardWrapper} elevation={0}>
        <CardMedia
          className={classes.cardImg}
          image={NicoleImg}
          title="Illustration Louise"
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h6" component="h2">
            Hello ! Moi c&#x27;est Louise
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Je cherche des commerces dans ma région proposant des produits locaux.
          </Typography>
        </CardContent>
      </Card>
      <Card className={classes.cardWrapper} elevation={0}>
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h6" component="h2">
            Bonjour. Je suis Bernard
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Je cherche à promouvoir les produits locaux vendus dans ma boutique et gagner en visibilité au sein de ma région.
          </Typography>
        </CardContent>
        <CardMedia
          className={classes.cardImg}
          image={BernardImg}
          title="Illustration Bernard"
        />
      </Card>
    </Container>
  );
};

// == Export
export default About;
