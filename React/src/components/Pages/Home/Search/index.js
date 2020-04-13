// == Import npm
import React from 'react';

// == Import components
import {
  FormControl,
  Select,
  InputLabel,
  Input,
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
        width: 50,
      },
    },
  };

  return (
    <>
      <p className={classes.searchTitle}>Rechercher un commerçant</p>
      <form className={classes.searchForm} onSubmit={handleSubmit}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="search-region">Région</InputLabel>
          <Select
            className={classes.searchSelect}
            value={region}
            label="region"
            onChange={handleChangeRegion}
            labelId="search-region"
            input={<Input />}
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
            value={category}
            label="category"
            onChange={handleChangeCategory}
            labelId="search-category"
            input={<Input />}
            MenuProps={MenuProps}
          >
            {categories.map((item) => (
              <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" color="primary" variant="contained" endIcon={<Icon>search</Icon>} className={classes.searchButton}>Rechercher</Button>
      </form>
    </>
  );
};

// == Export
export default Search;
