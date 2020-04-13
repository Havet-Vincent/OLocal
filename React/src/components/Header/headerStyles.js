import { makeStyles } from '@material-ui/core/styles';

const headerStyles = makeStyles(() => ({
  navbar: {
    flexGrow: 1,
    backgroundColor: 'rgba(247, 249, 250, .65)',
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    width: '120px',
    height: 'auto',
  },
}));

export default headerStyles;
