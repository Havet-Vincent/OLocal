import React, { useState } from 'react';

import { Paper } from '@material-ui/core';

// == Import assets & styles
import uploadAvatarStyles from './uploadAvatarStyles';

// datas for the tests
import shopkeeper from 'src/dataShop';


// == Import API server config
const server = require('src/api.config.json');

// == Composant
const UploadAvatar = () => {
  const classes = uploadAvatarStyles();

  // state
  const [file, setFile] = useState();
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [logoPicture, setLogoPicture] = useState();

  // control format and type of upload img
  const beforeUpload = (file) => {
    // console.log(file);
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      setMessageError('You can only upload JPG/PNG file!');
      setOpen(true);
      setSeverity('error');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      setMessageError('Image must smaller than 2MB!');
      setOpen(true);
      setSeverity('error');
    }
    return isJpgOrPng && isLt2M;
  };

  // convert img in Base64 for push in server
  const handleImageChange = () => {
    const fileUpload = event.target.files[0];
    beforeUpload(fileUpload);
    // console.log(file);
    let reader = new FileReader();
    reader.onloadend = () => {
      setFile({ file: fileUpload });
      setImagePreviewUrl({ logoPicture: reader.result });
      setLogoPicture(imagePreviewUrl);
    }
    reader.readAsDataURL(fileUpload)
  };

  // control if img exist for display
  let $imagePreview = null;
  if (imagePreviewUrl) {
    $imagePreview = (<img className={classes.imgpreview} src={imagePreviewUrl.logoPicture} />);
  } else {
    $imagePreview = (<img className={classes.imgpreview} src={`${server.url}:${server.port}${shopkeeper.logoPicture}`} />);
  }

  return (
    <Paper className={classes.uploadImg}>   
        <div className={classes.imgPreview}>
          {$imagePreview}
        </div>   
        <input className={classes.fileInput}
          type="file"
          onChange={handleImageChange} 
        />
    </Paper>
  );
};

// == Export
export default UploadAvatar;
