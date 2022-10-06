import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
  { id: 'pos', label: 'No', style: { minWidth: 70 } },
  { id: 'firstname', label: 'First Name', style: { minWidth: 130 } },
  { id: 'lastname', label: 'Last Name', style: { minWidth: 130 } },
];


const UserRow = ({ user, position, onClick }) => <TableRow hover role="checkbox" tabIndex={-1} onClick={onClick}>
  <TableCell>{position}</TableCell>
  <TableCell>{user.firstName}</TableCell>
  <TableCell>{user.lastName}</TableCell>
</TableRow>

export default function UsersTable({ users, user onClickUser: handleClickUserRow }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(col => <TableCell style={col.style} key={col.pos}>{col.label}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .map((user, index) => <UserRow user={user} position={index + 1} key={user.id} onClick={() => handleClickUserRow(user)} />)}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper >
  );
}
