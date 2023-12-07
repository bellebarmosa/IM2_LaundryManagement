import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, DatePicker, Select } from 'antd';

const { Option } = Select;

const EditOrderModal = ({ visible, onCancel, onEditOrder, order }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (order) {
      form.setFieldsValue(order);
    }
  }, [order, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        onEditOrder(values);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title={order ? 'Edit Order' : 'View Order'}
      visible={visible}
      onCancel={onCancel}
      onOk={handleOk}
    >
      <Form form={form} layout="vertical" name="orderForm">
        <Form.Item label="Order ID" name="order_ID">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Order Amount" name="order_total">
          <Input />
        </Form.Item>
        <Form.Item label="Order Status" name="order_status">
          <Select>
            <Option value="Pending">Pending</Option>
            <Option value="Processing">Processing</Option>
            <Option value="Finished">Finished</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Payment Amount" name="order_paidAmount">
          <Input />
        </Form.Item>
        {/* Add other form fields as needed */}
      </Form>
    </Modal>
  );
};

export default EditOrderModal;