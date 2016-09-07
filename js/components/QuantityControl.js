const React = require("react");

const QuantityControl = ({ variant, quantity, onRemoveClick, onAddClick }) => (
  <div className={variant === "gray" ? "adjust-qty adjust-qty--gray" : "adjust-qty"}>
    <a className="adjust-qty__button" onClick={onRemoveClick}>-</a>
    <div className="adjust-qty__number">{quantity}</div>
    <a className="adjust-qty__button" onClick={onAddClick}>+</a>
  </div>
);

module.exports = QuantityControl;