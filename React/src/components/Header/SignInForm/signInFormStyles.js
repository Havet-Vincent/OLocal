import { makeStyles } from '@material-ui/core/styles';

const signInFormStyles = makeStyles((theme) => ({
  formTitle: {
    color: theme.palette.secondary.main,
    marginTop: '1rem',
    textAlign: 'center',
  },
  formContent: {
    display: 'flex',
    flexDirection: 'column',
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
  },
  inputLabelField: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '1em',
    },
  },
}));

export default signInFormStyles;
