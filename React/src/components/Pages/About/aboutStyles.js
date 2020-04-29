import { makeStyles } from '@material-ui/core/styles';
import BackgroundImg from 'src/assets/img/landscape_background.png';

const aboutStyles = makeStyles((theme) => ({
  aboutWrapper: {
    background: `url(${BackgroundImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  aboutContent: {
    width: '60%',
    backgroundColor: 'rgba(247, 249, 250, .95)',
    margin: 0,
    padding: theme.spacing(2, 4),
    [theme.breakpoints.down('lg')]: {
      width: '70%',
    },
    [theme.breakpoints.down('md')]: {
      width: '80%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '95%',
      padding: theme.spacing(1, 2),
    },
  },
  containerGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '100%',
    justifyContent: 'space-evenly',
    padding: 0,
    margin: theme.spacing(0, 1),
    [theme.breakpoints.down('sm')]: {
      margin: 0,
    },
  },
  cardGrid: {
    height: 250,
    width: 250,
    [theme.breakpoints.down('md')]: {
      margin: theme.spacing(1),
    },
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(2, 1),
    },
  },
  cardHeader: {
    backgroundColor: theme.palette.grey[300],
  },
  cardPos: {
    marginBottom: 12,
  },
  cardPosTitle: {
    marginTop: theme.spacing(2),
  },
}));

export default aboutStyles;
