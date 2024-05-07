import { Box } from "@mui/material";
import { BallTriangle } from "react-loader-spinner";

const Loading = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "50vh",
        }}
      >
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#181a53"
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </Box>
    </>
  );
};

export default Loading;
