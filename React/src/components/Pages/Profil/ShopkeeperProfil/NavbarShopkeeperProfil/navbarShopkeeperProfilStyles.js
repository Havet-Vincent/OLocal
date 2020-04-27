import { makeStyles } from '@material-ui/core/styles';

const navbarShopkeeperProfilStyles = makeStyles((theme) => ({
  navbarShopkeeber: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    background: 'none',
  },
  navbarNavOl: {
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      flexDirection: 'column',
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
    },
  },
}));

export default navbarShopkeeperProfilStyles;
