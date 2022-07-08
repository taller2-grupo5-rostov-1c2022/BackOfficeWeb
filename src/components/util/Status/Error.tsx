import { Alert, AlertTitle } from "@mui/material";

export const ErrorBox = () => (
  <Alert
    severity="error"
    sx={{
      width: "100%",
    }}
  >
    <AlertTitle>An error has ocurred.</AlertTitle>
    Please try refreshing the page. If the issue persists, please contact us.
  </Alert>
);
