import { makeStyles } from '@material-ui/core/styles';
import BackgroundImg from '../../assets/img/landscape_background.png';

const appStyles = makeStyles(() => ({
  wrapper: {
    maxWidth: '100%',
    minHeight: '100vh',
    background: `url(${BackgroundImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 0,
  },
}));


export default appStyles;
