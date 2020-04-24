import { makeStyles } from '@material-ui/core/styles';

const navbarShopkeeperProfilStyles = makeStyles((theme) => ({
  navbarShopkeeber: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    background: 'none',
  },
  navbarShopkeeberHome: {
    position: 'absolute',
    left: 0,
  },
  navbarButtonContainer: {
    display: 'flex',
    background: 'none',
    '& > *': {
      margin: theme.spacing(1),
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(6),
    },
  },
  navbarButton: {
    border: '1px solid #b8baba',
    width: 150,
    textTransform: 'uppercase',
    borderRadius: 5,
    '&:hover': {
      color: theme.palette.primary.light,
      border: `1px solid ${theme.palette.primary.light}`,
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '.8em',
      width: 120,
    },
  },
  navbarButtonSelected: {
    border: `1px solid ${theme.palette.primary.light}`,
    fontWeight: 500,
    '& span': {
      border: 'none',
    },
  },
  selected: {},
}));

export default navbarShopkeeperProfilStyles;
