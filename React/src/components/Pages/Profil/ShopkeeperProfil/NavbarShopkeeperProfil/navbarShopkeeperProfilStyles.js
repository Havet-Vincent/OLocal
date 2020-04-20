import { makeStyles } from '@material-ui/core/styles';
//import BackgroundImg from '../../../assets/img/landscape_background.png';

const navbarShopkeeperProfilStyles = makeStyles((theme) => ({

  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },

  margin: {
    margin: theme.spacing(1),
  },

}));

export default navbarShopkeeperProfilStyles;
