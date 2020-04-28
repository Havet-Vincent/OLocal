import { makeStyles } from '@material-ui/core/styles';

const navbarShopkeeperProfilStyles = makeStyles((theme) => ({
  navbarShopkeeber: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    background: 'none',
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(1),
    },
  },
  navbarHome: {
    [theme.breakpoints.down('xs')]: {
      margin: 0,
    },
  },
  navbarNavOl: {
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  navbarButton: {
    textTransform: 'inherit',
    fontSize: '1.2em',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1em',
      padding: 0,
      minWidth: 0,
    },
  },
}));

export default navbarShopkeeperProfilStyles;
