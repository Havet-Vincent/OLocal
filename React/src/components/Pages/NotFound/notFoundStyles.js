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
    height: '100%',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'flex-end',
    },
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
  },
  notFoundContent: {
    background: 'none',
    padding: theme.spacing(0, 3),
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(1),
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
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      fontSize: '1em',
      marginBottom: theme.spacing(1),
    },
  },
  homeIcon: {
    fontSize: 80,
    color: '#37474f',
    borderRadius: '50%',
    [theme.breakpoints.down('xs')]: {
      fontSize: 65,
    },
  },
}));

export default notFoundStyles;
