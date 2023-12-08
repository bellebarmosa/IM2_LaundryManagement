import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Services = () => {
  const [services, setServices] = useState([]);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [editRecord, setEditRecord] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:3001/services');
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
    fetchServices();
  }, [services]);

  const handleEdit = async (record) => {
    setFormValues({
      service_name: record.service_name,
      service_description: record.service_description,
      service_price: record.service_price,
    });

    setEditRecord(record);
    setAddModalVisible(true);
  };

  const handleDelete = async (record) => {
    try {
      const confirmed = window.confirm('Are you sure you want to delete this service?');
      if (confirmed) {
        await axios.delete(`http://localhost:3001/services/delete/${record.service_id}`);
        setServices(services.filter((s) => s.service_id !== record.service_id));
      }
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  const handleAddNewService = () => {
    setFormValues({});
    setAddModalVisible(true);
  };

  const handleAddService = async () => {
    try {
      if (editRecord) {
        await axios.put(`http://localhost:3001/services/edit/${editRecord.service_id}`, formValues);
        setEditRecord(null);
      } else {
        const response = await axios.post('http://localhost:3001/services/add', formValues);
        setServices([...services, response.data]);
      }

      setFormValues({});
      setAddModalVisible(false);
    } catch (error) {
      console.error('Error adding/editing service:', error);
    }
  };

  const handleCancel = () => {
    setAddModalVisible(false);
  };

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="w-full h-full flex flex-col px-8 p-3 bg-brightYellow rounded-b-3xl gap-3">
        <button
          onClick={handleAddNewService}
          className="mb-2 bg-darkBlue hover:bg-lightBlue text-white font-bold py-1 px-2 rounded"
        >
          Add New Service
        </button>
        <div className="bg-screenYellow rounded-3xl w-full p-4 pl-5">
          <table className="w-full table-fixed border-collapse">
            <thead>
              <tr>
                <th className="w-1/8 text-darkBlue">ID</th>
                <th className="w-1/8 text-darkBlue">Service Name</th>
                <th className="w-1/8 text-darkBlue">Description</th>
                <th className="w-1/8 text-darkBlue">Price in PHP</th>
                <th className="w-1/8 text-darkBlue">Action</th>
              </tr>
            </thead>
            <tbody>
              {services.map((record) => (
                <tr key={record.service_id}>
                  <td>{record.service_id}</td>
                  <td>{record.service_name}</td>
                  <td>{record.service_description}</td>
                  <td>{record.service_price}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(record)}
                      className="mr-2 bg-darkBlue hover:bg-lightBlue text-white font-bold py-1 px-2 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(record)}
                      className="bg-darkBlue hover:bg-lightBlue text-white font-bold py-1 px-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {addModalVisible && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
              <div className="bg-brightYellow p-5 rounded">
                <div className="mb-2">
                  <label className="block text-darkBlue">Service Name:</label>
                  <input
                    type="text"
                    name="service_name"
                    value={formValues.service_name || ''}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-darkBlue">Description:</label>
                  <textarea
                    name="service_description"
                    value={formValues.service_description || ''}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-darkBlue">Price in PHP:</label>
                  <input
                    type="number"
                    step=".01"
                    min="0"
                    name="service_price"
                    value={formValues.service_price || ''}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={handleAddService}
                    className="bg-darkBlue hover:bg-lightBlue text-white font-bold py-2 px-4 rounded"
                  >
                    {editRecord ? 'Update Service' : 'Add Service'}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="ml-2 bg-darkBlue hover:bg-lightBlue text-white font-bold py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Services;
