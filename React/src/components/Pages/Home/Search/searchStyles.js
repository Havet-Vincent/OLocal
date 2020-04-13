import { makeStyles } from '@material-ui/core/styles';

const searchStyles = makeStyles(() => ({
  formControl: {
    backgroundColor: 'rgba(247, 249, 250, .95)',
    margin: '0.5rem auto',
    width: 250,
    borderRadius: '5px',
    '&:selected': {
      color: '#F7F9FA',
    },
  },
  searchTitle: {
    width: '100%',
    color: '#37474f',
    fontWeight: '700',
    fontSize: '1.4em',
    textAlign: 'center',
    paddingBottom: '1.5rem',
  },
  searchForm: {
    display: 'flex',
    flexDirection: 'column',
  },
  searchSelect: {
    background: 'transparent',
    paddingLeft: '20px',
    '&:selected': {
      color: '#F7F9FA',
    },
  },
  searchButton: {
    color: '#fff',
    fontWeight: '700',
    marginTop: '1rem',
  },
}));

export default searchStyles;
// color: #1EA4E9;
// MuiFormLabel-root.Mui-focused
