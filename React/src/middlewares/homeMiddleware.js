import axios from 'axios';

import { GET_REGIONS_DATA, saveRegionsData, GET_CATEGORIES_DATA, saveCategoriesData } from 'src/actions/home';

const homeMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case GET_REGIONS_DATA:
      // axios.get('http://localhost:8000/api/regions')
      axios.get('http://nicolas-chopin.vpnuser.lan:8001/api/regions')
        .then((response) => {
          // callback exécutée en cas de succès (par exemple code de retour 200)
          console.log('success: ', response.data);
          store.dispatch(saveRegionsData(response.data));
        })
        .catch((error) => {
          // callback exécutée en cas d'échec (par exemple code de retour 404)
          console.log('error: ', error);
          // TODO afficher une erreur sur l'écran pour informer l'utilisateur
        });

      next(action);
      break;

    case GET_CATEGORIES_DATA:
      // axios.get('http://localhost:8000/api/categories')
      axios.get('http://nicolas-chopin.vpnuser.lan:8001/api/categories')
        .then((response) => {
          // callback exécutée en cas de succès (par exemple code de retour 200)
          console.log('success: ', response.data);
          store.dispatch(saveCategoriesData(response.data));
        })
        .catch((error) => {
          // callback exécutée en cas d'échec (par exemple code de retour 404)
          console.log('error: ', error);
          // TODO afficher une erreur sur l'écran pour informer l'utilisateur
        });

      next(action);
      break;

    default:
      next(action);
  }
};

export default homeMiddleware;
