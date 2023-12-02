import React, { useState, useEffect } from 'react';
import OrderPopup from './OrderPopup';

const RecentOrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    // fetch orders from the backend
    fetch('http://localhost:3001/recentorders')
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  const handleViewMore = (order) => {
    setSelectedOrder(order);
  };

  const handleEdit = (orderId, updatedData) => {
    // Update the order on the backend
    fetch(`http://localhost:3001/editorder/${orderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((updatedOrder) => {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === updatedOrder.id ? updatedOrder : order
          )
        );
      })
      .catch((error) => console.error('Error updating order:', error));
  };

  return (
    <div>
      <h1>Recent Orders</h1>
      <table>
        <thead>
          <tr>
            <th>Order Info</th>
            <th>Customer</th>
            <th>Order Amount</th>
            <th>Payment Amount</th>
            <th>Store Name</th>
            <th>Status</th>
            <th>View More</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.orderInfo}</td>
              <td>{order.customer}</td>
              <td>{order.orderAmount}</td>
              <td>{order.paymentAmount}</td>
              <td>{order.storeName}</td>
              <td>{order.status}</td>
              <td>
                <button onClick={() => handleViewMore(order)}>View More</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedOrder && (
        <OrderPopup
          order={selectedOrder}
          onEdit={(updatedData) => handleEdit(selectedOrder.id, updatedData)}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default RecentOrdersTable;
