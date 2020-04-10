import { makeStyles } from '@material-ui/core/styles';
import BackgroundImg from '../../assets/img/landscape_background.png';

const appStyles = makeStyles(() => ({
  container: {
    maxWidth: '100%',
    minHeight: '100vh',
    background: `url(${BackgroundImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'top center',
  },
}));


export default appStyles;
