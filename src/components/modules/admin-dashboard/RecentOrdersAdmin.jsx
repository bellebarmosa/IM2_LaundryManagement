import React, { useState, useEffect } from 'react';
import OrderPopup from './OrderPopup';
import Axios from 'axios'

const RecentOrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [totalCustomers, setTotalCustomers] = useState([]);
  const [orderPopupVisible, setOrderPopupVisible] = useState(false);

  useEffect(() => {
    // fetch orders from the backend
    Axios.get('http://localhost:3001/order/recentorders')
      .then((response) => {
        if (response.err) {
          console.log(response.err);
        } else {
          setOrders(response.data);
        }
      });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3001/order/customers")
      .then((response) => {
        if (response.err) {
          console.log(response.err);
        } else {
          setTotalCustomers(response.data);
        }
      });
  }, []);

  const handleViewMore = (order) => {
    setSelectedOrder(order);
    setOrderPopupVisible(true);
  };

  const handleEdit = (updatedData) => {
    if (!selectedOrder) {
      console.error('No order selected');
      return;
    }
    console.log('Updated Data:', updatedData);
  console.log('Order ID:', selectedOrder.order_ID);
    // Update the order on the backend using Axios
    Axios.put(`http://localhost:3001/order/editorder/${selectedOrder.order_ID}`, { updatedData })
      .then((response) => {
        console.log("EDITED",response.data);
  
        Axios.get('http://localhost:3001/order/recentorders')
          .then((response) => {
            if (response.err) {
              console.log(response.err);
            } else {
              setOrders(response.data);
            }
          });
      })
      .catch((error) => {
        console.error('Error updating order:', error);
        // Handle the error, you might want to show a notification to the user
      });
  
    setOrderPopupVisible(false);
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
            <tr key={order.order_ID}> 
              <td>{order.orderInfo}</td>
              {totalCustomers.find((customer) => customer.customer_ID === order.customer_ID)?.customer_name}
              <td>{order.order_total}</td>
              <td>{order.order_paidAmount}</td>
              <td>{order.storeName}</td>
              <td>{order.order_status}</td>
              <td>
                <button onClick={() => handleViewMore(order)}>View More</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedOrder && (
        <OrderPopup
          visible={orderPopupVisible}
          onCancel={() => setOrderPopupVisible(false)}
          onSubmit={handleEdit}
          selectedOrder={selectedOrder}
        />
      )}
    </div>
  );
};

export default RecentOrdersTable;
