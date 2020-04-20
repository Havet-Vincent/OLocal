import { makeStyles } from '@material-ui/core/styles';

const shopkeeperProfilPageStyles = makeStyles((theme) => ({

  listNav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shopkeeperContent: {
    backgroundColor: 'rgba(247, 249, 250, .95)',
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    padding: theme.spacing(1),
  },
  shopkeeperDescription: {
    background: 'none',
    width: '100%',
    height: '100%',
    padding: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1),
    }
  }

  }));

export default shopkeeperProfilPageStyles;
