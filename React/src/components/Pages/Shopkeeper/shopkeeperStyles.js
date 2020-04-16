import { makeStyles } from '@material-ui/core/styles';
import BackgroundImg from '../../../assets/img/landscape_background.png';

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
  shopkeeperContent: {
    background: 'none',
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    padding: theme.spacing(1),
  },
  shopkeeperDescription: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1),
    },
  },
  shopkeeperProducts: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: theme.spacing(3),
  },
  // cardGrid: {
  //   paddingTop: theme.spacing(8),
  //   paddingBottom: theme.spacing(8),
  // },
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
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  cardHeader: {
    width: '100%',
    color: '#37474f',
    textTransform: 'capitalize',
    paddingTop: 0,
  },
  regionsSelect: {
    width: 250,
  },
  cardMedia: {
    width: '100%',
    height: 350,
    borderRadius: 5,
    [theme.breakpoints.down('xs')]: {
      height: 250,
    },
    // paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    width: '100%',
  },
  gridLink: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  gridAdress: {
    marginRight: theme.spacing(3),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  root: {
    width: '100%',
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
  },
  chipAdress: {
    marginTop: theme.spacing(1),
  },
  chipIcon: {
    marginTop: theme.spacing(1),
    color: theme.palette.primary.main,
  },
}));

export default shopkeeperStyles;
