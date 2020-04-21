import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

// == Import components
import {
  Paper,
  IconButton,
  Container,
} from '@material-ui/core';
import MaterialTable from 'material-table';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Loader from 'src/components/Loader';
import NavbarShopkeeperProfil from 'src/containers/Profil/ShopkeeperProfil/NavbarShopkeeperProfil';

// == Import styles
import shopkeeperProfilPageStyles from './shopkeeperProfilPageStyles';


// const onDelete = (data) => {
//   deleteCatalogItem(data);
//   console.log('delete ', data);
// };
const onAdd = (data) => {
  console.log('add ', data);
};
// const onUpdate = (newData) => {
//   console.log('update ', newData);
// };

// == Composant
const ShopkeeperProfilPage = ({
  loader,
  catalog,
  getCatalog,
  onDelete,
  onUpdate,
}) => {
  const classes = shopkeeperProfilPageStyles();
  const [state, setState] = useState({});

  // First render => get catalog data
  useEffect(() => {
    getCatalog();
  }, []);

  // Local State
  const loadCatalog = () => {
    setState({
      columns: [
        {
          title: 'Catégorie',
          field: 'category',
          headerStyle: { backgroundColor: '#039be5' },
          cellStyle: { backgroundColor: '#03923d', color: '#FFF' },
        },
        {
          title: 'Article',
          field: 'product',
          headerStyle: {
            backgroundColor: '#039be5',
          },
        },
        {
          title: 'Producteur',
          field: 'supplier',
          headerStyle: {
            backgroundColor: '#039be5',
          },
        },
        {
          title: 'Localisation',
          field: 'city',
          headerStyle: {
            backgroundColor: '#039be5',
          },
        },
        {
          title: 'Code Postal',
          field: 'postalCode',
          headerStyle: {
            backgroundColor: '#039be5',
          },
        },
      ],
      data: catalog,
    });
  };

  // When we have result of getCatalog => local setState
  useEffect(() => {
    loadCatalog();
  }, [!loader]);

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
                  new Promise((resolve) => {
                    setTimeout(() => {
                      onDelete(oldData);
                      resolve();
                      setState((prevState) => {
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
            />
          </Paper>
        </Container>
      )}
    </>
  );
};

ShopkeeperProfilPage.propTypes = {
  loader: PropTypes.bool.isRequired,
  catalog: PropTypes.array.isRequired,
  getCatalog: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

// == Export
export default ShopkeeperProfilPage;
