import { makeStyles } from '@material-ui/core/styles';
import BackgroundImg from '../../../assets/img/landscape_background.png';

const shopkeeperProfilStyles = makeStyles((theme) => ({


  shopkeeperWrapper: {
    background: `url(${BackgroundImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    height: '100%',
},

  cardMedia: {
    width: '100%',
    height: 350,
    borderRadius: 5,
    [theme.breakpoints.down('xs')]: {
      height: 250,
    },
  },
  avatar: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  shopkeeperProducts: {
    background: 'none',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: theme.spacing(3),
    paddingBottom: theme.spacing(5)
  },


}));

export default shopkeeperProfilStyles;
