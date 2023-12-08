import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

  return (
    <>
    <div className="w-full h-full flex flex-col px-8 p-3 bg-brightYellow rounded-b-3xl gap-3">
    <button onClick={handleAddNewEmployee} className="mb-2 bg-darkBlue hover:bg-lightBlue text-white font-bold py-1 px-2 rounded">
        Add New Employee
      </button>
      <div className="bg-screenYellow rounded-3xl w-full p-4 pl-5">
      <table className="w-full table-fixed border-collapse">
        <thead>
          <tr>
            <th className="w-1/8 text-darkBlue">Number</th>
            <th className="w-1/8 text-darkBlue">Employee Name</th>
            <th className="w-1/8 text-darkBlue">Contact Details</th>
            <th className="w-1/8 text-darkBlue">eMail</th>
            <th className="w-1/8 text-darkBlue">Role</th>
            <th className="w-1/8 text-darkBlue">Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((record) => (
            <tr key={record.employee_ID}>
              <td>{record.employee_ID}</td>
              <td>{record.employee_name}</td>
              <td>{record.employee_phone}</td>
              <td>{record.employee_eMail}</td>
              <td>{record.employee_role}</td>
              <td>
                <button onClick={() => handleEdit(record)} className="mr-2 bg-darkBlue hover:bg-lightBlue text-white font-bold py-1 px-2 rounded">
                  Edit
                </button>
                <button onClick={() => handleDelete(record)} className="bg-darkBlue hover:bg-lightBlue text-white font-bold py-1 px-2 rounded">
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
            <label className="block text-darkBlue">Employee Name:</label>
            <input
              type="text"
              name="employee_name"
              value={formValues.employee_name || ''}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-2">
            <label className="block text-darkBlue">Phone Number:</label>
            <input
              type="text"
              name="employee_phone"
              value={formValues.employee_phone || ''}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-2">
            <label className="block text-darkBlue">Email Address:</label>
            <input
              type="text"
              name="employee_eMail"
              value={formValues.employee_eMail || ''}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-2">
            <label className="block text-darkBlue">Role:</label>
            <input
              type="text"
              name="employee_role"
              value={formValues.employee_role || ''}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleAddEmployee}
              className="bg-darkBlue hover:bg-lightBlue text-white font-bold py-2 px-4 rounded"
            >
              {editRecord ? 'Update Employee' : 'Add Employee'}
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
)};

export default Employees