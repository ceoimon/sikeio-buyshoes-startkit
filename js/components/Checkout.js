const React = require("react");
const { connect } = require("react-redux");

const {cartItems,products} = require("../data");

const Checkout = ({ subtotal }) => (
  <div className="checkout">
    <hr className="checkout__divider" />
    <input type="text" className="checkout__coupon-input" placeholder="coupon code" />
    <div className="checkout__line">
      <div className="checkout__line__label">
        Subtotal
      </div>
      <div className="checkout__line__amount">
        {`$${subtotal}`}
      </div>
    </div>
    <a className="checkout__button">
      <img className="checkout__button__icon" src="img/cart-icon.svg" />
      <div className="checkout__button__label">
        Checkout
      </div>
    </a>
  </div>
);

// const calcSubtotal = (cart, products) => cart.map(item => item.toObject()).toArray().reduce((subtotal, item) => subtotal + products.map(product => product.toObject()).toArray().find(product => product.id === item.id)["price"] * item.quantity, 0);

const calcSubtotal = (cart, products) => cart.reduce((subtotal, item) => subtotal + products.find(product => product.get("id") === item.get("id")).get("price") * item.get("quantity"), 0);

module.exports = connect(state => ({ subtotal: calcSubtotal(state.cart, state.products) }), null)(Checkout);
