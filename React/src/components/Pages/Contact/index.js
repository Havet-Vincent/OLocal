// == Import npm
import React from 'react';

// == Import components
import {
  Grid,
  Container,
  Typography,
  Paper,
  Box,
  Link,
  Tooltip,
} from '@material-ui/core';
import PhoneRoundedIcon from '@material-ui/icons/PhoneRounded';
import RoomRoundedIcon from '@material-ui/icons/RoomRounded';
import ContactMailOutlinedIcon from '@material-ui/icons/ContactMailOutlined';


// == Import styles
import contactStyles from './contactStyles';

// == Composant
const Contact = () => {
  const classes = contactStyles();
  const bull = <span className={classes.bullet}>•</span>;
  return (
    <>
      <Grid container className={classes.contactWrapper}>
        <Container className={classes.container} maxWidth="lg">
          <Paper elevation={0} className={classes.paper} >
            <Typography variant="h4" align="center" component="h1" gutterBottom >
              Pour nous contacter, c'est simple !
          </Typography>
          </Paper>
          <Paper elevation={0} className={classes.paper}>
            <Box>
              <Typography variant="body1" color="textSecondary" component="h6" gutterBottom className={classes.contact}>
                <RoomRoundedIcon className={classes.contactIcons} />
                  18, rue des imaginaires
                    <br />
                    75021 Paris France
              </Typography>
            </Box>
          </Paper>

          <Paper elevation={0} className={classes.paper}>
            <Box>
              <Tooltip title="Email" aria-label="Email" placement="top">
                <Typography variant="body1" color="textSecondary" component="h6" gutterBottom className={classes.contact}>
                  <ContactMailOutlinedIcon className={classes.contactIcons} />
                  <Typography>
                    <Link color="inherit" href="mailto:atlantis@oclock.io">atlantis@oclock.io</Link>
                </Typography>
                </Typography>
              </Tooltip>
            </Box>
          </Paper>
          <Paper elevation={0} className={classes.paper}>
            <Box>
              <Tooltip title="Téléphone" aria-label="Téléphone" placement="top">
                <Typography variant="body1" color="textSecondary" component="h6" gutterBottom className={classes.contact}>
                  <PhoneRoundedIcon className={classes.contactIcons} />
                  <Typography>
                  <Link color="inherit" href="phone:atlantis@oclock.io">(+33).6.06.06.06.06</Link>
                    
                </Typography>
                </Typography>
              </Tooltip>
            </Box>
          </Paper>
        </Container>
      </Grid >
    </>
  );
};

// == Export
export default Contact;
