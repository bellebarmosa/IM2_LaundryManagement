// ServicesPage.jsx

import React, { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import AddServiceModal from '../modules/admin-services/AddServiceModal';
import axios from 'axios';

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:3001/order/services');
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const columns = [
    { title: 'Number', dataIndex: 'service_ID', key: 'service_ID' },
    { title: 'Service Name', dataIndex: 'service_name', key: 'service_name' },
    { title: 'Service Type', dataIndex: 'service_description', key: 'service_description' },
    { title: 'Service Price', dataIndex: 'service_price', key: 'service_price' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
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
    setSelectedService(record);
    setAddModalVisible(true);
  };

  const handleDelete = (record) => {
    // Implement delete functionality here
    console.log('Delete Service:', record);
  };

  const handleAddNewService = () => {
    setSelectedService(null);
    setAddModalVisible(true);
  };

  const handleAddOrUpdateService = async (values) => {
    try {
      if (selectedService) {
        // If editing, update the service data
        await axios.put(`http://localhost:3001/order/editService/${selectedService.service_ID}`, values);
      } else {
        // If adding, create a new service
        await axios.post('http://localhost:3001/order/services', values);
      }

      setAddModalVisible(false);
      fetchServices(); // Refresh the service list
    } catch (error) {
      console.error('Error adding/editing service:', error);
    }
  };

  const handleCancel = () => {
    setAddModalVisible(false);
  };

  return (
    <div>
      <Button onClick={handleAddNewService}>Add New Service</Button>
      <Table dataSource={services} columns={columns} rowKey={(record) => record.service_ID} />

      <AddServiceModal
        visible={addModalVisible}
        onCancel={handleCancel}
        onSubmit={handleAddOrUpdateService}
        selectedService={selectedService}
      />
    </div>
  );
};

export default ServicesPage;
