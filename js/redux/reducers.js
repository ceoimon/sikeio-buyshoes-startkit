const { combineReducers } = require("redux");
const { List, OrderedMap, Set, fromJS, Map } = require("immutable");

const { 
  SET_PRODUCTS,
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
  SET_CART,
  TOGGLE_PRODUCT_LIKE,
  SET_LIKE_PRODUCTS,
  SET_PRODUCTS_FILTER,
  ALL,
  SHOW_LIKED
} = require("./constants");

const products = (state = List(), action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return fromJS(action.products).toList();
    default:
      return state;
  }
}

const likeProducts = (state = Set(), action) => {
  switch (action.type) {
    case TOGGLE_PRODUCT_LIKE:
      return (
        state.has(action.id)
          ? state.delete(action.id)
          : state.add(action.id)
      );
    case SET_LIKE_PRODUCTS:
      return Set(action.products);
    default:
      return state;
  }
}

const productsfilter = (state = ALL, action) => {
  switch (action.type) {
    case SET_PRODUCTS_FILTER:
      return action.filter;
    default:
      return state;
  }
};

const cart = (state = OrderedMap(), action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART:
      return state.update(action.id, Map({
        id: action.id,
        quantity: 0
      }), item => item.update("quantity", quantity => quantity + action.quantity));
    case REMOVE_PRODUCT_FROM_CART:
      return state.updateIn([action.id, "quantity"], quantity => Math.max(quantity - action.quantity, 0)).filter(item => item.get("quantity") > 0);
    case SET_CART:
      return fromJS(action.cart).toOrderedMap();
    default:
      return state;
  }
};

module.exports = combineReducers({ cart, products, likeProducts, productsfilter });
