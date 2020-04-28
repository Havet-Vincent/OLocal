import { makeStyles } from '@material-ui/core/styles';
import BackgroundImg from 'src/assets/img/landscape_background.png';

const shopkeeperStyles = makeStyles((theme) => ({
  shopkeeperWrapper: {
    background: `url(${BackgroundImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    height: '100%',
  },
  shopkeepersListNav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shopkeeperContent: {
    backgroundColor: 'rgba(247, 249, 250, .95)',
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    padding: theme.spacing(1),
  },
  shopkeeperDescription: {
    background: 'none',
    width: '100%',
    height: '100%',
    padding: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1),
    },
  },
  shopkeeperProducts: {
    background: 'none',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: theme.spacing(3),
    paddingBottom: theme.spacing(5),
  },
  cardWrapper: {
    background: 'none',
    paddingBottom: theme.spacing(3),
    paddingLeft: 5,
    paddingRight: 5,
  },
  card: {
    padding: 0,
    background: 'none',
    height: '100%',
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'stretch',
    [theme.breakpoints.down('sm')]: {
      flexFlow: 'column nowrap',
    },
  },
  cardDetails: {
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  cardProducts: {
    width: '50%',
    marginLeft: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      margin: theme.spacing(3, 0),
    },
  },
  cardHeader: {
    width: '100%',
    color: '#37474f',
    fontSize: '1.8em',
    fontWeight: 700,
    textAlign: 'center',
    textTransform: 'capitalize',
    paddingTop: 0,
    paddingBottom: theme.spacing(2),
  },
  regionsSelect: {
    width: 250,
    [theme.breakpoints.down('sm')]: {
      width: 200,
    },
  },
  cardMedia: {
    width: '100%',
    height: 350,
    borderRadius: 5,
    [theme.breakpoints.down('xs')]: {
      height: 250,
    },
  },
  cardContent: {
    width: '100%',
    padding: theme.spacing(3),
  },
  expansionPanel: {
    backgroundColor: 'rgba(109, 112, 112, .08)',
    '&:before': {
      display: 'none',
    },
  },
  expensionPanelDetails: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-between',
  },
  heading: {
    textTransform: 'capitalize',
    flexBasis: '33.33%',
    flexShrink: 0,
    fontSize: '1.1em',
    fontWeight: 700,
  },
  secondaryHeading: {
    width: 'auto',
    textTransform: 'capitalize',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  root: {
    width: '100%',
    background: 'none',
  },
  formControl: {
    margin: '0 auto',
    marginBottom: theme.spacing(3),
  },
  chip: {
    color: theme.palette.primary.main,
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(1),
    background: 'none',
    padding: theme.spacing(2, 0),
    '&:hover': {
      background: 'none',
      textDecoration: 'underline',
    },
  },
  chipLabel: {
    overflow: 'inherit',
  },
  chipAdress: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    background: 'none',
    marginTop: theme.spacing(2),
  },
  chipContent: {
    padding: 0,
    '&:last-child': {
      paddingBottom: 0,
    },
  },
  chipAdressLink: {
    display: 'flex',
    color: '#37474f',
    fontWeight: 500,
    fontFamily: theme.typography.fontFamily,
    fontSize: '.9em',
    justifyContent: 'flex-start',
    alignItems: 'center',
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  },
  chipIconAdress: {
    color: '#37474f',
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      marginRight: theme.spacing(0.5),
    },
  },
  chipIcon: {
    color: theme.palette.primary.main,
  },
  localSupplierAddress: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  localSupplierTitle: {
    paddingRight: theme.spacing(2),
  },
}));

export default shopkeeperStyles;
