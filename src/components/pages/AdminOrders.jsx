import React, { useState, useEffect } from 'react';
import { Table, Button, Modal } from 'antd';
import 'antd/dist/reset.css';
import AddOrderModal from '../modules/admin-orders/AddOrderModal';
import ViewOrderModal from '../modules/admin-orders/ViewOrderModal';
import EditOrderModal from '../modules/admin-orders/editOrderModal';
import Axios from 'axios';
import { Link } from "react-router-dom";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [customers, setCustomers] = useState(null);
  
  useEffect(() => {
    // ?????????? irdk
    const fetchOrders = async () => {
      try {
        Axios.get("http://localhost:3001/order/orders")
        .then((response)=>{
          if(response.err){
            console.log(response.err)
          }else{
            setOrders(response.data);
            console.log(response.data)
          }
        })
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    try{
      Axios.get("http://localhost:3001/order/customers")
      .then((response) => {
        if (response.err) {
          console.log(response.err);
        } else {
          setCustomers(response.data);
        }
        console.log(customers)
      });
    }catch{
      console.error('Error fetching customers:', error);
    }
 
  }, []);

//  {customers.find((customer) => customer.customer_ID === order.customer_ID)?.customer_name}

  
const columns = [
  { title: 'Order ID', dataIndex: 'order_ID', key: 'order_ID' },
  {
    title: 'Customer',
    key: 'customer',
    render: (text, record) => (
      customers && customers.find((customer) => customer.customer_ID === record.customer_ID)?.customer_name
    ),
  },
  { title: 'Order Amount', dataIndex: 'order_total', key: 'order_total' },
  { title: 'Status', dataIndex: 'order_status', key: 'order_status' },
  { title: 'Payment', dataIndex: 'order_paidAmount', key: 'order_paidAmount' },
  { title: 'Store Name', dataIndex: 'storeName', key: 'storeName' },
  {
    title: 'Edit',
    key: 'edit',
    render: (text, record) => (
      <Button onClick={() => handleEdit(record)}>Edit</Button>
    ),
  },
  {
    title: 'View',
    key: 'view',
    render: (text, record) => (
      <Link to={`/OrderDetails/${record.order_ID}`}>
      <Button onClick={() => handleView(record)}>View</Button>
      </Link>
    ),
  },
];

const handleEdit = (record) => {
  setSelectedOrder(record);
  setViewModalVisible(true);
  console.log('Edit Order:', record);
};

  const handleView = (record) => {

    // setSelectedOrder(record);
    // setViewModalVisible(true);
  };

  const handleAddNewOrder = () => {
    setAddModalVisible(true);
  };

  const handleEditOrder = (editedOrder) => {
    // Make an API call to update the order in the database
    Axios.put(`http://localhost:3001/order/editorder/${selectedOrder.order_ID}`, { updatedData: editedOrder })
  .then((response) => {
    // Check for errors based on response status or data
    if (response.status === 200) {
      // Update the local orders state with the edited order
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.order_ID === selectedOrder.order_ID ? { ...order, ...editedOrder } : order
        )
      );
      setViewModalVisible(false);
    } else {
      console.log('Error updating order:', response.data);
    }
  })
  .catch((error) => {
    console.error('Error updating order:', error);
  });
  };


  return (
    <div>
      <Button onClick={handleAddNewOrder}>Add New Order</Button>
      <Table dataSource={orders} columns={columns} />

      <AddOrderModal
        visible={addModalVisible}
        onCancel={() => setAddModalVisible(false)}
      />

     <EditOrderModal
        visible={viewModalVisible}
        order={selectedOrder}
        onCancel={() => setViewModalVisible(false)}
        onEditOrder={handleEditOrder}
      />
    </div>
  );
};

export default AdminOrders;
