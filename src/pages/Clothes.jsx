import React, { useState } from 'react';
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

const ClothesType = [
  { clothId: 1, clothType: 'Whites', basePrice: 50 },
  { clothId: 2, clothType: 'Colored', basePrice: 60 },
  { clothId: 3, clothType: 'Delicates', basePrice: 45 },
  { clothId: 4, clothType: 'Denim', basePrice: 50 },
  { clothId: 5, clothType: 'Athletic', basePrice: 50 },
  { clothId: 6, clothType: 'Outwear', basePrice: 50 },
  { clothId: 7, clothType: 'Linens', basePrice: 50 },
  { clothId: 8, clothType: 'Towels', basePrice: 50 },
  { clothId: 9, clothType: 'Curtains', basePrice: 60 },
  { clothId: 10, clothType: 'Rags', basePrice: 45 },
  { clothId: 11, clothType: 'Suits', basePrice: 100 },
];

const Clothes = () => {
  const [clothes, setClothes] = useState(ClothesType);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [editRecord, setEditRecord] = useState(null);

  const handleEdit = (record) => {
    setFormValues({
      clothId: record.clothId,
      clothType: record.clothType,
      basePrice: record.basePrice,
    });

    setEditRecord(record);
    setAddModalVisible(true);
  };

  const handleDelete = (record) => {
    const confirmed = window.confirm('Are you sure you want to delete this clothing type?');
    if (confirmed) {
      setClothes(clothes.filter((c) => c.clothId !== record.clothId));
    }
  };

  const handleAddNewCloth = () => {
    setFormValues({});
    setAddModalVisible(true);
  };

  const handleAddCloth = () => {
    if (editRecord) {
      const updatedClothes = clothes.map((c) =>
        c.clothId === editRecord.clothId ? { ...c, ...formValues } : c
      );
      setClothes(updatedClothes);
      setEditRecord(null);
    } else {
      setClothes([...clothes, { ...formValues, clothId: clothes.length + 1 }]);
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
    { field: 'clothId', headerName: 'ID', flex: 1 },
    { field: 'clothType', headerName: 'Cloth Type', flex: 1 },
    { field: 'basePrice', headerName: 'Base Price', flex: 1 },
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
          onClick={handleAddNewCloth}
          className="mb-2 bg-darkBlue hover:bg-lightBlue text-white font-bold py-1 px-2 rounded"
        >
          Add New Cloth Type
        </StyledButton>
        <div className="bg-screenYellow rounded-3xl w-full p-4 pl-5 h-full">
        <DataGrid
          rows={clothes}
          columns={columns}
          pageSize={6}
          components={{
            Toolbar: GridToolbar,
          }}
          getRowId={(row) => row.clothId}
        />
        </div>
        {addModalVisible && (
          <Dialog open={addModalVisible} onClose={handleCancel}>
            <DialogTitle>{editRecord ? 'Edit Cloth Type' : 'Add New Cloth Type'}</DialogTitle>
            <DialogContent>
              <TextField
                label="Cloth Type"
                name="clothType"
                value={formValues.clothType || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Base Price"
                type="number"
                step=".01"
                min="0"
                name="basePrice"
                value={formValues.basePrice || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </DialogContent>
            <DialogActions>
              <ChangeButton onClick={handleAddCloth} color="primary" variant="contained">
                {editRecord ? 'Update Cloth Type' : 'Add Cloth Type'}
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

export default Clothes;
