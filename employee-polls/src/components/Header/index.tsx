import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button } from "@mui/material";
import {
  selectIsLoggedIn,
  logout,
  selectUserLoggedIn,
} from "../../features/slice/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { showImageUser } from "../../utils/usersUtil";

export default function Header() {
  const isLogged = useSelector(selectIsLoggedIn);
  const userLoggedIn = useSelector(selectUserLoggedIn);
  const navigate = useNavigate()

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login')
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2.5,
        borderBottom: 1.5,
        borderColor: "divider",
      }}
      data-testid="header-box"
    >
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={2} sm={2} sx={{ textAlign: "center" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            Home
          </Link>
        </Grid>
        <Grid item xs={2} sm={2} sx={{ textAlign: "center" }}>
          <Link to="/leaderBoard" style={{ textDecoration: "none" }}>
            Leaderboard
          </Link>
        </Grid>
        <Grid item xs={2} sm={2} sx={{ textAlign: "center" }}>
          <Link to="/add" style={{ textDecoration: "none" }}>
            New
          </Link>
        </Grid>
        <Grid item xs={1} sm={2} sx={{ textAlign: "center" }}></Grid>
        {isLogged ? (
          <Grid item xs={3} sm={2} sx={{ textAlign: "center", cursor: "default" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Avatar
                alt="Avt Login"
                src={showImageUser(userLoggedIn?.avatarURL)}
                sx={{ width: 50, height: 50, marginRight: "10px" }}
              />
              {userLoggedIn?.name}
            </Box>
          </Grid>
        ) : (
          <Grid item xs={1} sm={2} sx={{ textAlign: "center" }}></Grid>
        )}
        <Grid item xs={2} sm={2} sx={{ textAlign: "center" }}>
          {isLogged ? (
            <Button
              onClick={handleLogout}
              size="small"
              variant="outlined"
              color="primary"
            >
              Logout
            </Button>
          ) : (
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button size="small" variant="outlined" color="success">
                Login
              </Button>
            </Link>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
