import { makeStyles } from '@material-ui/core/styles';

const shopkeeperStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardHeader: {
    backgroundColor:
    theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  gridLink: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  root: {
    width: '100%',
  },
}));

export default shopkeeperStyles;
