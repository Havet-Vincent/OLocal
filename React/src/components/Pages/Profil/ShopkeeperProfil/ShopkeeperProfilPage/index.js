import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// == Import components
import {
  Grid,
  Paper,
  Typography,
  Container,
  Button,
  TextField,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Loader from 'src/components/Loader';
import NavbarShopkeeperProfil from 'src/containers/Profil/ShopkeeperProfil/NavbarShopkeeperProfil';
import LocalSupplierForm from 'src/containers/Profil/ShopkeeperProfil/ShopkeeperProfilPage/LocalSupplierForm';

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
  suppliers,
  //
  addCatalogItem,
  updateCatalogItem,
  deleteCatalogItem,
  //
  getUserData,
  getCategoriesData,
  getRegionsData,
  setSupplierForm,
}) => {
  const classes = shopkeeperProfilPageStyles();
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(true);

  const [categorySelect, setCategorySelect] = useState({ categoryId: '' });
  const [productField, setProductField] = useState({ product: '' });
  const [supplierSelect, setSupplierSelect] = useState({ supplierId: '' });
  const categoryError = { error: true, helperText: 'Obligatoire' };
  const productError = { error: true, helperText: 'Obligatoire' };
  const supplierError = { error: true, helperText: 'Obligatoire' };

  // First render => get data
  useEffect(() => {
    getUserData();
    getCategoriesData();
    getRegionsData();
  }, []);

  const loadTable = () => {
    setState({
      text: 'text',
      currentRow: 0,
      columns: [
        {
          title: 'CatalogId',
          field: 'catalogId',
          width: 100,
          hidden: true,
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
          width: 220,
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
                props.onChange(newValue.id);
                const data = {
                  ...categorySelect,
                  categoryId: newValue.id,
                };
                setCategorySelect({ ...data });
              }}
              includeInputInList
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Catégorie"
                  fullWidth
                  error={props.value ? false : categoryError.error}
                  helperText={props.value ? '' : categoryError.helperText}
                />
              )}
            />
          ),
        },
        {
          title: 'Produit',
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
                setProductField({ ...productField, product: event.target.value });
              }}
              placeholder="Produit"
              error={props.value ? false : productError.error}
              helperText={props.value ? '' : productError.helperText}
              onChange={(event) => {
                props.onChange(event.target.value);
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
          editable: 'onAdd',
          editComponent: (props) => (
            <Autocomplete
              id="supplier"
              options={suppliers}
              size="small"
              autoComplete
              disableClearable
              onChange={(event, newValue) => {
                props.onChange(newValue.id);
                const data = {
                  ...supplierSelect,
                  supplierId: newValue.id,
                };
                setSupplierSelect({ ...data });
              }}
              includeInputInList
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Producteur"
                  fullWidth
                  error={props.value ? false : supplierError.error}
                  helperText={props.value ? '' : supplierError.helperText}
                />
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
  }, [suppliers]);

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
            <Paper className={classes.shopkeeperProfilPageContainer} elevation={3}>
              <MaterialTable
                title="Liste des produits par catégorie"
                columns={state.columns}
                data={state.data}
                isLoading={loading}
                icons={{
                  Add: React.forwardRef((props, ref) => (
                    <Button
                      component="a"
                      aria-label="Ajouter un produit"
                      className={classes.addProduct}
                      ref={ref}
                      {...props}
                    >
                      <AddIcon />
                      Ajouter produit
                    </Button>
                  )),
                }}
                editable={{
                  onRowAdd: () => new Promise((resolve, reject) => {
                    setTimeout(() => {
                      const { categoryId } = categorySelect;
                      const { product } = productField;
                      const { supplierId } = supplierSelect;
                      if (categoryId === '' || product === '' || supplierId === '') {
                        reject();
                        return;
                      }
                      setLoading(true);
                      addCatalogItem({ categoryId, product, supplierId });
                      resolve();
                    }, 600);
                  }),
                  onRowUpdate: (newData) => new Promise((resolve, reject) => {
                    setTimeout(() => {
                      const { product } = productField;
                      if (product === '') {
                        reject();
                        return;
                      }
                      setLoading(true);
                      updateCatalogItem(newData);
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
                      <Button
                        aria-label="Ajouter un producteur"
                        className={classes.MToolbarLink}
                        onClick={setSupplierForm}
                      >
                        Ajouter un nouveau producteur ?
                      </Button>
                    </div>
                  ),
                }}
                options={{
                  actionsCellStyle: {
                    backgroundColor: 'rgba(232, 232, 232, .45)',
                  },
                  addRowPosition: 'first',
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
              />
            </Paper>
            <LocalSupplierForm />
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
  suppliers: PropTypes.array.isRequired,
  addCatalogItem: PropTypes.func.isRequired,
  updateCatalogItem: PropTypes.func.isRequired,
  deleteCatalogItem: PropTypes.func.isRequired,
  getUserData: PropTypes.func.isRequired,
  getCategoriesData: PropTypes.func.isRequired,
  getRegionsData: PropTypes.func.isRequired,
  setSupplierForm: PropTypes.func.isRequired,
};

// == Export
export default ShopkeeperProfilPage;
