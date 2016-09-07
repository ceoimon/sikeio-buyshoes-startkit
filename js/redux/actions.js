const { products, cart } = require("../data");
const {
  SET_PRODUCTS,
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
  SET_CART,
  TOGGLE_PRODUCT_LIKE,
  SET_LIKE_PRODUCTS,
  SET_PRODUCTS_FILTER,
  ALL,
  SHOW_LIKED,
} = require("./constants");

const getDummyProducts = () => ({ type: SET_PRODUCTS, products });
const getDummyCart = () => ({ type: SET_CART, cart });

const addProductToCart = (id, quantity = 1) => ({ type: ADD_PRODUCT_TO_CART, id, quantity });
const removeProductFromCart = (id, quantity = 1) => ({ type: REMOVE_PRODUCT_FROM_CART, id, quantity });

const addOneToCart = (id) => addProductToCart(id);
const removeOneFromCart = (id) => removeProductFromCart(id);

const toggleProductLike = (id) => ({ type: TOGGLE_PRODUCT_LIKE, id});

const setProductsFilter = (filter) => ({ type: SET_PRODUCTS_FILTER, filter });
const toggleShowLiked = (curFilter) => curFilter === ALL ? { type: SET_PRODUCTS_FILTER, filter: SHOW_LIKED } : { type: SET_PRODUCTS_FILTER, filter: ALL }

module.exports = {
  getDummyProducts,
  getDummyCart,
  addOneToCart,
  removeOneFromCart,
  toggleProductLike,
  removeProductFromCart,
  toggleShowLiked
};
