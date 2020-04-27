import { makeStyles } from '@material-ui/core/styles';
import BackgroundImg from 'src/assets/img/landscape_background.png';

const shopkeeperProfilPageStyles = makeStyles((theme) => ({
  shopkeeperProfilPageWrapper: {
    background: `url(${BackgroundImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  shopkeeperProfilPageContent: {
    backgroundColor: 'rgba(247, 249, 250, .95)',
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    padding: theme.spacing(1, 2),
    paddingBottom: theme.spacing(5),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1),
    },
  },
  shopkeeperProfilPageContainer: {
    background: 'none',
    width: '100%',
    height: '100%',
  },
  shopkeeperProfilPageTitle: {
    color: '#37474f',
    fontSize: '1.6em',
    fontWeight: '700',
    margin: theme.spacing(2, 1, 3, 1),
  },
  MToolbarWrapper: {
    width: '100%',
    backgroundColor: 'rgba(76, 175, 80, .45)',
    display: 'flex',
    flexFlow: 'row wrap',
    flexDirection: 'row reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  MToolbar: {
    display: 'flex',
    flexFlow: 'column wrap',
  },
  addProduct: {
    backgroundColor: theme.palette.text.secondary,
    color: 'rgba(247, 249, 250, .8)',
    padding: theme.spacing(0.3, 1.6, 0.3, 1),
    '&:hover': {
      backgroundColor: 'rgba(81, 96, 81, .9)',
    },
  },
  MToolbarLink: {
    fontSize: '.9em',
    color: theme.palette.text.secondary,
    fontWeight: 700,
    textTransform: 'capitalize',
    textDecoration: 'underline',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginRight: theme.spacing(2),
  },
  selectField: {
    fontSize: '.9em',
  },
  textField: {
    paddingTop: '1rem',
  },
  formControl: {
    margin: theme.spacing(2, 0, 3, 0),
    width: '100%',
  },
  searchSelect: {
    width: '100%',
  },

}));

export default shopkeeperProfilPageStyles;
