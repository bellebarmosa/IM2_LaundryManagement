import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
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

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [editRecord, setEditRecord] = useState(null);

  // Placeholder data with unique id property
  const placeholderData = [
    { id: 1, employee_ID: 1, employee_name: 'John Doe', employee_phone: '123-456-7890', employee_eMail: 'john@example.com', employee_role: 'Manager' },
    { id: 2, employee_ID: 2, employee_name: 'Jane Doe', employee_phone: '987-654-3210', employee_eMail: 'jane@example.com', employee_role: 'Developer' },
    { id: 3, employee_ID: 3, employee_name: 'Bob Smith', employee_phone: '555-555-5555', employee_eMail: 'bob@example.com', employee_role: 'Designer' },
  ];

  useEffect(() => {
    setEmployees(placeholderData);
  }, []);

  const handleEdit = (record) => {
    setFormValues({
      employee_name: record.employee_name,
      employee_phone: record.employee_phone,
      employee_eMail: record.employee_eMail,
      employee_role: record.employee_role,
    });

    setEditRecord(record);
    setAddModalVisible(true);
  };

  const handleDelete = (record) => {
    const confirmed = window.confirm('Are you sure you want to delete this employee?');
    if (confirmed) {
      setEmployees(employees.filter((e) => e.id !== record.id));
    }
  };

  const handleAddNewEmployee = () => {
    setFormValues({});
    setAddModalVisible(true);
  };

  const handleAddEmployee = () => {
    if (editRecord) {
      // Update logic for placeholder data
      setEmployees((prevEmployees) => {
        const updatedEmployees = prevEmployees.map((e) => (e.id === editRecord.id ? { ...e, ...formValues } : e));
        return updatedEmployees;
      });
      setEditRecord(null);
    } else {
      // Add logic for placeholder data
      const newEmployee = { id: employees.length + 1, ...formValues };
      setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
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
    { field: 'employee_ID', headerName: 'Number', flex: 1 },
    { field: 'employee_name', headerName: 'Employee Name', flex: 1 },
    { field: 'employee_phone', headerName: 'Contact Details', flex: 1 },
    { field: 'employee_eMail', headerName: 'eMail', flex: 1 },
    { field: 'employee_role', headerName: 'Role', flex: 1 },
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
          onClick={handleAddNewEmployee}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Add New Employee
        </StyledButton>
        <div className="bg-screenYellow rounded-3xl w-full p-4 pl-5 h-full">
          <DataGrid
            rows={employees}
            columns={columns}
            pageSize={6}
            components={{
              Toolbar: GridToolbar,
            }}
          />
        </div>
        {addModalVisible && (
          <Dialog open={addModalVisible} onClose={handleCancel}>
            <DialogTitle>{editRecord ? 'Edit Employee' : 'Add New Employee'}</DialogTitle>
            <DialogContent>
              <TextField
                label="Employee Name"
                name="employee_name"
                value={formValues.employee_name || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Phone Number"
                name="employee_phone"
                value={formValues.employee_phone || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Email Address"
                name="employee_eMail"
                value={formValues.employee_eMail || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Role"
                name="employee_role"
                value={formValues.employee_role || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </DialogContent>
            <DialogActions>
              <ChangeButton onClick={handleAddEmployee} color="primary" variant="contained">
                {editRecord ? 'Update Employee' : 'Add Employee'}
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

export default Employees;
