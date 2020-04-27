import { makeStyles } from '@material-ui/core/styles';
import BackgroundImg from 'src/assets/img/landscape_background.png';

const contactStyles = makeStyles((theme) => ({

  contactWrapper: {
    background: `url(${BackgroundImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  container: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    marginTop: '400px',
    marginBottom: '100px',
    padding: theme.spacing(1, 2),
    paddingBottom: theme.spacing(5),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1),
    },
},
  paper: {
    background: 'none',
    flexGrow: 1,
    alignItems: 'center',
  },
  contact: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    padding: theme.spacing(1),

  },
  contactIcons : {
    marginRight: '5px',
  }
  
}));

export default contactStyles;
