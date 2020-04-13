import { makeStyles } from '@material-ui/core/styles';

const headerStyles = makeStyles(() => ({
  navbar: {
    flexGrow: 1,
    backgroundColor: '#F7F9FA',
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
