import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, Box, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Loading from '../Loading';
import { showImageUser } from '../../utils/usersUtil';
import { useSelector } from 'react-redux';
import { selectUsers } from '../../features/slice/users/usersSlice';
import { RootState } from '../../features/store';

export default function Leaderboard() {
  const defaultTheme = createTheme();

  const users = Object.values(useSelector(selectUsers));
  const loading = useSelector((state: RootState) => state.users.loading);
  const error = useSelector((state: RootState) => state.users.error);

  const renderTemplate = () => {
    return (
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="md" sx={{ my: 4 }}>
          {loading && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '50vh'
              }}
            >
              <Loading />
            </Box>
          )}
          {error && (
              <h5>Error: {error}</h5>
          )}
          {!loading && (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>User's name</TableCell>
                    <TableCell>User's Avatar</TableCell>
                    <TableCell>Unanswered</TableCell>
                    <TableCell>Answered</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((u, idx) => {
                    return (
                      <TableRow
                        key={`${u.name}-${idx}`}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 }
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {u.name}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <Avatar
                            alt={`Avartar of ${u.name}`}
                            src={showImageUser(u?.avatarURL)}
                            sx={{ width: 50, height: 50 }}
                          />
                        </TableCell>
                        <TableCell>{u?.questions.length}</TableCell>
                        <TableCell>
                          {Object.values(u?.answers).length}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Container>
      </ThemeProvider>
    );
  };

  return <>{renderTemplate()}</>;
}
