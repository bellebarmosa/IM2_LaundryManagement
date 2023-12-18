import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import Axios from 'axios';

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

const Orders = () => {
  // const [orders, setOrders] = useState([]);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [editRecord, setEditRecord] = useState(null);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);


  useEffect(() => {
    const fetchsetorders = async () => {
      try {
        const response = await Axios.get('http://localhost:3001/order/orders');
        const ordersWithId = response.data.map((order) => ({
          ...order,
          id: order.order_ID, // Assuming order_ID is unique
        }));
        setOrders(ordersWithId);
      } catch (error) {
        console.error('Error fetching orders', error);
        // Handle errors here
      }
    };
    console.log(orders)
    fetchsetorders();
  }, []);

  useEffect(() => {
    // Fetch customer states from your backend or use dummy data
    const fetchCustomerStates = async () => {
      try {
        // Fetch customer states from your backend endpoint
        const response = await Axios.get('http://localhost:3001/order/customers');
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customer states:', error);
        // Handle errors here
      }
    };
    // Call the function to fetch customer states
    console.log(customers)
    fetchCustomerStates();
  }, []);


  
  const handleEdit = (record) => {
    setEditRecord(record);
    setFormValues({
      ...record,
      order_date: formatDate(record.order_date), // Format date for display
      orderpickup_date: formatDate(record.orderpickup_date), // Format pickup date for display
    });
    setAddModalVisible(true);
  };

  const handleDelete = (record) => {
    const confirmed = window.confirm('Are you sure you want to delete this order?');
    if (confirmed) {
      setOrders(orders.filter((o) => o.id !== record.id));
    }
  };

  const handleAddNewOrder = () => {
    setFormValues({});
    setAddModalVisible(true);
  };

  const handleAddOrder = () => {
    if (editRecord) {
      // Update logic for placeholder data
      setOrders((prevOrders) => {
        const updatedOrders = prevOrders.map((o) => (o.id === editRecord.id ? { ...o, ...formValues } : o));
        return updatedOrders;
      });
      setEditRecord(null);
    } else {
      // Add logic for placeholder data
      const newOrder = { id: orders.length + 1, ...formValues };
      setOrders((prevOrders) => [...prevOrders, newOrder]);
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

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const customerName = (customer_ID) => {
    if(customers.length != 0){
      const customer = customers.find((customer)=>customer.customer_ID === customer_ID);

      return customer.customer_name;
    }
    return;
  }

  const columns = [
    { field: 'order_ID', headerName: 'Order ID', flex: 1 },
    { field: 'order_date', headerName: 'Order Date', flex: 1, renderCell: (params) => formatDate(params.value)},
    { field: 'customer_ID', headerName: 'Customer Name', flex: 1, renderCell: (params) => customerName(params.value)},
    { field: 'order_total', headerName: 'Order Total', flex: 1 },
    { field: 'orderpickup_date', headerName: 'Pick Up Date', flex: 1, renderCell: (params) => formatDate(params.value)},
    { field: 'order_status', headerName: 'Status', flex: 1 },
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
          onClick={handleAddNewOrder}
          className="mb-2 bg-darkBlue hover:bg-lightBlue text-white font-bold py-2 px-4 rounded"
        >
          Add New Order
        </StyledButton>
        <div className="bg-screenYellow rounded-3xl w-full p-4 pl-5 h-full">
          {orders && <DataGrid
            rows={orders}
            columns={columns}
            pageSize={6}
            components={{
              Toolbar: GridToolbar,
            }}
          /> }
        </div>
        {addModalVisible && (
          <Dialog open={addModalVisible} onClose={handleCancel}>
            <DialogTitle>{editRecord ? 'Edit Order' : 'Add New Order'}</DialogTitle>
            <DialogContent>
              <TextField
                label="Order ID"
                name="order_id"
                value={formValues.order_id || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Order Date"
                name="order_date"
                type="date"
                value={formValues.order_date || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Customer Name"
                name="customer_name"
                value={formValues.customer_name || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Order Total"
                name="order_total"
                type="number"
                step=".01"
                min="0"
                value={formValues.order_total || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Paid Amount"
                name="paid_amount"
                type="number"
                step=".01"
                min="0"
                value={formValues.paid_amount || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                select
                label="Status"
                name="status"
                value={formValues.status || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Canceled">Canceled</MenuItem>
              </TextField>
            </DialogContent>
            <DialogActions>
              <ChangeButton onClick={handleAddOrder} color="primary" variant="contained" className="mb-2 bg-darkBlue hover:bg-lightBlue text-white font-bold py-2 px-4 rounded">
                {editRecord ? 'Update Order' : 'Add Order'}
              </ChangeButton>
              <CancelButton onClick={handleCancel} color="primary" className="mb-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Cancel
              </CancelButton>
            </DialogActions>
          </Dialog>
        )}
      </div>
    </>
  );
};

export default Orders;
