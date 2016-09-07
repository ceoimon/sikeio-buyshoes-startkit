const { combineReducers } = require("redux");

const { 
  SET_PRODUCTS,
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
  SET_CART,
  TOGGLE_PRODUCT_LIKE,
  SET_LIKE_PRODUCTS,
  SET_PRODUCTS_FILTER
} = require("./constants");

const item = (state, action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART:
      return (
        state
          ? Object.assign({}, state, {
            quantity: state.quantity + action.quantity
          })
          : {
            id: action.id,
            quantity: action.quantity
          }
      );
    case REMOVE_PRODUCT_FROM_CART:
      return (
        state.quantity > 1
          ? Object.assign({}, state, {
            quantity: Math.max(state.quantity - action.quantity, 0)
          })
          : Object.assign({}, state, {
            quantity: 0
          })
      )
    default:
      return state;
  }
}

const products = (state = [], action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    default:
      return state;
  }
}

const likeProducts = (state = [], action) => {
  switch (action.type) {
    case TOGGLE_PRODUCT_LIKE:
      const index = state.indexOf(action.id);
      return (
        index !== -1
          ? [...state.slice(0, index), ...state.slice(index + 1)]
          : [...state, action.id]
      );
    case SET_LIKE_PRODUCTS:
      return action.products;
    default:
      return state;
  }
}

const productsfilter = (state = "ALL", action) => {
  switch (action.type) {
    case SET_PRODUCTS_FILTER:
      return action.filter;
    default:
      return state;
  }
};

const cart = (state = [], action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART:
      return [...state.slice(0, action.index), item(state[action.index], action), ...state.slice(action.index + 1)];
    case REMOVE_PRODUCT_FROM_CART:
      const remainItem = item(state[action.index], action);
      return (
        remainItem.quantity > 0
          ? [...state.slice(0, action.index), remainItem, ...state.slice(action.index + 1)]
          : [...state.slice(0, action.index), ...state.slice(action.index + 1)]
      );
    case SET_CART:
      return action.cart;
    default:
      return state;
  }
};

module.exports = combineReducers({ cart, products, likeProducts, productsfilter });