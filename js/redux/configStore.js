const { applyMiddleware, createStore } = require("redux");
const createLogger = require("redux-logger");

const rootReducer = require("./reducers");
const logger = createLogger();

const configStore = (initialState = {}) => {
  return createStore(rootReducer, initialState, applyMiddleware(logger));
}

module.exports = configStore;
