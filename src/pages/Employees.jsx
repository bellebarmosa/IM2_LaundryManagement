import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

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

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [editRecord, setEditRecord] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:3001/user/employees');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };
    fetchEmployees();
  }, [employees]);

  const handleEdit = async (record) => {
    setFormValues({
      employee_name: record.employee_name,
      employee_phone: record.employee_phone,
      employee_eMail: record.employee_eMail,
      employee_role: record.employee_role,
      employee_password: record.employee_password,
    });

    setEditRecord(record);
    setAddModalVisible(true);
  };

  const handleDelete = async (record) => {
    try {
      const confirmed = window.confirm('Are you sure you want to delete this employee?');
      if (confirmed) {
        await axios.delete(`http://localhost:3001/user/delete/${record.employee_ID}`);
        setEmployees(employees.filter((e) => e.employee_ID !== record.employee_ID));
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleAddNewEmployee = () => {
    setFormValues({});
    setAddModalVisible(true);
  };

  const handleAddEmployee = async () => {
    try {
      if (editRecord) {
        await axios.put(`http://localhost:3001/user/edit/${editRecord.employee_ID}`, formValues);
        setEditRecord(null);
      } else {
        const response = await axios.post('http://localhost:3001/user/register', formValues);
        setEmployees([...employees, response.data]);
      }

      setFormValues({});
      setAddModalVisible(false);
    } catch (error) {
      console.error('Error adding/editing employee:', error);
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
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"> 
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