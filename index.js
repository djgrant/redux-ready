module.exports = function (createStore) {
  return function createStoreWithReady(reducer, preloadedState, enhancer) {
    const store = createStore(reducer, preloadedState, enhancer);
    let promises = [];

    const dispatch = function (action) {
      const dispatched = store.dispatch(action);
      if (dispatched && dispatched.then) {
        promises.push(dispatched);
      }
      return dispatched;
    };

    const ready = () => Promise.all(promises).then(() => {
      promises = [];
      return store.getState();
    });

    return Object.assign({}, store, { ready, dispatch });
  };
};
