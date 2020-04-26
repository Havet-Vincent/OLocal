import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import MaterialTable from 'material-table';

// == Import components
import {
  Grid,
  Paper,
  Typography,
  Container,
  Link,
  TextField,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Loader from 'src/components/Loader';
import NavbarShopkeeperProfil from 'src/containers/Profil/ShopkeeperProfil/NavbarShopkeeperProfil';
import CustomFooter from './MUITable/CustomFooter';
// ====Material-table
import MaterialTable from './MUITable';
import MTableToolbar from './MUITable/components/m-table-toolbar';

// == Import styles
import shopkeeperProfilPageStyles from './shopkeeperProfilPageStyles';


// == Composant
const ShopkeeperProfilPage = ({
  loader,
  catalog,
  categories,
  currentRegion,
  suppliers,
  siret,
  //
  addCatalogItem,
  updateCatalogItem,
  deleteCatalogItem,
  //
  getUserData,
  getCategoriesData,
  handleSupplierSubmit,
}) => {
  const classes = shopkeeperProfilPageStyles();
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentRow, setCurrentRow] = useState(null);

  // First render => get data
  useEffect(() => {
    getUserData();
    getCategoriesData();
  }, []);

  const loadTable = () => {
    setState({
      text: 'text',
      currentRow: 0,
      columns: [
        {
          title: 'CatalogId',
          field: 'catalogId',
          headerStyle: {
            paddingLeft: '30px',
            fontSize: '.85em',
            fontWeight: 700,
            textTransform: 'uppercase',
          },
          cellStyle: { paddingLeft: '30px' },
          editable: 'onAdd',
          defaultSort: 'desc',
        },
        {
          title: 'Catégorie',
          field: 'category',
          headerStyle: {
            paddingLeft: '30px',
            fontSize: '.85em',
            fontWeight: 700,
            textTransform: 'uppercase',
          },
          cellStyle: { paddingLeft: '30px' },
          editable: 'onAdd',
          defaultSort: 'desc',
          // customSort: (term, rowData) => console.log(term),
          editComponent: (props) => (
            <Autocomplete
              id="category"
              options={categories}
              size="small"
              autoComplete
              disableClearable
              onChange={(event, newValue) => {
                props.onChange(newValue.name);
                const data = {
                  ...props.rowData,
                  categoryId: newValue.id,
                  category: newValue.name,
                };
                setCurrentRow({ ...data });
              }}
              includeInputInList
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField {...params} label={props.value} placeholder="Catégorie" fullWidth />
              )}
            />
          ),
        },
        {
          title: 'Article',
          field: 'product',
          headerStyle: {
            fontSize: '.85em',
            fontWeight: 700,
            textTransform: 'uppercase',
          },
          editComponent: (props) => (
            <TextField
              id="product"
              size="small"
              defaultValue={props.value}
              className={classes.textField}
              onBlur={(event) => {
                setCurrentRow({ ...props.rowData, product: event.target.value });
              }}
              placeholder="Produit"
              onChange={(event) => {
                props.onChange(event.target.value);
                // setCurrentRow({ ...props.rowData, product: event.target.value });
              }}
            />
          ),
        },
        {
          title: 'Producteur',
          field: 'supplier',
          headerStyle: {
            fontWeight: 700,
            fontSize: '.85em',
            textTransform: 'uppercase',
          },
          editComponent: (props) => (
            <Autocomplete
              id="supplier"
              options={suppliers}
              size="small"
              autoComplete
              disableClearable
              onChange={(event, newValue) => {
                props.onChange(newValue.name);
                const data = {
                  ...props.rowData,
                  supplierId: newValue.id,
                  supplier: newValue.name,
                };
                setCurrentRow({ ...data });
              }}
              includeInputInList
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField {...params} label={props.value} placeholder="Producteur" fullWidth />
              )}
            />
          ),
        },
        {
          title: 'Localisation',
          field: 'city',
          headerStyle: {
            fontWeight: 700,
            fontSize: '.85em',
            textTransform: 'uppercase',
          },
          editable: 'never',
        },
        {
          title: 'Code Postal',
          field: 'postalCode',
          headerStyle: {
            fontWeight: 700,
            textTransform: 'uppercase',
          },
          editable: 'never',
        },
      ],
      data: catalog,
    });
  };

  // When catalog is updated => load table
  useEffect(() => {
    loadTable();
    setLoading(false);
  }, [catalog]);

  // print current page
  function imprimer_page() {
    window.print();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSupplierSubmit();
    setOpen(false);
  };

  return (
    <>
      <Loader loader={loader} />
      {!loader && (
        <Grid container className={classes.shopkeeperProfilPageWrapper}>
          <Container className={classes.shopkeeperProfilPageContent} component="main">
            <NavbarShopkeeperProfil />
            <Typography className={classes.shopkeeperProfilPageTitle} variant="h4" component="h1" align="center">
              Liste de mes produits par catégorie
            </Typography>
            <Paper className={classes.shopkeeperProfilPageContainer} elevation={0}>
              <MaterialTable
                title="Liste des produits par catégorie"
                columns={state.columns}
                data={state.data}
                isLoading={loading}
                icons={{
                  Add: (props) => (<Link {...props}>Ajouter</Link>),
                }}
                editable={{
                  onRowAdd: (newData) => new Promise((resolve) => {
                    setTimeout(() => {
                      /* const data = this.state.data;
                        data.push(newData);
                        this.setState({ data }, () => resolve()); */
                      console.log(newData);
                      resolve();
                    }, 600);
                  }),
                  onRowUpdate: () => new Promise((resolve) => {
                    setTimeout(() => {
                      setLoading(true);
                      updateCatalogItem(currentRow);
                      resolve();
                    }, 600);
                  }),
                  onRowDelete: (oldData) => new Promise((resolve) => {
                    setTimeout(() => {
                      setLoading(true);
                      deleteCatalogItem(oldData);
                      resolve();
                    }, 600);
                  }),
                }}
                components={{
                  Toolbar: (props) => (
                    <div className={classes.MToolbarWrapper}>
                      <MTableToolbar {...props} />
                      <Link className={classes.MToolbarLink}>Ajouter un producteur à la liste ?</Link>
                    </div>
                  ),
                }}
                options={{
                  actionsCellStyle: {
                    backgroundColor: 'rgba(232, 232, 232, .45)',
                  },
                  addRowPosition: 'first',
                  // filterCellStyle: {
                  //   backgroundColor: 'rgba(232, 232, 232, .45)',
                  // },
                  toolbarButtonAlignment: 'left',
                  showTitle: false,
                  sorting: true,
                  exportButton: true,
                  pageSize: 10,
                  pageSizeOptions: [10, 20, 50, 100],
                  paginationType: 'stepped',
                  filtering: true,
                  filterType: 'dropdown',
                  searchFieldAlignment: 'left',
                  customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage, textLabels) => (
                    <CustomFooter
                      count={count}
                      page={page}
                      rowsPerPage={rowsPerPage}
                      changeRowsPerPage={changeRowsPerPage}
                      changePage={changePage}
                      textLabels={textLabels}
                    />
                  ),
                }}
                actions={[
                  {
                    icon: 'local_printshop',
                    iconProps: {
                      color: 'action',
                    },
                    tooltip: 'Imprimer page en cours',
                    isFreeAction: true,
                    onClick: () => window.print(),
                  },
                ]}
                // onRowClick={((evt, selectedRow) => this.setState({ selectedRow }))}
              />
            </Paper>
            {/* <Paper>
              <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Ajouter un producteur</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Entrer le N° de siret du producteur et la région
                  </DialogContentText>
                  <form onSubmit={handleSubmit}>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="siret"
                      label="N° de siret"
                      fullWidth
                      name="siret"
                      value={siret}
                      onChange={handleChange}
                    />
                    <FormControl variant="outlined" className={classes.formControl} error={regionError}>
                      <InputLabel id="search-region">Région</InputLabel>
                      <Select
                        className={classes.searchSelect}
                        label="Région"
                        labelId="search-region"
                        id="search-region"
                        inputProps={{ name: 'region' }}
                        value={regionSelect}
                        onChange={handleChangeRegion}
                        MenuProps={MenuProps}
                      >
                        {regions.map((item) => (
                          <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <DialogActions>
                      <Button onClick={handleClose} color="primary">
                        Abandonner
                      </Button>
                      <Button type="submit" color="primary">
                        Ajouter
                      </Button>
                    </DialogActions>
                  </form>
                </DialogContent>
              </Dialog>
            </Paper> */}
          </Container>
        </Grid>
      )}
    </>
  );
};

ShopkeeperProfilPage.propTypes = {
  loader: PropTypes.bool.isRequired,
  catalog: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  currentRegion: PropTypes.array.isRequired,
  suppliers: PropTypes.array.isRequired,
  siret: PropTypes.string.isRequired,
  addCatalogItem: PropTypes.func.isRequired,
  updateCatalogItem: PropTypes.func.isRequired,
  deleteCatalogItem: PropTypes.func.isRequired,
  getUserData: PropTypes.func.isRequired,
  getCategoriesData: PropTypes.func.isRequired,
  handleSupplierSubmit: PropTypes.func.isRequired,
};

// == Export
export default ShopkeeperProfilPage;
