import React, { useState, useEffect } from 'react';
import { Table, Button, Modal } from 'antd';
import 'antd/dist/antd.css';
import AddServiceModal from './AddServiceModal';
import axios from 'axios';

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://your-api-endpoint/services');
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  const columns = [
    { title: 'Number', dataIndex: 'number', key: 'number' },
    { title: 'Service Name', dataIndex: 'serviceName', key: 'serviceName' },
    { title: 'Service Type', dataIndex: 'serviceType', key: 'serviceType' },
    { title: 'Store Name', dataIndex: 'storeName', key: 'storeName' },
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
    // Implement edit functionality here
    console.log('Edit Service:', record);
  };

  const handleDelete = (record) => {
    // Implement delete functionality here
    console.log('Delete Service:', record);
  };

  const handleAddNewService = () => {
    setAddModalVisible(true);
  };

  return (
    <div>
      <Button onClick={handleAddNewService}>Add New Service</Button>
      <Table dataSource={services} columns={columns} />

      <AddServiceModal
        visible={addModalVisible}
        onCancel={() => setAddModalVisible(false)}
        // Add any necessary props or callbacks for the AddServiceModal
      />
    </div>
  );
};

export default ServicesPage;
