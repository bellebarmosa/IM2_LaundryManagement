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
        const response = await axios.get('');
        setCustomers(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchCustomers();
  }, []);

  const columns = [
    { title: 'Number', dataIndex: 'number', key: 'number', sorter: (a, b) => a.number - b.number },
    { title: 'Customer Name', dataIndex: 'customerName', key: 'customerName', sorter: (a, b) => a.customerName.localeCompare(b.customerName) },
    { title: 'Contact Details', dataIndex: 'contactDetails', key: 'contactDetails' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
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

  const handleEdit = (record) => {
    // Implement edit functionality here
    console.log('Edit Customer:', record);
  };

  const handleDelete = (record) => {
    // Implement delete functionality here
    console.log('Delete Customer:', record);
  };

  const handleAddNewCustomer = () => {
    form.resetFields();
    setAddModalVisible(true);
  };

  const handleAddCustomer = async (values) => {
    try {
      // Implement logic to add a new customer to the SQL database
      const response = await axios.post('', values);
      setCustomers([...customers, response.data]); // Update the table with the new data
      setAddModalVisible(false); // Close the modal
    } catch (error) {
      console.error('Error adding customer:', error);
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
          <Form.Item label="Customer Name" name="customerName" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Contact Details"
            name="contactDetails"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Address" name="address" rules={[{ required: true }]}>
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
