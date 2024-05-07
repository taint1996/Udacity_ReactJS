import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { handleSaveQuestion } from "../../features/slice/question/questionSlice";
import { AppDispatch } from "../../features/store";
import { useAppDispatch } from "../../features/store/hook";

export const NewPoll = () => {
  const defaultTheme = createTheme();

  const dispatch: AppDispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstOption: "",
      secondOption: "",
    },
  });

  const onSubmit = async (formData: {
    firstOption: string;
    secondOption: string;
  }) => {
    const { firstOption, secondOption } = formData;
    try {
      await dispatch(handleSaveQuestion(firstOption, secondOption));
      navigate("/");
    } catch (error) {
      console.error(`Error at onSubmit Creation Poll: ${error}`);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="md" sx={{ my: 4 }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Would you Rather</Typography>
          <Typography
            variant="h6"
            sx={{ color: "GrayText", fontSize: "1.15rem" }}
          >
            Create Your Own Poll
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <Controller
              name="firstOption"
              control={control}
              rules={{
                required: "This field can't be blank!",
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  fullWidth
                  id="firstOption"
                  data-testid="firstOption"
                  label="First Option"
                  autoComplete="off"
                  autoFocus
                  required
                  error={Boolean(errors?.firstOption)}
                  helperText={errors?.firstOption?.message}
                />
              )}
            />

            <Controller
              name="secondOption"
              control={control}
              rules={{
                required: "Field password can't be blank!",
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  required
                  fullWidth
                  label="Option Two"
                  type="text"
                  id="secondOption"
                  data-testid="secondOption"
                  autoComplete="off"
                  error={Boolean(errors?.secondOption)}
                  helperText={errors?.secondOption?.message}
                />
              )}
            />           

            <Button
              type="submit"
              fullWidth
              variant="contained"
              data-testid="submitNewPoll"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
