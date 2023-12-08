import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem } from '@mui/material';
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

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [editRecord, setEditRecord] = useState(null);

  // Placeholder data with unique id property
  const placeholderData = [
    { id: 1, order_id: 1, order_date: '2023-01-01', customer_name: 'John Doe', order_total: 50.99, paid_amount: 20.00, status: 'Pending' },
    { id: 2, order_id: 2, order_date: '2023-01-02', customer_name: 'Jane Smith', order_total: 30.50, paid_amount: 30.50, status: 'Completed' },
    { id: 3, order_id: 3, order_date: '2023-01-03', customer_name: 'Bob Johnson', order_total: 80.00, paid_amount: 0.00, status: 'Canceled' },
  ];

  useEffect(() => {
    setOrders(placeholderData);
  }, []);

  const handleEdit = (record) => {
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
