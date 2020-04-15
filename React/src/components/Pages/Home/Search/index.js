// == Import npm
import React from 'react';
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
  categoryField,
  regionField,
  setRegionField,
  setCategoryField,
  handleSearchHomeSubmit,
}) => {
  const classes = searchStyles();

  const handleChangeRegion = (event) => {
    setRegionField(event.target.value);
  };

  const handleChangeCategory = (event) => {
    setCategoryField(event.target.value);
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
            value={regionField}
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
            value={categoryField}
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
  categoryField: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  regionField: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  setRegionField: PropTypes.func.isRequired,
  setCategoryField: PropTypes.func.isRequired,
  handleSearchHomeSubmit: PropTypes.func.isRequired,
};

// == Export
export default Search;
