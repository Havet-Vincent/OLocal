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
    alignItems: 'baseline',
  },
  MToolbar: {
    display: 'flex',
    flexFlow: 'column wrap',
  },
  MToolbarLink: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  selectField: {
    fontSize: '.9em',
  },
  textField: {
    paddingTop: '1rem',
  },
  listNav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  formControl: {
    margin: theme.spacing(0, 2),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(1, 0),
    },
  },
  searchSelect: {
    width: 220,
  },

}));

export default shopkeeperProfilPageStyles;
