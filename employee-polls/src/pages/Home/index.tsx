import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Box, Container, Tab, Tabs } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import QuestionList from "../../components/Questions/QuestionList";
import { selectIsLoggedIn } from "../../features/slice/auth/authSlice";

const Home = () => {
  const defaultTheme = createTheme();
  const isUserLoggedIn = useSelector(selectIsLoggedIn);
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const renderPleaseLoginTemplate = () => {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          verticalAlign: "center",
          minHeight: "80vh",
        }}
      >
        {/* <Typography variant="h5" color="secondary" gutterBottom> */}
        Please log in to access the Employee Polls Page.
        {/* </Typography> */}
      </Box>
    );
  };

  const renderTemplateLoggedIn = () => {
    return (
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="md" sx={{ marginTop: "2rem" }}>
          <Tabs value={selectedTab} onChange={handleTabChange}>
            <Tab label="Unanswered Questions" />
            <Tab label="Answered Questions" />
          </Tabs>
          <div style={{ marginTop: "1rem" }}>
            {selectedTab === 0 ? (
              <QuestionList showAnswered={false} />
            ) : (
              <QuestionList showAnswered={true} />
            )}
          </div>
        </Container>
      </ThemeProvider>
    );
  };

  return (
    <>
      {!isUserLoggedIn ? renderPleaseLoginTemplate() : renderTemplateLoggedIn()}
    </>
  );
};

export default Home;
