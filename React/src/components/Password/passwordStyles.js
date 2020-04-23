import { makeStyles } from '@material-ui/core/styles';

const passwordStyles = makeStyles((theme) => ({
  textField: {
    margin: '1rem 0',
  },
  inputLabelField: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '1em',
    },
  },
}));

export default passwordStyles;
