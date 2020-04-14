// == Import npm
import React from 'react';

// == Import components
import { Container, Typography, Grid, Paper, Card, CardMedia, CardContent } from '@material-ui/core';

// == Import assets & styles
import NicoleImg from '../../../../assets/img/nicole.svg';
import BernardImg from '../../../../assets/img/bernard.svg';
import aboutStyles from './aboutStyles';

// == Composant
const About = () => {
  const classes = aboutStyles();

  return (
    <Container className={classes.aboutWrapper}>
      <Typography variant="h5" component="h1" className={classes.aboutTitle}>
        A propos
      </Typography>
      <Typography variant="body2" align="center" color="textPrimary" component="p" className={classes.aboutIntro}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores voluptatum reiciendis a natus error quidem officia sequi blanditiis ullam alias, et assumenda minus quaerat tempore odit. Cupiditate praesentium vero veritatis delectus eius suscipit nesciunt quas sint quae esse cumque quia, recusandae, magnam autem, quibusdam aliquam ex facilis dolore sapiente illo.
      </Typography>
      <Card className={classes.cardWrapper} elevation={0}>
        <CardMedia
          className={classes.cardImg}
          image={NicoleImg}
          title="Contemplative Reptile"
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h6" component="h2">
            Louise
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, facere. Debitis, ipsum aperiam. Minima tempora odit quis tenetur eligendi, vitae dignissimos sed hic, nobis explicabo blanditiis ipsa error fuga aperiam!
          </Typography>
        </CardContent>
      </Card>
      <Card className={classes.cardWrapper} elevation={0}>
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h6" component="h2">
            Bernard
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis excepturi, facere sunt mollitia corrupti commodi debitis, adipisci voluptatem eum ratione recusandae. Esse cumque dolor saepe repudiandae temporibus eligendi consequatur veritatis.
          </Typography>
        </CardContent>
        <CardMedia
          className={classes.cardImg}
          image={BernardImg}
          title="Contemplative Reptile"
        />
      </Card>
    </Container>
  );
};

// == Export
export default About;
