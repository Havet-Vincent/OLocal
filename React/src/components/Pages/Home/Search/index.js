// == Import npm
import React, { useState } from 'react';
import PropTypes from 'prop-types';

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
const Search = ({
  categories,
  regions,
  setRegion,
  setCategory,
  handleSearchHomeSubmit,
}) => {
  const classes = searchStyles();
  const [regionSelect, setRegionSelect] = useState('');
  const [categorySelect, setCategorySelect] = useState('');

  const handleChangeRegion = (event) => {
    setRegionSelect(event.target.value);
    const region = regions.find((reg) => reg.id === event.target.value);
    setRegion(region);
  };

  const handleChangeCategory = (event) => {
    setCategorySelect(event.target.value);
    const category = categories.find((cat) => cat.id === event.target.value);
    setCategory(category);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearchHomeSubmit();
  };

  const MenuProps = {
    PaperProps: {
      style: {
        // sub-menu size
        maxHeight: 300,
        maxWidth: 320,
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
            value={regionSelect}
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
            value={categorySelect}
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

Search.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  regions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  setRegion: PropTypes.func.isRequired,
  setCategory: PropTypes.func.isRequired,
  handleSearchHomeSubmit: PropTypes.func.isRequired,
};

// == Export
export default Search;
