import React from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';

const { Option } = Select;

const AddServiceModal = ({ visible, onCancel }) => {
  const onFinish = (values) => {
    // Implement logic to add a new service
    console.log('Form values:', values);
    // Close the modal
    onCancel();
  };

  return (
    <Modal title="Add New Service" visible={visible} onCancel={onCancel} footer={null}>
      <Form onFinish={onFinish}>
        <Form.Item label="Service Name" name="serviceName" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Service Type" name="serviceType" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Store Name" name="storeName" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Status" name="status" rules={[{ required: true }]}>
          <Select>
            <Option value="available">Available</Option>
            <Option value="unavailable">Unavailable</Option>
          </Select>
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Add Service
        </Button>
      </Form>
    </Modal>
  );
};

export default AddServiceModal;
