import { makeStyles } from '@material-ui/core/styles';

const authMenuStyles = makeStyles(() => ({
  accountButton: {
    fontSize: '.8em',
    fontWeight: 700,
  },
  accountIcon: {
    fontSize: 60,
  },
  backOfficeLink: {
    color: 'inherit',
    '&:hover': {
      textDecoration: 'none',
    },
  },
}));

export default authMenuStyles;
