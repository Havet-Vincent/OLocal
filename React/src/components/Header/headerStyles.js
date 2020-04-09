import { makeStyles } from '@material-ui/core/styles';

const headerStyles = makeStyles(() => ({
  navbar: {
    flexGrow: 1,
    backgroundColor: 'rgba(247, 249, 250, .8)',
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    width: '120px',
    height: 'auto',
  },
  signupButton: {
    fontSize: '.8em',
    border: '2px solid',
    fontWeight: '700',
    marginLeft: '10px',
    '&:hover': {
      color: '#F7F9FA',
      backgroundColor: '#44C868',
      border: '2px solid #44C868',
    },
  },
  signinButton: {
    fontSize: '.8em',
    border: '2px solid',
    fontWeight: '700',
    marginLeft: '10px',
    '&:hover': {
      color: '#F7F9FA',
      backgroundColor: '#1EA4E9',
      border: '2px solid #1EA4E9',
    },
    profileIcon: {
      height: '3em',
    },
  },
}));

export default headerStyles;
