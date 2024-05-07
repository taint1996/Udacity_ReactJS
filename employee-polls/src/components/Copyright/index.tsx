import Link from "@mui/material/Link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Copyright(props: any) {
  return (
    <div color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Employee Polls
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </div>
  );
}
