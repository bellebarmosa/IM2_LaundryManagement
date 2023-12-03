import React from 'react';
import { Modal, Form, Input, Button } from 'antd';

const AddOrderModal = ({ visible, onCancel }) => {
  const onFinish = (values) => {
    // add new order
    console.log('Form values:', values);
    // close
    onCancel();
  };

  return (
    <Modal title="Add New Order" visible={visible} onCancel={onCancel} footer={null}>
      <Form onFinish={onFinish}>

      <Form.Item label="Order Info" name="orderinfo" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
    
        <Form.Item label="Customer" name="customer" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Order Amount" name="orderamount" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Status" name="status" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Payment" name="payment" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Store Name" name="storename" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Add Order
        </Button>
      </Form>
    </Modal>
  );
};

export default AddOrderModal;
