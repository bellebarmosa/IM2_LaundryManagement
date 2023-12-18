import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { styled } from '@mui/system';
import Axios from 'axios';

const StyledButton = styled(Button)({
  backgroundColor: '#448DB8',
  color: 'white',
  fontWeight: 'Bold',
  '&:hover': {
    backgroundColor: '#367396',
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
  const [placeholder, setServices] = useState({});
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [editRecord, setEditRecord] = useState(null);
  const [priceList,setprices] = useState([]);
  const [PriceList,setPriceList] =  useState([]);
  const [services2,setservices2] = useState([]);
  const [ClothesType,setClothesType] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      try{
        const response = await Axios.get('http://localhost:3001/order/clothetype');
        setClothesType(response.data)
      }catch (error){
        console.error('Error fetching clothetype states:', error);
      }
    }
    fetchData();
   
    },[]);
  

  useEffect(() => {
    // Fetch customer states from your backend or use dummy data
    const fetchservices = async () => {
      try {
        // Fetch customer states from your backend endpoint
        const response = await Axios.get('http://localhost:3001/order/services');
        setservices2(response.data);
      } catch (error) {
        console.error('Error fetching placeholder states:', error);
        // Handle errors here
      }
    };
    // Call the function to fetch customer states
    fetchservices();
    console.log(services2);
  }, []);


  useEffect(() => {
    // Fetch customer states from your backend or use dummy data
    const fetchsetpriceList = async () => {
      try {
        // Fetch customer states from your backend endpoint
        const response = await Axios.get('http://localhost:3001/order/priceList');
        setprices(response.data);
      } catch (error) {
        console.error('Error fetching priceList states:', error);
        // Handle errors here
      }
    };
    // Call the function to fetch customer states
    console.log(priceList);
    fetchsetpriceList();
  }, []);

  useEffect(()=>{
    if(priceList && services2 && ClothesType){
      const generatePriceList = (clotheTypes, services2, priceList) => {
        const priceListObject = {};
      
        // Iterate through each clotheType
        clotheTypes.forEach((clotheType) => {
          const priceListItem = {};
      
          // Iterate through each service
          services2.forEach((service) => {
            // Find the corresponding price in the priceList array
            const priceEntry = priceList.find(
              (entry) =>
                entry.clothetype_ID === clotheType.clotheType_ID &&
                entry.serviceType_ID === service.serviceType_ID
            );
      
            // If a matching entry is found, add it to the priceListItem
            if (priceEntry) {
              priceListItem[service.service_name] = priceEntry.price;
            }
          });
      
          // Add the priceListItem to the priceListObject under the clotheType's name
          priceListObject[clotheType.name] = priceListItem;
        });
      
        return priceListObject;
      };
      
      // Example usage
      const formattedPriceList = generatePriceList(ClothesType, services2, priceList);
      setPriceList(formattedPriceList)
       console.log(formattedPriceList);
    }
  },[ClothesType, services2, priceList])
  


  // Placeholder data
  // const placeholderData = {
  //   Athletic: { withSoftener: 60, withIroning: 70, withSoftenerandIroning: 80, dryClean: 100, machineWash: 50 },
  //   Colored: { withSoftener: 70, withIroning: 80, withSoftenerandIroning: 90, dryClean: 120, machineWash: 60 },
  //   Curtains: { withSoftener: 40, withIroning: 40, withSoftenerandIroning: 50, dryClean: 40, machineWash: 30 },
  //   Delicates: { withSoftener: 55, withIroning: 65, withSoftenerandIroning: 75, dryClean: 80, machineWash: 45 },
  //   Denim: { withSoftener: 60, withIroning: 70, withSoftenerandIroning: 80, dryClean: 150, machineWash: 50 },
  //   Linens: { withSoftener: 60, withIroning: 70, withSoftenerandIroning: 80, machineWash: 50 },
  //   Outwear: { withSoftener: 60, withIroning: 70, withSoftenerandIroning: 80, dryClean: 100, machineWash: 50 },
  //   Rags: { withSoftener: 55, withIroning: 65, withSoftenerandIroning: 75, dryClean: 80, machineWash: 45 },
  //   Suits: { withSoftener: 120, withIroning: 130, withSoftenerandIroning: 150, dryClean: 150, machineWash: 100 },
  //   Towels: { withSoftener: 70, withIroning: 80, withSoftenerandIroning: 90, dryClean: 120, machineWash: 60 },
  //   Whites: { withSoftener: 60, withIroning: 70, withSoftenerandIroning: 80, dryClean: 100, machineWash: 50 },
  // };

  // useEffect(() => {
  //   setServices(placeholderData);
  // }, []);

  const handleEdit = (serviceType) => {
    // Find the serviceType in the PriceList
    const selectedService = PriceList[serviceType];
  
    // Set the original prices into the formValues state
    setFormValues({
      serviceType,
      ...selectedService,
    });
  
    setEditRecord(serviceType);
    setAddModalVisible(true);
  };

  const handleDelete = (serviceType) => {
    const confirmed = window.confirm(`Are you sure you want to delete ${serviceType} service type?`);
    if (confirmed) {
      const { [serviceType]: deletedService, ...remainingServices } = placeholder;
      setServices(remainingServices);
    }
  };

  const handleAddNewService = () => {
    setFormValues({});
    setAddModalVisible(true);
  };

  const handleAddService = () => {
    if (editRecord) { 
      // Update logic for placeholder data
      setServices((prevServices) => ({
        ...prevServices,
        [editRecord]: { ...formValues },
      }));
      setEditRecord(null);
    } else {
      // Add logic for placeholder data
      setServices((prevServices) => ({
        ...prevServices,
        [formValues.serviceType]: { ...formValues },
      }));
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
    { field: 'serviceType', headerName: 'Service Type', flex: 1 },
    { field: 'withSoftener', headerName: 'With Softener', flex: 1 },
    { field: 'withIroning', headerName: 'With Ironing', flex: 1 },
    { field: 'withSoftenerandIroning', headerName: 'With Softener and Ironing', flex: 1 },
    { field: 'dryClean', headerName: 'Dry Clean', flex: 1 },
    { field: 'machineWash', headerName: 'Machine Wash', flex: 1 },
    {
      field: 'actions',
      headerName: 'Action',
      flex: 1,
      renderCell: (params) => (
        <>
          <Button onClick={() => handleEdit(params.row.serviceType)}>Edit</Button>
          <Button onClick={() => handleDelete(params.row.serviceType)}>Delete</Button>
        </>
      ),
    },
  ];

  const rows = Object.keys(PriceList).map((serviceType, index) => ({
    id: index + 1, // You can use a more appropriate way to generate unique ids
    serviceType,
    ...PriceList[serviceType],
  }));

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
  rows={rows}
  columns={columns}
  pageSize={6}
  components={{
    Toolbar: GridToolbar,
  }}
  getRowId={(row) => row.serviceType} // Specify a unique identifier for each row
/>
        </div>
        {addModalVisible && (
      <Dialog open={addModalVisible} onClose={handleCancel}>
               <DialogTitle>{editRecord ? `Edit ${editRecord} Service` : 'Add New Service'}</DialogTitle>
          <DialogContent>

        <TextField
          label="Service Type"
          name="serviceType"
          value={formValues.serviceType || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
          disabled={editRecord !== null}
        />
        <TextField
          label="With Softener"
          type="number"
          name="withSoftener"
          value={formValues.withSoftener || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="With Ironing"
          type="number"
          name="withIroning"
          value={formValues.withIroning || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="With Softener and Ironing"
          type="number"
          name="withSoftenerandIroning"
          value={formValues.withSoftenerandIroning || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Dry Clean"
          type="number"
          name="dryClean"
          value={formValues.dryClean || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Machine Wash"
          type="number"
          name="machineWash"
          value={formValues.machineWash || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
            <ChangeButton onClick={handleAddService} color="primary" variant="contained">
              {editRecord ? `Update ${editRecord} Service` : 'Add Service'}
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