import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem } from '@mui/material';
import { styled } from '@mui/system';

const StyledButton = styled(Button)({
    backgroundColor: '#448DB8',
    color: 'white',
    fontweight: 'Bold',
    '&:hover': {
      backgroundColor: '#367396'
    },
  });

const ChangeButton = styled(Button)({
    backgroundColor: '#22c55e',
    color: 'white',
    fontweight: 'Bold',
    '&:hover': {
      backgroundColor: '#196535',
    },
})

const CancelButton = styled(Button)({
    backgroundColor: '#EF4444',
    color: 'white',
    fontweight: 'Bold',
    '&:hover': {
      backgroundColor: '#882929',
    },
})

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [editRecord, setEditRecord] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3001/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, [orders]);

  const handleEdit = async (record) => {
    setFormValues({
      order_id: record.order_id,
      order_date: record.order_date,
      customer_name: record.customer_name,
      order_total: record.order_total,
      paid_amount: record.paid_amount,
      status: record.status,
    });

    setEditRecord(record);
    setAddModalVisible(true);
  };

  const handleDelete = async (record) => {
    try {
      const confirmed = window.confirm('Are you sure you want to delete this order?');
      if (confirmed) {
        await axios.delete(`http://localhost:3001/orders/delete/${record.order_id}`);
        setOrders(orders.filter((o) => o.order_id !== record.order_id));
      }
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handleAddNewOrder = () => {
    setFormValues({});
    setAddModalVisible(true);
  };

  const handleAddOrder = async () => {
    try {
      if (editRecord) {
        await axios.put(`http://localhost:3001/orders/edit/${editRecord.order_id}`, formValues);
        setEditRecord(null);
      } else {
        const response = await axios.post('http://localhost:3001/orders/add', formValues);
        setOrders([...orders, response.data]); 
      }

      setFormValues({});
      setAddModalVisible(false);
    } catch (error) {
      console.error('Error adding/editing order:', error);
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
    { field: 'order_id', headerName: 'Order ID', flex: 1 },
    { field: 'order_date', headerName: 'Order Date', flex: 1 },
    { field: 'customer_name', headerName: 'Customer Name', flex: 1 },
    { field: 'order_total', headerName: 'Order Total', flex: 1 },
    { field: 'paid_amount', headerName: 'Paid Amount', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
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
          <DataGrid
            rows={orders}
            columns={columns}
            pageSize={6}
            components={{
              Toolbar: GridToolbar,
            }}
          />
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