import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

// == Import components
import {
  Paper,
  IconButton,
  Container,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
} from '@material-ui/core';
import MaterialTable from 'material-table';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Loader from 'src/components/Loader';
import NavbarShopkeeperProfil from 'src/containers/Profil/ShopkeeperProfil/NavbarShopkeeperProfil';


// == Import styles
import shopkeeperProfilPageStyles from './shopkeeperProfilPageStyles';


/* const onAdd = (data) => {
  console.log('add ', data);
}; */

// == Composant
const ShopkeeperProfilPage = ({
  loader,
  catalog,
  getUserData,
  onDelete,
  onUpdate,
  onAdd,
  getRegionsData,
  getSuppliersByRegion,
  suppliers,
  regions,
  setFieldValue,
  siret,
  handleSupplierSubmit,
  currentRegion,
}) => {
  const classes = shopkeeperProfilPageStyles();
  const [error, setError] = useState(true);
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({});
  const [regionSelect, setRegionSelect] = useState('');
  const [regionError, setRegionError] = useState(false);

  // First render => get user catalog data
  const handleToggle = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // First render => get user catalog data
  useEffect(() => {
    getUserData();
    getRegionsData();
    if (regionError === false && siret !== '') {
      setError(false);
    }
  }, []);


// console.log('suppliers : ', suppliers);

const a = suppliers.map((supplier) => ({
  // const b = {supplier.id: supplier.name};
  id: supplier.id,
  name: supplier.name,
}));

console.log(a);

  // Local State
  const loadTable = () => {
    setState({
      columns: [
        {
          title: 'Catégorie',
          field: 'category',
          tooltip: 'Catégorie de produit',
          headerStyle: { backgroundColor: '#039be5' },
          cellStyle: { backgroundColor: '#03923d', color: '#FFF' },
        },
        {
          title: 'Produit',
          field: 'product',
          tooltip: 'Produit',
          headerStyle: {
            backgroundColor: '#039be5',
          },
        },
        {
          title: 'Producteur',
          field: 'supplierId',
          tooltip: 'Producteur',
          headerStyle: {
            backgroundColor: '#039be5',
          },
          // // lookup: { 
          //   34: 'İstanbul', 
          //   0: 'Şanlıurfa' }
          // lookup: suppliers.map((supplier) => {
          //   return { 
          //     ...supplier.id, 
          //     ...supplier.name 
          //   };
          // }),
          // lookup: suppliers.map((supplier) => {
          //   supplier;
          // }),
        },
        {
          title: 'Localisation',
          field: 'city',
          tooltip: 'Ville',
          editable: 'never',
          headerStyle: {
            backgroundColor: '#039be5',
          },
        },
        {
          title: 'Code Postal',
          field: 'postalCode',
          tooltip: 'Code Postal',
          editable: 'never',
          headerStyle: {
            backgroundColor: '#039be5',
          },
        },
      ],
      data: catalog,
    });
  };

  // When catalog is updated => set data in local state
  useEffect(() => {
    loadTable();
  }, [catalog]);

  // print current page
  function imprimer_page() {
    window.print();
  };

  const handleChangeRegion = (event) => {
    setRegionSelect(event.target.value);
    const region = regions.find((reg) => reg.id === event.target.value);
    setFieldValue(event.target.name, region.id);
    setRegionError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    handleSupplierSubmit();
    setOpen(false);
  };

  const handleChange = (event) => {
    setFieldValue(event.target.name, event.target.value);
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


    // When catalog is updated => set data in local state
    useEffect(() => {
      getSuppliersByRegion();
      console.log(currentRegion.id);
    }, [currentRegion]);
  


  return (
    <>
      <Loader loader={loader} />
      {!loader && (
        <Container className={classes.shopkeeperProfilContent} component="main" maxWidth="lg">
          <Paper className={classes.root}>
            <IconButton color="primary" component={RouterLink} to="/commercant/profil/informations">
              <ArrowBackIcon fontSize="large" color="action" />
            </IconButton>
            <NavbarShopkeeperProfil />
          </Paper>
          <Paper>
            <MaterialTable
              title="Article par catégorie et Producteur"
              columns={state.columns}
              data={state.data}
              editable={{
                onRowAdd: (newData) =>
                  // eslint-disable-next-line implicit-arrow-linebreak
                  new Promise((resolve) => {
                    setTimeout(() => {
                      onAdd(newData);
                      resolve();
                      setState((prevState) => {
                        const data = [...prevState.data];
                        data.push(newData);
                        return { ...prevState, data };
                      });
                    }, 600);
                  }),
                onRowUpdate: (newData, oldData) =>
                  // eslint-disable-next-line implicit-arrow-linebreak
                  new Promise((resolve) => {
                    setTimeout(() => {
                      onUpdate(newData);
                      resolve();
                      if (oldData) {
                        setState((prevState) => {
                          const data = [...prevState.data];
                          data[data.indexOf(oldData)] = newData;
                          return { ...prevState, data };
                        });
                      }
                    }, 600);
                  }),
                onRowDelete: (oldData) =>
                  // eslint-disable-next-line implicit-arrow-linebreak
                  new Promise((resolve) => {
                    setTimeout(() => {
                      onDelete(oldData);
                      resolve();
                      setState((prevState) => {
                        console.log(prevState);
                        const data = [...prevState.data];
                        data.splice(data.indexOf(oldData), 1);
                        return { ...prevState, data };
                      });
                    }, 600);
                  }),
              }}
              options={{
                exportButton: true,
                filtering: true,
              }}
              actions={[
                {
                  icon: 'local_printshop',
                  iconProps: {
                    color: 'action',
                  },
                  tooltip: 'Imprimer page en cours',
                  isFreeAction: true,
                  onClick: () => {
                    imprimer_page()
                  }
                },
                {
                  icon: 'account_box',
                  iconProps: {
                    color: 'action',
                  },
                  tooltip: 'Ajout producteur',
                  isFreeAction: true,
                  onClick: (event, rowData) => {
                    handleToggle()
                  }
                },

              ]}
            />
          </Paper>
          <Paper>
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
          </Paper>
        </Container>
      )}
    </>
  );
};

ShopkeeperProfilPage.propTypes = {
  loader: PropTypes.bool.isRequired,
  catalog: PropTypes.array.isRequired,
  getUserData: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  getRegionsData: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  setRegion: PropTypes.func.isRequired,
  siret: PropTypes.string.isRequired,
};

// == Export
export default ShopkeeperProfilPage;
