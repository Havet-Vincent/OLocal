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
  FormHelperText,
} from '@material-ui/core';

// == Import styles
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
  const [regionError, setRegionError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);

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
    setRegionError(false);
    setCategoryError(false);
    if (regionSelect === '') {
      setRegionError(true);
    }
    if (categorySelect === '') {
      setCategoryError(true);
    }
    if (regionSelect !== '' && categorySelect !== '') {
      handleSearchHomeSubmit();
    }
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
      <Typography variant="h5" className={classes.searchTitle} gutterBottom>
        Rechercher un commerçant
      </Typography>
      <form className={classes.searchForm} onSubmit={handleSubmit}>
        <FormControl variant="outlined" className={classes.formControl} error={regionError}>
          <InputLabel htmlFor="search-region">Région</InputLabel>
          <Select
            name="region"
            className={classes.searchSelect}
            label="Région"
            id="region"
            value={regionSelect}
            onChange={handleChangeRegion}
            inputProps={{ name: 'region' }}
            MenuProps={MenuProps}
          >
            {regions.map((item) => (
              <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
            ))}
          </Select>
          <FormHelperText className={classes.searchHelperText}>*champ requis</FormHelperText>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl} error={categoryError}>
          <InputLabel htmlFor="search-category">Catégorie de produits</InputLabel>
          <Select
            name="category"
            className={classes.searchSelect}
            label="Catégorie de produits"
            id="category"
            value={categorySelect}
            onChange={handleChangeCategory}
            inputProps={{ name: 'category' }}
            MenuProps={MenuProps}
          >
            {categories.map((item) => (
              <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
            ))}
          </Select>
          <FormHelperText className={classes.searchHelperText}>*champ requis</FormHelperText>
        </FormControl>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          size="large"
          endIcon={<Icon>search</Icon>}
          className={classes.searchButton}
        >
          Rechercher
        </Button>
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
