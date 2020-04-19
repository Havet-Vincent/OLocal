import { makeStyles } from '@material-ui/core/styles';

const loaderStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#fff',
    color: theme.palette.primary.main,
  },
}));

export default loaderStyles;
