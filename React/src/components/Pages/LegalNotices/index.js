/* eslint-disable max-len */
// == Import npm
import React from 'react';

// == Import components
import {
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';

// == Import styles
import legalNoticesStyles from './legalNoticesStyles';

// == Composant
const LegalNotices = () => {
  const classes = legalNoticesStyles();
  return (
    <Grid container component="section" className={classes.LegalNoticeWrapper}>
      <Paper className={classes.LegalNoticeContent} elevation={2} square>
        <Typography variant="h4" align="center" component="h1" gutterBottom>
          Mentions légales
        </Typography>
        <Typography variant="subtitle2" align="center" color="textSecondary" component="p" gutterBottom>
          En vigeur au 30/04/2020
        </Typography>

        <Typography variant="body2" align="left" color="textSecondary" component="p" gutterBottom>
          Conformément aux dispositions des Articles 6-III et 19 de la Loi n°2004-575 du 21 juin 2004 pour la Confiance dans l’économie numérique, dite L.C.E.N., il est porté à la connaissance des Utilisateurs du site olocal.com les présentes mentions légales.
        </Typography>

        <Typography variant="body2" align="left" color="textSecondary" component="p" gutterBottom>
          La connexion et la navigation sur le site (oLocal) par l’Utilisateur implique acceptation intégrale et sans réserve des présentes mentions légales.
          Ces dernières sont accessibles sur le site à la rubrique « Mentions légales ».
        </Typography>

        <Typography variant="body2" align="left" color="textSecondary" component="p" gutterBottom>
          Ces dernières sont accessibles sur le site à la rubrique « Mentions légales ».
        </Typography>


        <Typography variant="h5" align="left" component="h3">
          ARTICLE 1 : L’éditeur
        </Typography>

        <Typography variant="body2" align="left" color="textSecondary" component="p" gutterBottom>
          L'édition du site olocal.com est assurée par la Société SARL O'Clock au capital de 15000 euros, immatriculée au RCS de 818 614 588 sous le numéro 818 614 588 00023 dont le siège social est situé à 18, rue des imaginaires Paris 75021, adresse e-mail : olocal.mail@gmail.com.
        </Typography>

        <Typography variant="body2" align="left" color="textSecondary" component="p" gutterBottom>
          Le Directeur de la publication est Havet Vincent
        </Typography>

        <Typography variant="h5" align="left" component="h3">
          ARTICLE 2 : L’hébergeur
        </Typography>

        <Typography variant="body2" align="left" color="textSecondary" component="p" gutterBottom>
          L'hébergeur du site olocal.com est la Société AWS, dont le siège social est situé à Seattle USA , avec le numéro de téléphone : xx,xx,xx,xx,xx.
        </Typography>

        <Typography variant="h5" align="left" component="h3">
          ARTICLE 3 : Accès au site
        </Typography>

        <Typography variant="body2" align="left" color="textSecondary" component="p" gutterBottom>
          Le site est accessible par tout endroit, 7j/7, 24h/24 sauf cas de force majeure, interruption programmée ou non et pouvant découlant d’une nécessité de maintenance.
        </Typography>

        <Typography variant="body2" align="left" color="textSecondary" component="p" gutterBottom>
          En cas de modification, interruption ou suspension des services le site olocal.com ne saurait être tenu responsable.
        </Typography>

        <Typography variant="h5" align="left" component="h3">
          ARTICLE 4 : Collecte des données
        </Typography>

        <Typography variant="body2" align="left" color="textSecondary" component="p" gutterBottom>
          Le site est exempté de déclaration à la Commission Nationale Informatique et Libertés (CNIL) dans la mesure où il ne collecte aucune donnée concernant les utilisateurs.
        </Typography>

        <Typography variant="h5" align="left" component="h3">
          ARTICLE 5 : Cookies
        </Typography>

        <Typography variant="body2" align="left" color="textSecondary" component="p" gutterBottom>
          L’Utilisateur est informé que lors de ses visites sur le site, un cookie peut s’installer automatiquement sur son logiciel de navigation.
        </Typography>
        <Typography variant="body2" align="left" color="textSecondary" component="p" gutterBottom>
          En naviguant sur le site, il les accepte.
        </Typography>
        <Typography variant="body2" align="left" color="textSecondary" component="p" gutterBottom>
          Un cookie est un élément qui ne permet pas d’identifier l’Utilisateur mais sert à enregistrer des informations relatives à la navigation de celui-ci sur le site Internet. L’Utilisateur pourra désactiver ce cookie par l’intermédiaire des paramètres figurant au sein de son logiciel de navigation.
        </Typography>

        <Typography variant="h5" align="left" component="h3">
          ARTICLE 6 : Propriété intellectuelle
        </Typography>

        <Typography variant="body2" align="left" color="textSecondary" component="p" gutterBottom>
          Toute utilisation, reproduction, diffusion, commercialisation, modification de toute ou partie du site olocal.com, sans autorisation de l’Éditeur est prohibée et pourra entraîner des actions et poursuites judiciaires telles que notamment prévues par le Code de la propriété intellectuelle et le Code civil.
        </Typography>
      </Paper>
    </Grid>
  );
};

// == Export
export default LegalNotices;
