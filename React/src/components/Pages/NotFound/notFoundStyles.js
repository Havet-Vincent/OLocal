import { makeStyles } from '@material-ui/core/styles';
import BackgroundImg from 'src/assets/img/landscape_background.png';

const notFoundStyles = makeStyles((theme) => ({
  notFoundWrapper: {
    background: `url(${BackgroundImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  clouds: {
    background: 'none',
    bottom: '65%',
    left: 0,
    position: 'fixed',
    right: 0,
    top: '40px',
    zIndex: 1,
  },
  error: {
    textAlign: 'center',
    background: 'none',
    width: '100%',
    margin: 0,
  },
  notFoundContent: {
    background: 'none',
    padding: theme.spacing(0, 3),
    [theme.breakpoints.down('xs')]: {
      background: 'rgba(159, 204, 62, .85)',
      height: 340,
    },
  },
  notFoundTitle: {
    fontSize: '1.8em',
    fontWeight: 700,
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.2em',
      paddingTop: theme.spacing(2),
    },
  },
  notFoundSubtitle: {
    fontSize: '1.2em',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1em',
    },
  },
  homeIcon: {
    fontSize: 80,
    color: '#37474f',
    backgroundColor: theme.palette.primary.light,
    borderRadius: '50%',
    margin: theme.spacing(3),
    padding: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      fontSize: 65,
      margin: theme.spacing(1),
      padding: theme.spacing(1),
    },
  },
}));

export default notFoundStyles;
