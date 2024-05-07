import { Box, Typography } from "@mui/material";

const NotFound = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: "10rem",
      }}
      data-testid="not-found-box"
    >
      <Typography variant="h3">404 - Page Not Found</Typography>
      <br />
      <Typography variant="h6">
        Oops! The page you are looking for does not exist.
      </Typography>
    </Box>
  );
};

export default NotFound;
