import { makeStyles } from '@material-ui/core/styles';
import BackgroundImg from 'src/assets/img/landscape_background.png';

const aboutStyles = makeStyles((theme) => ({

  aboutWrapper: {
    background: `url(${BackgroundImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  container: {
    backgroundColor: 'rgba(247, 249, 250, .85)',
    display: 'flex',
    flexFlow: 'column wrap',
    alignItems: 'center',
    marginTop: '40px',
    padding: theme.spacing(1, 2),
    paddingBottom: theme.spacing(5),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
    },
},
  containerGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '100%',
    justifyContent: 'space-evenly',
    borderBottom: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(2),
  },
  cardGrid: {
    height: 250,
    width: 250,
    marginTop: '3px',
    marginBottom: '10px',
    border: '0.5px solid black',
    border: `1px solid ${theme.palette.divider}`,
    marginBottom: theme.spacing(3),
  },
  cardHeader: {
    backgroundColor: theme.palette.grey[200],
  },

  cardPos: {
    marginBottom: 12,
  },

}));

export default aboutStyles;
