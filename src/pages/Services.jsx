import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem } from '@mui/material';
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
})

const CancelButton = styled(Button)({
  backgroundColor: '#EF4444',
  color: 'white',
  fontWeight: 'Bold',
  '&:hover': {
    backgroundColor: '#882929',
  },
})

const PriceList = {
  Whites: {
    machineWash: 50,
    withSoftener: 60,
    withIroning: 70,
    withSoftenerandIroning: 80,
    dryClean: 100
  },
  Colored: {
    machineWash: 60,
    withSoftener: 70,
    withIroning: 80,
    withSoftenerandIroning: 90,
    dryClean: 120
  },
  Delicates: {
    machineWash: 45,
    withSoftener: 55,
    withIroning: 65,
    withSoftenerandIroning: 75,
    dryClean: 80
  },
  Denim: {
    machineWash: 50,
    withSoftener: 60,
    withIroning: 70,
    withSoftenerandIroning: 80,
    dryClean: 150
  },
  Athletic: {
    machineWash: 50,
    withSoftener: 60,
    withIroning: 70,
    withSoftenerandIroning: 80,
    dryClean: 100
  },
  Outwear: {
    machineWash: 50,
    withSoftener: 60,
    withIroning: 70,
    withSoftenerandIroning: 80,
    dryClean: 100
  },
  Linens: {
    machineWash: 50,
    withSoftener: 60,
    withIroning: 70,
    withSoftenerandIroning: 80
  },
  Curtains: {
    machineWash: 60,
    withSoftener: 70,
    withIroning: 80,
    withSoftenerandIroning: 90,
    dryClean: 120
  },
  Towels: {
    machineWash: 30,
    withSoftener: 40,
    withIroning: 40,
    withSoftenerandIroning: 50,
    dryClean: 40
  },
  Rags: {
    machineWash: 45,
    withSoftener: 55,
    withIroning: 65,
    withSoftenerandIroning: 75,
    dryClean: 80
  },
  Suits: {
    machineWash: 100,
    withSoftener: 120,
    withIroning: 130,
    withSoftenerandIroning: 150,
    dryClean: 150
  },
};

const Services = () => {
  const [services, setServices] = useState([]);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [editRecord, setEditRecord] = useState(null);

  useEffect(() => {
    const serviceData = Object.keys(PriceList).map((clothesType, index) => (
      Object.keys(PriceList[clothesType]).map((serviceType, subIndex) => ({
        id: `${index + 1}-${subIndex + 1}`,
        clothes_type: clothesType,
        service_type: serviceType,
        additional_price: PriceList[clothesType][serviceType],
      }))
    )).flat();
    setServices(serviceData);
  }, []);

  const handleEdit = (record) => {
    setFormValues({
      clothes_type: record.clothes_type,
      service_type: record.service_type,
      additional_price: record.additional_price,
    });
  
    setEditRecord(record);
    setAddModalVisible(true);
  };
  
  const handleDelete = (record) => {
    try {
      const confirmed = window.confirm('Are you sure you want to delete this service?');
      if (confirmed) {
        const updatedServices = services.filter((s) => s.id !== record.id);
        setServices(updatedServices);
      }
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  const handleAddService = () => {
    try {
      if (editRecord) {
        const updatedServices = services.map((service) =>
          service.id === editRecord.id
            ? {
                ...service,
                clothes_type: formValues.clothes_type,
                service_type: formValues.service_type,
                additional_price: formValues.additional_price,
              }
            : service
        );
  
        setServices(updatedServices);
        setEditRecord(null);
      } else {
        // Add new logic
        const newService = {
          id: `${services.length + 1}`,
          clothes_type: formValues.clothes_type,
          service_type: formValues.service_type,
          additional_price: formValues.additional_price,
        };
  
        setServices([...services, newService]);
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

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'clothes_type', headerName: 'Clothes Type', flex: 1 },
    { field: 'service_type', headerName: 'Service Type', flex: 1 },
    { field: 'additional_price', headerName: 'Additional Price', flex: 1 },
    {
      field: 'actions',
      headerName: 'Action',
      flex: 1,
      renderCell: (params) => (
        <>
          <ChangeButton onClick={() => handleEdit(params.row)}>Edit</ChangeButton>
          <CancelButton onClick={() => handleDelete(params.row)}>Delete</CancelButton>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="w-full h-full flex flex-col px-8 p-3 bg-brightYellow rounded-b-3xl gap-3">
        <StyledButton
          onClick={() => setAddModalVisible(true)}
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
                label="Clothes Type"
                name="clothes_type"
                value={formValues.clothes_type || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Service Type"
                name="service_type"
                value={formValues.service_type || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Additional Price"
                type="number"
                step=".01"
                min="0"
                name="additional_price"
                value={formValues.additional_price || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </DialogContent>
            <DialogActions>
              <ChangeButton onClick={() => handleAddService()} color="primary" variant="contained">
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
