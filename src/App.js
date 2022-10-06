import React, { useState } from 'react'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import { Box, CssBaseline, Toolbar, Typography, Container, Grid, Paper } from '@mui/material';


import db from './db'
import UserCRUD from './components/UserCRUD'
import UsersTable from './components/UsersTable';

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1
}));

const mdTheme = createTheme();

//To know when we are creating a new user or editing an already existing one
export const MODES = {
  CREATE: 'CREATE_MODE',
  EDIT: 'EDIT_MODE'
}
// Generate a new user object
export const newUser = () => ({ firstName: '', lastName: '', id: Math.random() + '' })

const App = () => {
  // initialize users from db
  const [users, setUsers] = useState(db.users);
  const [user, setUser] = useState(newUser());
  const [mode, setMode] = useState(MODES.CREATE);

  // Clear the user and set the mode back to create
  const reset = () => {
    setUser(newUser());
    setMode(MODES.CREATE);
  }

  // Create new user
  const addUser = (newUser) => {
    const newUsers = [...users, newUser]
    setUsers(newUsers)
    reset()
  }

  // Edit a user
  const updateUser = (modifiedUser) => {
    const newUsers = users.map(user => user.id === modifiedUser.id ? modifiedUser : user)
    setUsers(newUsers)
    reset()
  }

  // Delete a user
  const deleteUser = (removeUser) => {
    const newUsers = users.filter(user => user.id !== removeUser.id)
    setUsers(newUsers)
    reset()
  }

  // Pick user from table to and set it for editing
  const editUser = (user) => {
    setUser(user)
    setMode(MODES.EDIT)
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" >
          <Toolbar
            sx={{
              backgroundColor: '#010606',
              pr: '24px',
            }}
          >
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              React Task
            </Typography>
          </Toolbar>
        </AppBar>

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 200,
                    backgroundColor: "#bec7f8"
                  }}
                >
                  <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    align='left'
                    sx={{ flexGrow: 1 }}
                  >
                    USER MANAGEMENT
                  </Typography>
                  <UserCRUD onCreate={addUser} onUpdate={updateUser} onDelete={deleteUser} user={user} setUser={setUser} mode={mode} onCancel={reset} />
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    align='left'
                    sx={{ flexGrow: 1 }}
                  >
                    USERS
                  </Typography>
                  <UsersTable users={users} onClickUser={editUser} activeUser={user} />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App