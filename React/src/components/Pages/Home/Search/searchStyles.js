import { makeStyles } from '@material-ui/core/styles';

const searchStyles = makeStyles((theme) => ({
  searchWrapper: {
    padding: theme.spacing(3, 1, 6, 1),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3, 1),
    },
  },
  searchTitle: {
    color: '#37474f',
    fontWeight: '700',
    textAlign: 'center',
    paddingBottom: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingBottom: theme.spacing(1),
      fontSize: '1.4em',
    },
  },
  formControl: {
    position: 'relative',
    margin: theme.spacing(0, 2),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(1.5, 0),
    },
  },
  searchForm: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  searchSelect: {
    width: 220,
  },
  searchHelperText: {
    position: 'absolute',
    top: -20,
    right: -10,
    fontStyle: 'italic',
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
