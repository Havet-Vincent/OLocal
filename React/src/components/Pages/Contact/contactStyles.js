import { makeStyles } from '@material-ui/core/styles';

const contactStyles = makeStyles((theme) => ({
  contact: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
    fontWeight: 400,
    fontSize: 4,
    flexGrow: 1,
  },
}));

export default contactStyles;
