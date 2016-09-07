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
  id, quantity, index,
  price, imagePath, name,
  onRemoveClick, onAddClick, onRemoveAllClick
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
      <img onClick={() => onRemoveAllClick(index, id, quantity)} className="cart-item__trash" src="img/trash-icon.svg" />
    </div> {/* cart-item__top-part */}
    <div className="cart-item__qty">
      <QuantityControl quantity={quantity} onRemoveClick={() => onRemoveClick(index, id)} onAddClick={() => onAddClick(index, id)} />
    </div>
  </div>
);

CartItem = connect(
  ({ products }, { id }) => products.find(product => product.id === id),
  {
    onRemoveClick: removeOneFromCart,
    onAddClick: addOneToCart,
    onRemoveAllClick: removeProductFromCart
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
          {cart.map((item, index) => (<CartItem key={item.id} {...item} index={index} />))}
        </div> {/* cart-item */}
      </div>
    );
  }
}

module.exports = connect(state => ({ cart: state.cart }), { getDummyCart })(Cart);
