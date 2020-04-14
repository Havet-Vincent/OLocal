// == Import npm
import React from 'react';

// == Import components
import {
  Container,
  Typography,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Button,
  Icon,
} from '@material-ui/core';

// == Import assets & styles
import searchStyles from './searchStyles';

// == Composant
const Search = () => {
  const classes = searchStyles();

  // set onChange input value
  const [region, setRegion] = React.useState('');
  const [category, setCategory] = React.useState('');

  const handleChangeRegion = (event) => {
    // console.log(event.target.name);
    setRegion(event.target.value);
  };

  const handleChangeCategory = (event) => {
    // console.log(event.target.name);
    setCategory(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // submitLogin();
    console.log(region, category);
  };

  // data Regions
  const regions = [
    {
      id: 1,
      name: 'Ile de France',
    },
    {
      id: 2,
      name: 'Grand Est',
    },
    {
      id: 3,
      name: 'Bourgogne Franche Comté',
    },
    {
      id: 4,
      name: 'Corse',
    },
    {
      id: 5,
      name: 'Ile de France',
    },
    {
      id: 6,
      name: 'Grand Est',
    },
    {
      id: 7,
      name: 'Bourgogne Franche Comté',
    },
    {
      id: 8,
      name: 'Corse',
    },
  ];

  // data Categories
  const categories = [
    {
      id: 1,
      name: 'Fruits',
    },
    {
      id: 2,
      name: 'Legumes',
    },
    {
      id: 3,
      name: 'Produits Beauté',
    },
    {
      id: 4,
      name: 'Chaussures',
    },
    {
      id: 5,
      name: 'Produits entretien',
    },
  ];

  const MenuProps = {
    PaperProps: {
      style: {
        // sub-menu size
        maxHeight: 300,
        maxWidth: 250,
      },
    },
  };

  return (
    <Container className={classes.searchWrapper}>
      <Typography variant="h5" className={classes.searchTitle}>
        Rechercher un commerçant
      </Typography>
      <form className={classes.searchForm} onSubmit={handleSubmit}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="search-region">Région</InputLabel>
          <Select
            className={classes.searchSelect}
            label="Région"
            labelId="search-region"
            id="search-region"
            value={region}
            onChange={handleChangeRegion}
            MenuProps={MenuProps}
          >
            {regions.map((item) => (
            <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
          ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="search-category">Catégorie de produits</InputLabel>
          <Select
            className={classes.searchSelect}
            label="Catégorie de produits"
            labelId="search-category"
            id="search-category"
            value={category}
            onChange={handleChangeCategory}
            MenuProps={MenuProps}
          >
            {categories.map((item) => (
              <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" color="primary" variant="contained" size="large" endIcon={<Icon>search</Icon>} className={classes.searchButton}>Rechercher</Button>
      </form>
    </Container>
  );
};

// == Export
export default Search;
