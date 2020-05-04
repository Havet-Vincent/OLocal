import { makeStyles } from '@material-ui/core/styles';
import BackgroundImg from 'src/assets/img/landscape_background.png';

const shopkeeperProfilStyles = makeStyles((theme) => ({
  shopkeeperProfilWrapper: {
    background: `url(${BackgroundImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
    backgroundPosition: 'top center',
    backgroundColor: '#6DA641',
    flexGrow: 1,
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  shopkeeperProfilContent: {
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
  shopkeeperProfilContainer: {
    background: 'none',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      flexFlow: 'column nowrap',
      padding: theme.spacing(1, 1, 0, 1),
    },
  },
  shopkeeperProfilPicture: {
    width: '42%',
    [theme.breakpoints.down('sm')]: {
      width: '48%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  shopkeeperProfilDescription: {
    color: '#37474f',
    width: '55%',
    [theme.breakpoints.down('sm')]: {
      width: '50%',
      paddingLeft: theme.spacing(2),
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingLeft: theme.spacing(0),
      margin: theme.spacing(3, 0, 1, 0),
    },
  },
  shopkeeperProfilTitle: {
    color: '#37474f',
    fontSize: '1.8em',
    fontWeight: '700',
    margin: theme.spacing(2, 0),
  },
  shopkeeperProfilAddress: {
    fontWeight: 500,
    fontFamily: theme.typography.fontFamily,
    fontSize: '.9em',
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
  },
  shopkeeperProfilInfos: {
    background: 'rgba(247, 249, 250, .65)',
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'flex-start',
    padding: theme.spacing(2, 4, 1, 4),
    marginTop: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2, 2, 1, 2),
    },
  },
  shopkeeperProfilInfosTitle: {
    alignSelf: 'center',
  },
  shopkeeperProfilCoordonates: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    width: '100%',
    marginTop: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      width: '95%',
    },
  },
  shopkeeperProfilCoordonatesWrapper: {
    width: '100%',
  },
  shopkeeperProfilGrid: {

  },
  shopkeeperProfilDetails: {
    marginTop: theme.spacing(3),
    background: 'none',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  textAreaFieldWrapper: {
    width: 'auto',
    backgroundColor: 'rgba(247, 249, 250, .8)',
    padding: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    },
  },
  textAreaField: {
    color: '#37474f',
    minWidth: '100%',
    maxWidth: '100%',
    fontSize: '1.05em',
    background: 'none',
    border: 'none',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
    },
  },
  shopkeeperProfilValidationBtn: {
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: theme.spacing(3),
    },
  },
  fab: {
    marginRight: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(3, 0, 0, 0),
    },
  },
  fabLabel: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#F7F9FA',
    fontSize: '.92em',
  },
  extendedIcon: {
    color: '#F7F9FA',
    fontSize: 26,
    marginRight: '5px',
  },
  textField: {
    margin: '.5rem 0',
  },
  passwordField: {
    margin: '.8rem 0',
  },
  inputLabelField: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '1em',
    },
  },
  inputGridField: {
    fontSize: '.8em',
  },
  passwordForm: {
    margin: theme.spacing(2, 0),
  },
  tooglePasswordForm: {
    marginBottom: theme.spacing(1),
  },
}));

export default shopkeeperProfilStyles;
