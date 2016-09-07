const React = require("react");
const { connect } = require("react-redux");

const QuantityControl = require("./QuantityControl");

const {
  getDummyProducts,
  addOneToCart,
  removeOneFromCart,
  toggleProductLike
} = require("../redux/actions");

let Product = ({ 
  id, 
  name, price, imagePath,
  quantity, isLiked,
  handleRemoveClick, handleAddClick, handleLikeClick
}) => (
  <div className="product">
    <div className="product__display">
      <div className="product__img-wrapper">
        <img className="product__img" src={imagePath} />
      </div>
      <div className="product__control">
        {
          quantity > 0
            ? (
              <QuantityControl quantity={quantity} variant="gray" onRemoveClick={() => handleRemoveClick(id)} onAddClick={() => handleAddClick(id)} />
            )
            : (
              <a className="product__add" onClick={() => handleAddClick(id)}>
                <img className="product__add__icon" src="img/cart-icon.svg" />
              </a>
            )
        }
      </div>
      <div className="product__price">
        {"$" + price}
      </div>
    </div>
    <div className="product__description">
      <div className="product__name">
        {name}
      </div>
      <img 
        onClick={() => handleLikeClick(id)} 
        className="product__heart" src={`${isLiked ? "img/heart-liked.svg" : "img/heart.svg"}`}
      />
    </div>
  </div>
);

Product = connect(
  ({ cart, likeProducts }, { id }) => ({ 
    quantity: cart.getIn([id, "quantity"], 0),
    isLiked: likeProducts.includes(id) }
  ),
  {
    handleRemoveClick: removeOneFromCart,
    handleAddClick: addOneToCart,
    handleLikeClick: toggleProductLike
  }
)(Product);

class Products extends React.Component {
  componentDidMount() {
    this.props.getDummyProducts();
  }

  render() {
    const { products } = this.props;
    return (
      <div ref="products" className="products">
        {products.map(product => (<Product key={product.id} {...product} />))}
      </div>
    );
  }
}

const getVisibleProducts = (filter, state) => {
  switch (filter) {
    case "SHOW_LIKED":
      return state.products.filter(product => state.likeProducts.includes(product.get("id"))).map(product => product.toObject()).toArray();
    default:
      return state.products.map(product => product.toObject()).toArray();
  }
}

module.exports = connect(state => ({ products: getVisibleProducts(state.productsfilter, state) }), { getDummyProducts })(Products);
