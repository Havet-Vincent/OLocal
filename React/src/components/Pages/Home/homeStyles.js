import { makeStyles, ThemeProvider } from '@material-ui/core/styles';

const homeStyles = makeStyles((theme) => ({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingTop: theme.spacing(6),
  },
  search: {
    backgroundColor: 'rgba(247, 249, 250, .95)',
    borderRadius: 10,
    margin: theme.spacing(20, 0),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(5, 0),
    },
  },
  about: {
    backgroundColor: 'rgba(159, 204, 62, .85)',
    padding: theme.spacing(4),
    margin: theme.spacing(10, 0, 0, 0),
  }
}));

export default homeStyles;
