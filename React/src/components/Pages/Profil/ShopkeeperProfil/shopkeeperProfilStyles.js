import { makeStyles } from '@material-ui/core/styles';

const shopkeeperProfilStyles = makeStyles((theme) => ({

  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  
}));

export default shopkeeperProfilStyles;
