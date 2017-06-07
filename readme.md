# redux-ready

Enhances your redux store with a `store.ready()` method, which resolves once all promises dispatched into the store are fulfilled.

Very handy for server rendering redux applications that initialise with async actions.

### Install

```sh
npm install redux-ready --save
```


### Setup

```js
var withReady = require("redux-ready");

var storeEnhancer = compose(
  withReady, // make sure this comes first
  applyMiddleware(thunk)
);

var store = createStore(reducers, storeEnhancer);
```

### Usage

```js
var app = <Provider store={store}><App /></Provider>;

// Render the app initially to dispatch any actions in components' lifecycle
var html = renderToString(app);

// Wait for async actions to resolve
store
  .ready()
  .then(state => {
    // Re-render app with the async data now in the store
    html = renderToString(app);

    // Serve the app html and state
    res.status(200).render("reactView", { html, state });
  })
  .catch(error => {
    // Serve an error page, or aleternatively, the app with an unresolved state
    res.state(500).render("errorView", { error });
  });

```
