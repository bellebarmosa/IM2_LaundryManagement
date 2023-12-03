import React, { useState, useEffect } from 'react';
import { Table, Button, Modal } from 'antd';
import 'antd/dist/reset.css';
import AddOrderModal from '../modules/admin-orders/AddOrderModal';
import ViewOrderModal from '../modules/admin-orders/ViewOrderModal';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    // ?????????? irdk
    const fetchOrders = async () => {
      try {
        // const response = await axios.get('');
        // setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const columns = [
    { title: 'Order ID', dataIndex: 'orderId', key: 'orderId' },
    { title: 'Customer', dataIndex: 'customer', key: 'customer' },
    { title: 'Order Amount', dataIndex: 'orderAmount', key: 'orderAmount' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'Payment', dataIndex: 'payment', key: 'payment' },
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
        <Button onClick={() => handleView(record)}>View</Button>
      ),
    },
  ];

  const handleEdit = (record) => {
    // erm
    console.log('Edit Order:', record);
  };

  const handleView = (record) => {
    setSelectedOrder(record);
    setViewModalVisible(true);
  };

  const handleAddNewOrder = () => {
    setAddModalVisible(true);
  };

  return (
    <div>
      <Button onClick={handleAddNewOrder}>Add New Order</Button>
      <Table dataSource={orders} columns={columns} />

      <AddOrderModal
        visible={addModalVisible}
        onCancel={() => setAddModalVisible(false)}
      />

      <ViewOrderModal
        visible={viewModalVisible}
        order={selectedOrder}
        onCancel={() => setViewModalVisible(false)}
      />
    </div>
  );
};

export default AdminOrders;
