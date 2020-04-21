import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// == Import components
import { Paper, IconButton, Container } from '@material-ui/core';
import MaterialTable from 'material-table';


import ArrowBackIcon from '@material-ui/icons/ArrowBack';

// for the alert
import MuiAlert from '@material-ui/lab/Alert';

import NavbarShopkeeperProfil from '../NavbarShopkeeperProfil';
import ShopkeeperProfilImage from '../ShopkeeperProfilImage';



// datas for the tests
import shopkeeper from 'src/dataShop';

// == Import assets & styles
import shopkeeperProfilPageStyles from './shopkeeperProfilPageStyles';

// Search Snackbar Alert & transition effect
const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// == Import API server config
const server = require('src/api.config.json');


const onDelete = (data) => {
  // console.log('delete ', data);
}
const onAdd = (data) => {
  // console.log('add ', data);
}

const onUpdate = (newData) => {
  // console.log('update ', newData);
}

  const catalog = shopkeeper.catalogs.map((catalog) => (
    { 
      catalogId: catalog.id,
      category: catalog.product.category.name,
      product: catalog.product.name,
      supplier: catalog.localSupplier.name,
      city: catalog.localSupplier.city,
      postalCode: catalog.localSupplier.postalCode,
    }
  ))

// console.log('catalog', catalog);

// == Composant
const ShopkeeperProfilPage = () => {
  const classes = shopkeeperProfilPageStyles()



  const [state, setState] = useState({
    columns: [ 
      { title: 'Catégorie', 
        field: 'category',

      
        headerStyle: { backgroundColor: '#039be5' },
        cellStyle: { backgroundColor: '#03923d', color: '#FFF'},
      }, 
      { title: 'Article', field: 'product', headerStyle: {
        backgroundColor: '#039be5',
      }  },
      { title: 'Producteur', 
        field: 'supplier', 

        headerStyle: {
        backgroundColor: '#039be5',
      }  },
      { title: 'Localisation', field: 'city', headerStyle: {
        backgroundColor: '#039be5',
      }  },
      { title: 'Code Postal', field: 'postalCode', headerStyle: {
        backgroundColor: '#039be5',
      }  },
    ],
    data: catalog,
   
  });

  return (
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
  );
};


// == Export
export default ShopkeeperProfilPage;



