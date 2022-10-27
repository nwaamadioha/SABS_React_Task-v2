import React from 'react'
import { Box, Button, TextField } from '@mui/material';
import { MODES } from '../App'
import { useStoreActions, useStoreState } from 'easy-peasy'

const UserCRUD = () => {

  const user = useStoreState((state) => state.user)
  const firstName = useStoreState((state) => state.firstName)
  const lastName = useStoreState((state) => state.lastName)
  const setFirstName = useStoreActions((actions) => actions.setFirstName)
  const setLastName = useStoreActions((actions) => actions.setLastName)
  const saveUser = useStoreActions((actions) => actions.saveUser)
  const editUser = useStoreActions((actions) => actions.editUser)
  const deleteUser = useStoreActions((actions) => actions.deleteUser)
  const mode = useStoreState((state) => state.mode)
  const reset = useStoreActions((actions) => actions.reset)
  const isEditMode = mode === MODES.EDIT



  const handleCreateUser = () => {
    const id = Math.random() 
    const newUser = {id: id, firstName: firstName, lastName: lastName }
    saveUser(newUser)
  }
  const handleDeleteUser = () => {
    deleteUser(user)
  }
  const handleCancel = () => {
    reset()
  }
  const handleEditUser = () => {
    const editedUser = {id: user.id, firstName: firstName, lastName: lastName}
    editUser(editedUser)
    
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (isEditMode) return handleEditUser(user)
    return handleCreateUser(user)
  }
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
              onChange={(e) => setFirstName(e.target.value )}
              value={firstName}
              label="First Name"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              required
              id="lastName"
              onChange={(e) => setLastName( e.target.value )}
              value={lastName}
              label="Last Name"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <div >
            <Button variant="contained" color="success" type='submit' disabled={!(firstName && lastName)}>
              {isEditMode ? "EDIT" : "CREATE"}
            </Button>
            {
              isEditMode &&
              (<Button variant="contained" color="error" sx={{ ml: 2 }} onClick={handleDeleteUser} >
                DELETE
              </Button>)
            }
            {
              (firstName || lastName) &&
              <Button variant="contained" color="warning" sx={{ ml: 2 }} onClick={handleCancel}>
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