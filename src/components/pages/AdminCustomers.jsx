import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select } from 'antd';
import 'antd/dist/reset.css';
import axios from 'axios';

const { Option } = Select;

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
       await axios.get('http://localhost:3001/order/customers')
        .then((response)=>{
          setCustomers(response.data);
          console.log(customers)
        })
      } catch (error) {
        console.error('Error:', error);
      }
    };
   
    fetchCustomers();
  }, []);



  const columns = [
    { title: 'Number', dataIndex: 'customer_ID', key: 'customer_ID', sorter: (a, b) => a.number - b.number },
    { title: 'Customer Name', dataIndex: 'customer_name', key: 'customer_name', sorter: (a, b) => a.customerName.localeCompare(b.customerName) },
    { title: 'Contact Details', dataIndex: 'customer_phone', key: 'customer_phone' },
    { title: 'Address', dataIndex: 'customer_eMail', key: 'customer_eMail' },
    { title: 'Store Name', dataIndex: 'storeName', key: 'storeName', sorter: (a, b) => a.storeName.localeCompare(b.storeName) },
    { title: 'Status', dataIndex: 'status', key: 'status', filters: [
      { text: 'Active', value: 'active' },
      { text: 'Inactive', value: 'inactive' },
    ], onFilter: (value, record) => record.status === value },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button onClick={() => handleDelete(record)}>Delete</Button>
        </span>
      ),
    },
  ];

  const handleEdit = async (record) => {
    try {
      console.log(record)
      // Fetch the customer data based on the customer ID
       
      const editedCustomer = record
  
      // Open the modal for editing with the fetched customer data
      form.setFieldsValue(editedCustomer);
      setAddModalVisible(true);
    } catch (error) {
      console.error('Error fetching customer for edit:', error);
    }
  };

  const handleDelete = async (record) => {
    try {
      // Send a request to the server to delete the customer
      await axios.delete(`http://localhost:3001/order/customers/${record.customer_ID}`);
      const response = await axios.get('http://localhost:3001/order/customers');
      setCustomers(response.data);
      // Filter out the deleted customer from the state
      // setCustomers(customers.filter((customer) => customer.customer_ID !== record.customer_ID));
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const handleAddNewCustomer = () => {
    form.resetFields();
    setAddModalVisible(true);
  };

  const handleAddCustomer = async (values) => { console.log(values)
    try {
      if (values.customer_ID) {
        // If customer_ID is present
        await axios.put(`http://localhost:3001/order/customers/${values.customer_ID}`, values);
      } else {
        // If no customer_ID
        await axios.post('http://localhost:3001/order/customers', values);
      }
  
      // Fetch the updated data after addition/editing
      const response = await axios.get('http://localhost:3001/order/customers');
      setCustomers(response.data);
  
      // Close the modal
      setAddModalVisible(false);
    } catch (error) {
      console.error('Error adding/updating customer:', error);
    }
  };

  const handleCancel = () => {
    setAddModalVisible(false);
  };

  return (
    <div>
      <Button onClick={handleAddNewCustomer}>Add New Customer</Button>
      <Table dataSource={customers} columns={columns} onChange={(pagination, filters, sorter) => console.log('Table changed', pagination, filters, sorter)} />
      <Modal
        title="Add New Customer"
        visible={addModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleAddCustomer}>
          
        <Form.Item label="Customer ID" name="customer_ID">
          <Input readOnly />
           </Form.Item>
          <Form.Item label="Customer Name" name="customer_name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Contact Details"
            name="customer_phone"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Address" name="customer_eMail" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Store Name" name="storeName" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Status" name="status" rules={[{ required: true }]}>
            <Select>
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
            </Select>
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Add Customer
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminCustomers;
