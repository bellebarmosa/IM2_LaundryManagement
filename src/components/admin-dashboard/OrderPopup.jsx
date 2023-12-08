import React, { useState } from 'react';

const OrderPopup = ({ order, onEdit, onClose }) => {
  const [editedOrder, setEditedOrder] = useState({ ...order });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedOrder((prevOrder) => ({ ...prevOrder, [name]: value }));
  };

  const handleEdit = () => {
    onEdit(editedOrder);
    onClose();
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Order Details</h2>
        <label>
          Order Info:
          <input
            type="text"
            name="orderInfo"
            value={editedOrder.orderInfo}
            onChange={handleChange}
          />
        </label>
        <label>
          Customer:
          <input
            type="text"
            name="customer"
            value={editedOrder.customer_name}
            onChange={handleChange}
          />
        </label>
        <label>
          Order Amount:
          <input
            type="number"
            name="orderAmount"
            value={editedOrder.order_total}
            onChange={handleChange}
          />
        </label>
        <label>
          Payment Amount:
          <input
            type="number"
            name="paymentAmount"
            value={editedOrder.order_paidAmount}
            onChange={handleChange}
          />
        </label>
        <label>
          Store Name:
          <input
            type="text"
            name="storeName"
            value={editedOrder.storeName}
            onChange={handleChange}
          />
        </label>
        <label>
          Status:
          <input
            type="text"
            name="status"
            value={editedOrder.status}
            onChange={handleChange}
          />
        </label>
        <button onClick={handleEdit}>Edit</button>
      </div>
    </div>
  );
};

export default OrderPopup;
