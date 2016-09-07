const React = require("react");
const Ps = require("perfect-scrollbar");
const { connect } = require("react-redux");

const QuantityControl = require("./QuantityControl");

const {
  getDummyCart,
  addOneToCart,
  removeOneFromCart,
  removeProductFromCart
} = require("../redux/actions");

let CartItem = ({
  id, quantity,
  price, imagePath, name,
  handleRemoveClick, handleAddClick, handleRemoveAllClick
}) => (
  <div className="cart-item">
    <div className="cart-item__top-part">
      <div className="cart-item__image">
        <img src={imagePath} />
      </div>
      <div className="cart-item__top-part__middle">
        <div className="cart-item__title">
          {name}
        </div>
        <div className="cart-item__price">
          {
            quantity >= 2
              ? `$${price} x ${quantity}`
              : `$${price}`
          }
        </div>
      </div>
      <img onClick={() => handleRemoveAllClick(id, quantity)} className="cart-item__trash" src="img/trash-icon.svg" />
    </div> {/* cart-item__top-part */}
    <div className="cart-item__qty">
      <QuantityControl quantity={quantity} onRemoveClick={() => handleRemoveClick(id)} onAddClick={() => handleAddClick(id)} />
    </div>
  </div>
);

CartItem = connect(
  ({ products }, { id }) => products.find(product => product.get("id") === id).toObject(),
  {
    handleRemoveClick: removeOneFromCart,
    handleAddClick: addOneToCart,
    handleRemoveAllClick: removeProductFromCart
  }
)(CartItem);

class Cart extends React.Component {
  componentDidMount() {
    this.props.getDummyCart();
    Ps.initialize(this.content);
  }

  render() {
    const { cart } = this.props;
    return (
      <div className="cart">
        <h3 className="cart__title">Shopping Cart</h3>
        <div ref={(content) => {this.content = content}} className="cart__content">
          <h3 className="cart__title cart__title--spacer">Shopping Cart</h3>
          {cart.map(item => (<CartItem key={item.id} {...item} />))}
        </div> {/* cart-item */}
      </div>
    );
  }
}

module.exports = connect(state => ({ cart: state.cart.map(item => item.toObject()).toArray() }), { getDummyCart })(Cart);
