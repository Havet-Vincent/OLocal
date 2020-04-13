import { makeStyles } from '@material-ui/core/styles';

const footerStyles = makeStyles((theme) => ({

  appBar: {
    top: 'auto',
    bottom: 0,
    width: '100%',
    color: 'black',
    backgroundColor: 'rgba(247, 249, 250, .6)',
  },

  toolBar: {
    justifyContent: 'center',
  },

  root: {
    '& > * + *': {
      marginLeft: theme.spacing(4),
    },
  },

  footerLink: {
    color: 'black',
    '&:hover': {
      color: '#26a69a',
    },
  },

}));

export default footerStyles;
