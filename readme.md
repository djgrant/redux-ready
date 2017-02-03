# redux-ready

A store enhancer that adds a ready() function to the store. ready() returns a promise that resolves once all promises that have been dispatched to the store are fulfilled.

Very handy for server rendering redux applications that initialise with async actions.

### Install

```sh
npm install redux-ready  --save
```

### Set up

```js
var withReady = require('redux-ready');

var storeEnhancer = compose(
  withReady, // make sure this comes first
  applyMiddleware(thunk)
);

var store = createStore(reducers, {}, storeEnhancer);
```

### Usage

```js
var app = <Provider store={store}><App /></Provider>;

// Initial render of app dispatches any actions in components' lifecycle
renderToString(app);

// Wait for async actions to resolve
store.ready().then(state => {
  // Re-render app with the async data now in the store
  var appHtml = renderToString(app);
  res.status(200).render('react', { appHtml, storeState: state });
});
```
