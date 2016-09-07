const React = require("react");
const { connect } = require("react-redux");

const { toggleShowLiked } = require("../redux/actions");
const { SHOW_LIKED } = require("../redux/constants");

const SiteTitle = ({ curFilter, onShowLikeClick }) => (
  <div className="title">
    <h2>Buy Me Shoes</h2>
    <img onClick={() => onShowLikeClick(curFilter)} className="title__heart" src={`${curFilter === SHOW_LIKED ? "img/heart-liked.svg" : "img/heart.svg"}`} />
  </div>
);

module.exports = connect(state => ({ curFilter: state.productsfilter }), { onShowLikeClick: toggleShowLiked })(SiteTitle);
