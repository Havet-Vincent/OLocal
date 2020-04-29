import { makeStyles } from '@material-ui/core/styles';
import BackgroundImg from 'src/assets/img/background_contact.png';

const contactStyles = makeStyles((theme) => ({

  contactWrapper: {
    background: `url(${BackgroundImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    flexGrow: 1,
    height: '100%',
    width: '100%',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
  },
  container: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 280,
    marginBottom: '8rem',
    width: 420,
    paddingBottom: theme.spacing(5),
    paddingLeft: theme.spacing(6),
    [theme.breakpoints.down('md')]: {
      marginTop: 250,
      width: '70%',
      height: 300,
      paddingLeft: theme.spacing(9.5),
    },
    [theme.breakpoints.down('sm')]: {
      width: '70%',
      marginTop: 200,
      padding: theme.spacing(1),
      paddingLeft: theme.spacing(3.6),
    },
  },
  paper: {
    background: 'none',
    flexGrow: 1,
    alignItems: 'center',
  },
  title: {
    fontWeight: 700,
    padding: theme.spacing(0, 4, 1, 4),
    width: '100%',
    margin: '0 auto',
    [theme.breakpoints.down('lg')]: {
      fontSize: '1.8em',
    },
    [theme.breakpoints.down('md')]: {
      width: '50%',
      margin: '0 auto',
    },
    [theme.breakpoints.down('sm')]: {
      width: '50%',
      fontSize: '1.55em',
      margin: '0 auto',
      padding: theme.spacing(0, 2, 0, 4),
    },
    [theme.breakpoints.down('xs')]: {
      width: '80%',
      fontSize: '1.5em',
      margin: '0 auto',
      padding: theme.spacing(0, 0, 0, 1.2),
    },
  },
  contact: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    padding: theme.spacing(1),

  },
  contactIcons: {
    marginRight: '5px',
  },
}));

export default contactStyles;
