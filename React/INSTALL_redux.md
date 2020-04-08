# Redux

- [Installation](#installation)
   - [Mise en place du store](#installation-store)
- [Connexion d'un composant au store](#connexion-store)
   - [Mise en place d'un composant container](#connexion-store-1)
   - [mapStateToProps : les props qui lisent une valeur du state](#connexion-store-2)
   - [mapDispatchToProps : les props qui doivent envoyer une action au store, ou qui doivent lancer une action à destination d'un middleware](#connexion-store-3)
- [Avoir plusieurs reducers (combineReducers)](#combine-reducers)
- [Middleware](#middleware)
   - [Mise en place d'un middleware](#installation-middleware)
   - [Réagir à une action dans le middleware](#action-middleware)
   - [Prendre en compte le résultat d'une requête asynchrone dans le middleware](#reponse-middleware)

---
   
# Installation <a name="installation"></a>

`yarn add redux react-redux redux-devtools-extension`

## Mise en place du store <a name="installation-store"></a>

- créer un _reducer_ `src/reducers/nameForTheReducer.js`
``` javascript
const initialState = {
  // ici l'état initial
};

const nameForTheReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    default: return state;
  }
};

export default nameForTheReducer;

```


- créer un _store_ `src/store/index.js`

``` javascript
import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

import reducer from 'src/reducers/nameForTheReducer';

const store = createStore(
  // reducer
  reducer,
  // enhancer
  devToolsEnhancer(),
);

export default store;
```

- utilisation du composant Provider pour que nos composants puissent accéder au _store_. Par exemple dans src/index.js

``` javascript
import { Provider } from 'react-redux';

import store from 'src/store';

[...]

const rootReactElement = (
  <Provider store={store}>
    <App />
  </Provider>
);
```

- on peut alors visualiser le _state_ avec Redux dev tools

# Connexion d'un composant au store <a name="connexion-store"></a>

## Mise en place d'un composant container <a name="connexion-store-1"></a>

- Créer un fichier dans src/containers (garder le même chemin que src/components pour le composant) : assistant pour le composant, qui va faire le lien avec le _store_

``` javascript
import { connect } from 'react-redux';

import LeComposant from 'src/components/...../LeComposant';

const mapStateToProps = (state) => ({
  // nom de la prop à remplir: donnée à récupérer dans le state
});

const mapDispatchToProps = (dispatch) => ({
  // nom de la prop à remplir: callback qui contient un appel à dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LeComposant);

```

- utiliser le nouveau composant à la place du composant de présentation (remplacer _components_ dans l'import par _containers_), et supprimer le cas échéant les props qui sont liées au state

## mapStateToProps : les props qui lisent une valeur du state <a name="connexion-store-2"></a>

- indiquer le nom de la prop à remplir et la propriété du state qui correspond, par exemple :

``` javascript
const mapStateToProps = (state) => {
  return {
    // nom de la prop à remplir: donnée à récupérer dans le state
    messages: state.listMessages,
  };
};
```

=> on va injecter _state.listMessages_ dans la prop _messages_ du composant _LeComposant_ 

## mapDispatchToProps : les props qui doivent envoyer une action au store, ou qui doivent lancer une action à destination d'un middleware <a name="connexion-store-3"></a>

Envoyer une action au store : par exemple si on veut modifier le state

- si on n'a pas encore de fichier pour les actions : créer un fichier `src/actions/nameForTheActions.js`

``` javascript
// action types
export const DO_SOMETHING = 'DO_SOMETHING';

// action creators
export const doSomething = (/* newValue */) => ({
  type: DO_SOMETHING,
  /* value: newValue,*/
});

```

- si l'action dont on a besoin n'existe pas encore : définir le _action type_ ("quelle est l'intention ?") et le _action creator_ (fonction qui permet de créer une action de tel type).

- ajouter le traitement de l'action dans le reducer (= quel est son impact sur le state)

``` javascript
import { DO_SOMETHING } from 'src/actions/nameForTheActions.js';

[...]

switch (action.type) {
    case DO_SOMETHING:
      // on retourne une copie du state
      return {
        // on déverse les informations du state actuel
        ...state,
        // on écrase certaines propriétés du state
        propriété_à_modifier: nouvelle_valeur,
        propriété_à_modifier2: action.payload,
      };
    [...]
```

- dans mapDispatchToProps, indiquer le nom de la prop à remplir et la callback
correspondante, qui utilise _dispatch_ et le _action creator_ pour envoyer l'action

``` javascript
import { doSomething } from 'src/actions/nameForTheActions.js';

const mapDispatchToProps = (dispatch) => ({
  // nom de la prop à remplir: callback qui contient un appel à dispatch
  setValue: (/* param1 */) => {
    dispatch(doSomething(/* param1 */));
  },
});
```

# Avoir plusieurs reducers (combineReducers) <a name="combine-reducers"></a>

Avoir plusieurs reducers permet de ranger les données dans des "tiroirs", de découper le state en plusieurs morceaux, par exemple un reducer pour les données des recettes de cuisine, un reducer pour les données de l'utilisateur.

- Créer un reducer principal qui va combiner les autres reducers => src/reducers/index.js

``` javascript
import { combineReducers } from 'redux';
// on importe tous les reducers
import nomReducer1 from './reducer1';
import nomReducer2 from './reducer2';
// etc
// le reducer principal, qui regroupe les autres
// combineReducers prend en argument un objet qui indique un nom pour
// chaque reducer
const rootReducer = combineReducers({
  nomDuTiroir1: nomReducer1,
  nomDuTiroir2: nomReducer2,
  // etc
});
export default rootReducer;
```

- l'utiliser dans le store : on importe le reducer qui combine les autres `import reducer from 'src/reducers';` et c'est celui-ci qu'on utilise dans _createStore_

- adapter les containers si besoin : par exemple si on utilisait `state.info`, il faut corriger pour utiliser `state.nomDuTiroir.info`

# Middleware <a name="middleware"></a>

## Mise en place d'un middleware <a name="installation-middleware"></a>

- créer un fichier src/middlewares/nomDuMiddleware.js

``` javascript
const leMiddleware = (store) => (next) => (action) => {
  console.log('on a intercepté une action dans le middleware: ', action);
  switch (action.type) {
    default:
      // on passe l'action à son voisin (middleware suivant ou reducer)
      next(action);
  }
};
export default leMiddleware;
```

- utiliser le middleware dans le store (créer ou modifier le fichier src/store/index.js)

``` javascript
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import leMiddleware from 'src/middlewares/leMiddleware';
// on combine devTools avec les middlewares
const enhancers = composeWithDevTools(
  applyMiddleware(
    leMiddleware,
    // ... d'autres middlewares
  ),
);
const store = createStore(
  // reducer
  leReducer,
  // enhancers
  enhancers,
);
export default store;
```

## Réagir à une action dans le middleware <a name="action-middleware"></a>

Je veux par exemple envoyer une requête vers une API quand l'action est LOG_IN.

``` javascript
import { LOG_IN } from 'src/actions/chat';
[...]
switch (action.type) {
  case LOG_IN:
    console.log('on va faire l\'appel Axios');
    // je ne bloque pas l'action, je la passe au voisin
    next(action);
    break;
  [...]
}
```

## Prendre en compte le résultat d'une requête asynchrone dans le middleware <a name="reponse-middleware"></a>

Par exemple, j'ai envoyé une requête vers une API avec Axios, dans 'then' je voudrais fournir une information au store.

- créer une action
- traiter cette action dans le reducer (ajouter l'élément au state initial si ce n'était pas encore fait)
- envoyer cette action au store (dispatch)

``` javascript
  .then((response) => {
    console.log('on a reçu la réponse : ', response);
    store.dispatch(nomActionCreator(response.xxxxxxx.yyyyyy));
  })
```
