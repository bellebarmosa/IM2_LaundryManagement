// AddServiceModal.jsx

import React from 'react';
import { Modal, Form, Input } from 'antd';

const AddServiceModal = ({ visible, onCancel, onSubmit, selectedService }) => {
  const [form] = Form.useForm();

  // Set the form values if a service is selected for editing
  React.useEffect(() => {
    if (selectedService) {
      form.setFieldsValue(selectedService);
    }
  }, [selectedService, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        onSubmit(values); // Pass the form values to the parent component
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title={selectedService ? 'Edit Service' : 'Add New Service'}
      visible={visible}
      onCancel={onCancel}
      onOk={handleOk}
    >
      <Form form={form} layout="vertical" name="serviceForm">
        <Form.Item label="Service Name" name="service_name" rules={[{ required: true, message: 'Please enter the service name!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Service Type" name="service_description" rules={[{ required: true, message: 'Please enter the service type!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Service Price" name="service_price" rules={[{ required: true, message: 'Please enter the service price!' }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddServiceModal;
