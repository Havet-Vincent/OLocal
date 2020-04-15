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
    padding: theme.spacing(3),
    [theme.breakpoints.down('lg')]: {
      width: '70%',
    },
    [theme.breakpoints.down('md')]: {
      width: '80%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '95%',
      padding: theme.spacing(2),
    },
  },
  shopkeepersListTitle: {
    color: '#37474f',
    fontSize: '1.6em',
    fontWeight: '700',
    textAlign: 'center',
    paddingBottom: theme.spacing(2),
  },
  shopkeepersListSubtitle: {
    color: theme.palette.primary.main,
    fontWeight: '700',
    fontSize: '.7em',
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
    width: "25%",
    [theme.breakpoints.down('md')]: {
      width: '40%',
    },
    [theme.breakpoints.down('sm')]: {
      width: "100%",
    },
  },
  cardContent: {
    width: '75%',
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      width: '60%',
    },
    [theme.breakpoints.down('sm')]: {
      width: "100%",
    },
  },
  cardTitle: {
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  cardSubtitle: {
    textTransform: 'uppercase',
    marginLeft: theme.spacing(2),
    fontWeight: '700',
  },
  cardDescription: {
    padding: theme.spacing(2, 0),
  },
  cardLink: {
    color: "#F7F9FA",
  },
}));

export default shopkeepersListStyles;
