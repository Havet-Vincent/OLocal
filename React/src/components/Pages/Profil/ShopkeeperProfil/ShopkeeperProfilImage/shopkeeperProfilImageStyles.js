import { makeStyles } from '@material-ui/core/styles';

const shopkeeperProfilImageStyles = makeStyles((theme) => ({
  cardMedia: {
    position: 'relative',
    width: '100%',
    height: 320,
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      height: 220,
    },
  },
}));

export default shopkeeperProfilImageStyles;
