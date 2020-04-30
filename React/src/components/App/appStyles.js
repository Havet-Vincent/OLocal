import { makeStyles } from '@material-ui/core/styles';

const appStyles = makeStyles(() => ({
  wrapper: {
    maxWidth: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 0,
  },
}));

export default appStyles;
