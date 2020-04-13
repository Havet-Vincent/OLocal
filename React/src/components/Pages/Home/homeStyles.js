import { makeStyles } from '@material-ui/core/styles';

const homeStyles = makeStyles(() => ({
  searchMenu: {
    width: '100%',
    backgroundColor: 'rgba(247, 249, 250, .7)',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '3rem 0',
    margin: '5rem auto',
    borderRadius: '25px',
    borderLeft: '4px solid #A0CBE3',
    borderRight: '4px solid #A0CBE3',
    ['@media (min-width:620px)']: { // eslint-disable-line no-useless-computed-key
      width: 'max-content',
      padding: '3rem 5rem',
    },
  },
}));

export default homeStyles;
