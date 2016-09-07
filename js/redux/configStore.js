const { applyMiddleware, createStore, compose } = require("redux");
const createLogger = require("redux-logger");

const rootReducer = require("./reducers");
const logger = createLogger();

const configStore = (initialState = {}) => {
  return createStore(rootReducer, initialState, compose(applyMiddleware(logger), window.devToolsExtension ? window.devToolsExtension() : f => f));
}

module.exports = configStore;
