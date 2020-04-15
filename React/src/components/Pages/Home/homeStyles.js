import { makeStyles } from '@material-ui/core/styles';
import BackgroundImg from '../../../assets/img/landscape_background.png';

const homeStyles = makeStyles((theme) => ({
  searchWrapper: {
    background: `url(${BackgroundImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPositionY: 'top',
    flexGrow: 1,
    justifyContent: 'center',
  },
  searchContent: {
    backgroundColor: 'rgba(247, 249, 250, .85)',
    borderRadius: 10,
    margin: theme.spacing(35, 0),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(12, 0),
    },
  },
  aboutWrapper: {
    margin: 0,
  },
  aboutContent: {
    backgroundColor: 'rgba(159, 204, 62, .85)',
    padding: theme.spacing(4),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default homeStyles;
