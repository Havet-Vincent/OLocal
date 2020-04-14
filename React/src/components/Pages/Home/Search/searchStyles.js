import { makeStyles } from '@material-ui/core/styles';

const searchStyles = makeStyles((theme) => ({
  searchWrapper: {
    padding: theme.spacing(4, 1, 6, 1),
  },
  searchTitle: {
    color: '#37474f',
    fontWeight: '700',
    textAlign: 'center',
  },
  formControl: {
    margin: theme.spacing(0, 2),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(2, 0),
    },
  },
  searchForm: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(5, 0),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      padding: theme.spacing(1, 0),
    },
  },
  searchSelect: {
    width: 220,
  },
  searchButton: {
    margin: theme.spacing(0, 2),
    color: '#fff',
    fontWeight: '700',
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(2, 0),
    },
  },
}));

export default searchStyles;

