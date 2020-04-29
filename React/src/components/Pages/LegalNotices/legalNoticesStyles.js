import { makeStyles } from '@material-ui/core/styles';
import BackgroundImg from 'src/assets/img/landscape_background.png';

const legalNoticesStyles = makeStyles((theme) => ({
  LegalNoticeWrapper: {
    background: `url(${BackgroundImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  LegalNoticeContent: {
    width: '60%',
    backgroundColor: 'rgba(247, 249, 250, .95)',
    margin: 0,
    padding: theme.spacing(2, 4),
    [theme.breakpoints.down('lg')]: {
      width: '70%',
    },
    [theme.breakpoints.down('md')]: {
      width: '80%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '95%',
      padding: theme.spacing(1, 2),
    },
  },
}));

export default legalNoticesStyles;
