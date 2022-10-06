import React from 'react'
import { Box, Button, TextField } from '@mui/material';
import { MODES } from '../App'

const UserCRUD = ({ onCreate, onUpdate, onDelete, user, setUser, mode, onCancel }) => {

  const isEditMode = mode === MODES.EDIT

  const handleDeleteUser = () => {
    onDelete(user)
  };

  const handleCancel = () => {
    onCancel()
  };

  const handleCreateUser = () => {
    onCreate(user)
  };

  const handleEditUser = () => {
    onUpdate(user)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) return handleEditUser(user)
    return handleCreateUser(user)
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <div>
            <TextField
              required
              id="firstName"
              onChange={(e) => setUser({ ...user, firstName: e.target.value })}
              value={user.firstName}
              label="First Name"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              required
              id="lastName"
              onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              value={user.lastName}
              label="Last Name"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <div >
            <Button variant="contained" color="success" type='submit' disabled={!(user.firstName && user.lastName)}>
              {isEditMode ? "EDIT" : "CREATE"}
            </Button>
            {
              isEditMode &&
              (<Button variant="contained" color="error" sx={{ ml: 2 }} onClick={handleDeleteUser} >
                DELETE
              </Button>)
            }
            {
              (user.firstName || user.lastName) &&
              < Button variant="contained" color="warning" sx={{ ml: 2 }} onClick={handleCancel}>
                CANCEL
              </Button>
            }
          </div>
        </div>

      </Box>
    </>
  )
}

export default UserCRUD