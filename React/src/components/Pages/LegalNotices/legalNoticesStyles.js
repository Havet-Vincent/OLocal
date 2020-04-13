import { makeStyles } from '@material-ui/core/styles';

const legalNoticesStyles = makeStyles((theme) => ({
  legalNotices: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(8),
    padding: theme.spacing(6, 0),
    fontWeight: 400,
    fontSize: 4,
  },
}));

export default legalNoticesStyles;
