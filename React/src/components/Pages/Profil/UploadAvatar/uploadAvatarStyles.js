import { makeStyles } from '@material-ui/core/styles';
import BackgroundImg from 'src/assets/img/landscape_background.png';

const uploadAvatarStyles = makeStyles((theme) => ({

  uploadImg: {

  },

  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },

  fileInput: {
    borderBottom: '4px solid lightgray',
    borderRight: '4px solid lightgray',
    borderTop: '1px solid black',
    borderLeft: '1px solid black',
    padding: '10px',
    margin: '15px',
    cursor: 'pointer',
  },
  imgPreview: {
    textAlign: 'center',
    margin: '5px 15px',
    height: '100px',
    width: '150px',
    borderLeft: '1px solid gray',
    borderRight: '1px solid gray',
    borderTop: '5px solid gray',
    borderBottom: '5px solid gray',
  },
  imgpreview: {
    width: '100%',
    height: '100%',
  },

}));

export default uploadAvatarStyles;
