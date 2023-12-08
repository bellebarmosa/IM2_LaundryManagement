import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { styled } from '@mui/system';

const StyledButton = styled(Button)({
  backgroundColor: '#448DB8',
  color: 'white',
  fontWeight: 'Bold',
  '&:hover': {
    backgroundColor: '#367396'
  },
});

const ChangeButton = styled(Button)({
  backgroundColor: '#22c55e',
  color: 'white',
  fontWeight: 'Bold',
  '&:hover': {
    backgroundColor: '#196535',
  },
});

const CancelButton = styled(Button)({
  backgroundColor: '#EF4444',
  color: 'white',
  fontWeight: 'Bold',
  '&:hover': {
    backgroundColor: '#882929',
  },
});

const Services = () => {
  const [services, setServices] = useState([]);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [editRecord, setEditRecord] = useState(null);

  // Placeholder data with unique id property
  const placeholderData = [
    { id: 1, service_id: 1, service_name: 'Placeholder Service 1', service_description: 'Description 1', service_price: 20.99 },
    { id: 2, service_id: 2, service_name: 'Placeholder Service 2', service_description: 'Description 2', service_price: 15.99 },
    { id: 3, service_id: 3, service_name: 'Placeholder Service 3', service_description: 'Description 3', service_price: 30.50 },
  ];

  useEffect(() => {
    setServices(placeholderData);
  }, []);

  const handleEdit = (record) => {
    setFormValues({
      service_name: record.service_name,
      service_description: record.service_description,
      service_price: record.service_price,
    });

    setEditRecord(record);
    setAddModalVisible(true);
  };

  const handleDelete = (record) => {
    const confirmed = window.confirm('Are you sure you want to delete this service?');
    if (confirmed) {
      setServices(services.filter((s) => s.id !== record.id));
    }
  };

  const handleAddNewService = () => {
    setFormValues({});
    setAddModalVisible(true);
  };

  const handleAddService = () => {
    if (editRecord) {
      // Update logic for placeholder data
      setServices((prevServices) => {
        const updatedServices = prevServices.map((s) => (s.id === editRecord.id ? { ...s, ...formValues } : s));
        return updatedServices;
      });
      setEditRecord(null);
    } else {
      // Add logic for placeholder data
      const newService = { id: services.length + 1, ...formValues };
      setServices((prevServices) => [...prevServices, newService]);
    }

    setFormValues({});
    setAddModalVisible(false);
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

  const columns = [
    { field: 'service_id', headerName: 'ID', flex: 1 },
    { field: 'service_name', headerName: 'Service Name', flex: 1 },
    { field: 'service_description', headerName: 'Description', flex: 1 },
    { field: 'service_price', headerName: 'Price in PHP', flex: 1 },
    {
      field: 'actions',
      headerName: 'Action',
      flex: 1,
      renderCell: (params) => (
        <>
          <Button onClick={() => handleEdit(params.row)}>Edit</Button>
          <Button onClick={() => handleDelete(params.row)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="w-full h-full flex flex-col px-8 p-3 bg-brightYellow rounded-b-3xl gap-3">
        <StyledButton
          onClick={handleAddNewService}
          className="mb-2 bg-darkBlue hover:bg-lightBlue text-white font-bold py-1 px-2 rounded"
        >
          Add New Service
        </StyledButton>
        <div className="bg-screenYellow rounded-3xl w-full p-4 pl-5 h-full">
          <DataGrid
            rows={services}
            columns={columns}
            pageSize={6}
            components={{
              Toolbar: GridToolbar,
            }}
          />
        </div>
        {addModalVisible && (
          <Dialog open={addModalVisible} onClose={handleCancel}>
            <DialogTitle>{editRecord ? 'Edit Service' : 'Add New Service'}</DialogTitle>
            <DialogContent>
              <TextField
                label="Service Name"
                name="service_name"
                value={formValues.service_name || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Description"
                name="service_description"
                value={formValues.service_description || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
                multiline
                rows={3}
              />
              <TextField
                label="Price in PHP"
                type="number"
                step=".01"
                min="0"
                name="service_price"
                value={formValues.service_price || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </DialogContent>
            <DialogActions>
              <ChangeButton onClick={handleAddService} color="primary" variant="contained">
                {editRecord ? 'Update Service' : 'Add Service'}
              </ChangeButton>
              <CancelButton onClick={handleCancel} color="primary">
                Cancel
              </CancelButton>
            </DialogActions>
          </Dialog>
        )}
      </div>
    </>
  );
};

export default Services;
