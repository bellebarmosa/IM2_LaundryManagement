import React from 'react';
import { Modal, Descriptions, Button } from 'antd';

const ViewOrderModal = ({ visible, order, onCancel }) => {
  return (
    <Modal title="View Order Details" visible={visible} onCancel={onCancel} footer={null}>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Order ID">{order?.orderId}</Descriptions.Item>
        <Descriptions.Item label="Customer">{order?.customer}</Descriptions.Item>
        <Descriptions.Item label="Order Amount">{order?.orderAmount}</Descriptions.Item>
        <Descriptions.Item label="Status">{order?.status}</Descriptions.Item>
        <Descriptions.Item label="Payment">{order?.payment}</Descriptions.Item>
        <Descriptions.Item label="Store Name">{order?.storeName}</Descriptions.Item>
      </Descriptions>

      <Button onClick={onCancel}>Close</Button>
    </Modal>
  );
};

export default ViewOrderModal;
