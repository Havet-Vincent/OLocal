import { makeStyles } from '@material-ui/core/styles';

const shopkeeperProfilImageStyles = makeStyles((theme) => ({

  cardMedia: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    [theme.breakpoints.down('xs')]: {
      height: 150,
    },
  },

}));

export default shopkeeperProfilImageStyles;
