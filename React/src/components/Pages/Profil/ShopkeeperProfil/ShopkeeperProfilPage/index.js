import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// == Import components
import { Paper, IconButton, Container } from '@material-ui/core';
import MaterialTable from 'material-table';
import MUIDataTable from "mui-datatables";

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

// == Composant
const ShopkeeperProfilPage = () => {
  const classes = shopkeeperProfilPageStyles()


  const [state, setState] = useState({
    columns: [
      {
        title: 'Catégorie', field: 'category', cellStyle: {
          backgroundColor: '#039be5',
          color: '#FFF'
        },
        headerStyle: {
          backgroundColor: '#eee',
        }
      },
      { title: 'Article', field: 'product' },
      { title: 'Producteur', field: 'supplier' },
      {
        title: 'Localité',
        field: 'city',
      },
      { title: 'Code postal', field: 'postalCode', lookup: { 75: 'Paris', 74: 'Bloix' }, },
    ],
    data: [
      {
        category: 'Fruits',
        product: 'adipisci',
        supplier: 'Leblanc S.A.S.',
        city: 'Paris',
        postalCode: 75,

      },
      {
        category: 'savon noir',
        product: 'Entretien et Nettoyage',
        supplier: 'Perrier',
        city: 'Bloix',
        postalCode: 74,
      },
    ],
  });

  const columns = ["Catégorie", "Article", "Producteur", "Localisation"];
  const dataBis = [
    ["Fruits", "adipisci", "Leblanc S.A.S.", "Paris"],
    ["savon noir", "Entretien et Nettoyage", "Perrier", "Bloix"],
  ];

  return (
    <Container className={classes.shopkeeperProfilContent} component="main" maxWidth="lg">
      <Paper className={classes.root}>
        <IconButton color="primary" component={RouterLink} to="/commercant/profil/informations">
          <ArrowBackIcon fontSize="large" color="action" />
        </IconButton>
        <NavbarShopkeeperProfil />

        <MaterialTable
          title="Liste des articles par catégories et par producteurs"
          columns={state.columns}
          data={state.data}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                setTimeout(() => {
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
            filtering: true
          }}
          actions={[
            {
              icon: 'save',
              tooltip: 'Save User',
              onClick: (event, rowData) => alert("You saved " + rowData.name)
            }
          ]}
        />

        <MUIDataTable
          title={"Article par gatégorie et producteur"}
          data={dataBis}
          columns={columns}
          options={options}
        />
  );
      </Paper>
    </Container>
  );
};


// == Export
export default ShopkeeperProfilPage;
