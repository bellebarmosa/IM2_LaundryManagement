import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select } from 'antd';
import 'antd/dist/reset.css';
import axios from 'axios';

const { Option } = Select;

const AdminEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const columns = [
    { title: 'Number', dataIndex: 'number', key: 'number', sorter: (a, b) => a.number - b.number },
    { title: 'Employee Name', dataIndex: 'employeeName', key: 'employeeName', sorter: (a, b) => a.employeeName.localeCompare(b.employeeName) },
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
    // edit
    console.log('Edit Employee:', record);
  };

  const handleDelete = (record) => {
    // delete
    console.log('Delete Employee:', record);
  };

  const handleAddNewEmployee = () => {
    form.resetFields();
    setAddModalVisible(true);
  };

  const handleAddEmployee = async (values) => {
    try {
      // add new emp
      const response = await axios.post('', values);
      setEmployees([...employees, response.data]); 
      setAddModalVisible(false);
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const handleCancel = () => {
    setAddModalVisible(false);
  };

  return (
    <div>
      <Button onClick={handleAddNewEmployee}>Add New Employee</Button>
      <Table dataSource={employees} columns={columns} onChange={(pagination, filters, sorter) => console.log('Table changed', pagination, filters, sorter)} />
      <Modal
        title="Add New Employee"
        visible={addModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleAddEmployee}>
          <Form.Item label="Employee Name" name="employeeName" rules={[{ required: true }]}>
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
            Add Employee
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminEmployees;
