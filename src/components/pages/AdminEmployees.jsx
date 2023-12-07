import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select } from 'antd';
import 'antd/dist/reset.css';
import axios from 'axios';

const { Option } = Select;

const AdminEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [addModalVisible, setAddModalVisible] = useState(false);
  
  const [form] = Form.useForm();

  const [editRecord, setEditRecord] = useState(null); // Track the edited

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:3001/user/employees');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };
    fetchEmployees();
  }, [employees]);

  const columns = [
    { title: 'Number', dataIndex: 'employee_ID', key: 'employee_ID', sorter: (a, b) => a.number - b.number },
    { title: 'Employee Name', dataIndex: 'employee_name', key: 'employee_name', sorter: (a, b) => a.employee_name.localeCompare(b.employeeName) },
    { title: 'Contact Details', dataIndex: 'employee_phone', key: 'employee_phone' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    { title: 'EMail', dataIndex: 'employee_eMail', key: 'employee_eMail', sorter: (a, b) => a.storeName.localeCompare(b.storeName) },
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
    // Set the form values with the current data for editing
    form.setFieldsValue({
      employee_name: record.employee_name,
      employee_phone: record.employee_phone,
      employee_eMail: record.employee_eMail,
      employee_role: record.employee_role,
      employee_password: record.employee_password,
    });

    setEditRecord(record); // Set the record being edited
    setAddModalVisible(true); // Open the modal for editing
  };

  const handleDelete = (record) => {
    try {
      // Display a confirmation modal before deleting the employee
      Modal.confirm({
        title: 'Confirm Delete',
        content: 'Are you sure you want to delete this employee?',
        onOk: async () => {
          // If the user confirms, proceed with the delete request
          await axios.delete(`http://localhost:3001/user/delete/${record.employee_ID}`);
          setEmployees(employees.filter((e) => e.employee_ID !== record.employee_ID)); // Update the state after deletion
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleAddNewEmployee = () => {

    form.resetFields();
    setAddModalVisible(true);
  };

  const handleAddEmployee = async (values) => {
    try {
      console.log(values)
      if (editRecord) {
        // If editing, update the employee data
        await axios.put(`http://localhost:3001/user/edit/${editRecord.employee_ID}`, values);
        setEditRecord(null); // Clear the edit record after updating
      } else {
        // If adding, create a new employee
        const response = await axios.post('http://localhost:3001/user/register', values);
        setEmployees([...employees, response.data]);
      }
      console.log(values)

      form.resetFields(); // Reset the form fields
      setAddModalVisible(false); 
     
    } catch (error) {
      console.error('Error adding/editing employee:', error);
    }
  };

  const handleCancel = () => {
    setAddModalVisible(false);
  };

  return (
    <div>
      <Button onClick={handleAddNewEmployee}>Add New Employee</Button>
      <Table
  dataSource={employees}
  columns={columns}
  rowKey={(record) => record.employee_ID} // idk what this does I just chatGPT'd it cause it would give me an error/(I think it gives it a unique key?)
  onChange={(pagination, filters, sorter) => console.log('Table changed', pagination, filters, sorter)}
/>
      <Modal
        title="Add New Employee"
        visible={addModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleAddEmployee}>
          <Form.Item label="Employee Name" name="employee_name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Contact Details" name="employee_phone" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="EMail" name="employee_eMail" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Role" name="employee_role" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Password" name="employee_password" rules={[{ required: true }]}>
            <Input.Password />
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
