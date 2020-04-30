import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

// == Import components
import {
  Paper,
  Button,
  Breadcrumbs,
  Tooltip,
} from '@material-ui/core';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';

// == Import styles
import navbarShopkeeperProfilStyles from './navbarShopkeeperProfilStyles';

// == Composant
const NavbarShopkeeperProfil = () => {
  const classes = navbarShopkeeperProfilStyles();
  const { pathname } = useLocation();

  const breadcrumbNameMap = {
    '/': 'Accueil',
    '/commercant/profil/informations': 'Informations',
    '/commercant/profil/page': 'Mes produits',
  };
  const currentPage = breadcrumbNameMap[pathname];

  useEffect(() => {
    document.title = `o'Local - Profil / ${currentPage}`;
  }, []);

  return (
    <Paper elevation={0} className={classes.navbarShopkeeber}>
      <Breadcrumbs
        aria-label="profil-navigation"
        classes={{
          ol: classes.navbarNavOl,
        }}
      >
        <Tooltip title="Retour à l'accueil" aria-label="retour-accueil" placement="top">
          <Button
            color="inherit"
            component={RouterLink}
            className={classes.navbarButton}
            to="/"
          >
            <HomeRoundedIcon color="action" className={classes.navbarHome} />
          </Button>
        </Tooltip>
        <Button
          size="small"
          color={currentPage === 'Informations' ? 'primary' : 'inherit'}
          className={classes.navbarButton}
          component={RouterLink}
          to="/commercant/profil/informations"
          aria-current="page"
        >
          Informations
        </Button>
        <Button
          size="small"
          color={currentPage === 'Mes produits' ? 'primary' : 'inherit'}
          className={classes.navbarButton}
          component={RouterLink}
          to="/commercant/profil/page"
          aria-current="page"
        >
          Mes produits
        </Button>
      </Breadcrumbs>
    </Paper>
  );
};

// == Export
export default NavbarShopkeeperProfil;
