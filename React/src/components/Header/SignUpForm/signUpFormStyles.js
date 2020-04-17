import { makeStyles } from '@material-ui/core/styles';

const signUpFormStyles = makeStyles((theme) => ({
  formTitle: {
    color: theme.palette.primary.main,
    marginTop: '1rem',
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  sendButton: {
    color: '#fff',
    margin: '1rem 0',
  },
  textField: {
    margin: '1rem 0',
    [theme.breakpoints.down('xs')]: {
      paddingTop: '1.2rem',
    },
  },
  inputLabelField: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '.8em',
    },
  },
  formControl: {
    width: '100%',
  },
}));

export default signUpFormStyles;
