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
  quantity, cartsIndex, isLiked,
  onRemoveClick, onAddClick, onLikeClick
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
              <QuantityControl quantity={quantity} variant="gray" onRemoveClick={() => onRemoveClick(cartsIndex, id)} onAddClick={() => onAddClick(cartsIndex, id)} />
            )
            : (
              <a className="product__add" onClick={() => onAddClick(cartsIndex, id)}>
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
        onClick={() => onLikeClick(id)} 
        className="product__heart" src={`${isLiked ? "img/heart-liked.svg" : "img/heart.svg"}`}
      />
    </div>
  </div>
);

const mapStateToProps = ({ cart, likeProducts }, { id }) => {
  let cartsIndex = cart.length;

  const cartsItem = cart.find((item, i) => {
    if (item.id === id) {
      cartsIndex = i;
      return true;
    } else {
      return false
    }
  });

  const isLiked = likeProducts.indexOf(id) !== -1;

  const quantity = cartsItem ? cartsItem.quantity : 0;

  return { cartsIndex, quantity, isLiked }
};

Product = connect(
  mapStateToProps,
  {
    onRemoveClick: removeOneFromCart,
    onAddClick: addOneToCart,
    onLikeClick: toggleProductLike
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
      return state.products.filter(product => state.likeProducts.indexOf(product.id) !== -1);
    default:
      return state.products;
  }
}

module.exports = connect(state => ({ products: getVisibleProducts(state.productsfilter, state) }), { getDummyProducts })(Products);
