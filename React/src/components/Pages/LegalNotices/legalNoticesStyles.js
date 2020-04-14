import { makeStyles } from '@material-ui/core/styles';

const legalNoticesStyles = makeStyles((theme) => ({
  legalNotices: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6, 2),
    fontWeight: 400,
    fontSize: 4,
  },
}));

export default legalNoticesStyles;
