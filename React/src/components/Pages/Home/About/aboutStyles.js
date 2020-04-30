import { makeStyles } from '@material-ui/core/styles';

const aboutStyles = makeStyles((theme) => ({
  aboutWrapper: {
    padding: theme.spacing(2, 0),
  },
  aboutTitle: {
    color: '#37474f',
    fontSize: '1.8em',
    fontWeight: '700',
    textAlign: 'center',
    paddingBottom: theme.spacing(1),
  },
  aboutTitleSecondary: {
    color: '#ef5350',
  },
  aboutIntro: {
    fontSize: '1em',
    margin: theme.spacing(1, 8, 2, 8),
    paddingBottom: theme.spacing(5),
    '& > p': {
      paddingTop: theme.spacing(3),
    },
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(1),
    },
  },
  cardWrapper: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'none',
  },
  cardImg: {
    width: 80,
    height: 220,
    margin: theme.spacing(0, 4),
  },
  cardContent: {
    maxWidth: 500,
    fontSize: '1.2em',
  },
}));

export default aboutStyles;
