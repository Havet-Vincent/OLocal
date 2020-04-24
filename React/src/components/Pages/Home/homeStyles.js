import { makeStyles } from '@material-ui/core/styles';
import BackgroundImg from '../../../assets/img/landscape_background.png';

const homeStyles = makeStyles((theme) => ({
  searchWrapper: {
    background: `url(${BackgroundImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  searchContent: {
    backgroundColor: 'rgba(247, 249, 250, .85)',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing(35, 0),
    padding: theme.spacing(0, 5),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(10, 0),
      padding: theme.spacing(0, 4),
    },
  },
  aboutWrapper: {
    margin: 0,
  },
  aboutContent: {
    backgroundColor: 'rgba(159, 204, 62, .85)',
    padding: theme.spacing(4),
  },
}));

export default homeStyles;
