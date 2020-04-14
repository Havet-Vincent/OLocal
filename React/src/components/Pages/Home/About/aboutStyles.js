import { makeStyles } from '@material-ui/core/styles';
import { FormHelperText } from '@material-ui/core';

const aboutStyles = makeStyles((theme) => ({
  aboutWrapper: {
    padding: theme.spacing(2, 0),
  },
  aboutTitle: {
    color: '#37474f',
    fontSize: '1.8em',
    fontWeight: '700',
    textAlign: 'center',
    paddingBottom: theme.spacing(3),
  },
  aboutIntro: {
    padding: theme.spacing(3, 0, 5, 0),
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
  },
}));

export default aboutStyles;

