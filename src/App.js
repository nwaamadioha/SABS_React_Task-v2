import { useEffect } from 'react'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import { Box, CssBaseline, Toolbar, Typography, Container, Grid, Paper } from '@mui/material';


import db from './db'
import UserCRUD from './components/UserCRUD'
import UsersTable from './components/UsersTable';
import { useStoreActions } from 'easy-peasy';

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
//export const newUser = () => ({ firstName: '', lastName: '', id: Math.random() + '' })

const App = () => {

  const setUsers = useStoreActions((actions) => actions.setUsers)
  const data = db.users
  const setMode = useStoreActions((actions) => actions.setMode)

  
  useEffect(() => {
    setUsers(data)
    setMode(MODES.CREATE)
  }, [data, setUsers, setMode])

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
                  <UserCRUD />
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
                  <UsersTable />
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