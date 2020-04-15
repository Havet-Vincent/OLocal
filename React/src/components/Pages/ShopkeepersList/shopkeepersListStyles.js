import { makeStyles } from '@material-ui/core/styles';
import BackgroundImg from '../../../assets/img/landscape_background.png';

const shopkeepersListStyles = makeStyles((theme) => ({
  shopkeepersListWrapper:{
    background: `url(${BackgroundImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  shopkeepersListContent: {
    width: '60%',
    backgroundColor: 'rgba(247, 249, 250, .95)',
    margin: theme.spacing(3, 0),
    padding: theme.spacing(1, 3),
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
  shopkeepersListNav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shopkeepersListTitle: {
    color: '#37474f',
    fontSize: '1.5em',
    fontWeight: '700',
    textAlign: 'center',
    margin: theme.spacing(2, 0),
    '& > span': {
      color: theme.palette.secondary.main,
    }
  },
  shopkeepersListSubtitle: {
    color: theme.palette.primary.main,
    fontWeight: '700',
    fontSize: '.7em',
    fontStyle: 'italic',
    paddingTop: theme.spacing(1),
    '& > span': {
      color: theme.palette.secondary.main,
    }
  },
  cardWrapper:{
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    background: 'none',
    margin: theme.spacing(3, 0),
    [theme.breakpoints.down('sm')]: {
      flexFlow: 'column nowrap',
    },
  },
  cardImg: {
    height: 250,
    width: "30%",
    [theme.breakpoints.down('md')]: {
      width: '40%',
    },
    [theme.breakpoints.down('sm')]: {
      width: "100%",
    },
  },
  cardContent: {
    width: '70%',
    marginLeft: theme.spacing(1.5),
    [theme.breakpoints.down('md')]: {
      width: '60%',
    },
    [theme.breakpoints.down('sm')]: {
      width: "100%",
    },
  },
  cardTitle: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: '700',
    textTransform: 'uppercase',
    verticalAlign: 'center',
    margin: 0,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  cardSubtitle: {
    textTransform: 'uppercase',
    marginLeft: theme.spacing(2),
    fontWeight: '700',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  cardDescription: {
    padding: theme.spacing(2, 0),
  },
  cardLink: {
    color: "#F7F9FA",
  },
}));

export default shopkeepersListStyles;
