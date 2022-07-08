import { Box, LinearProgress } from "@mui/material";

export const Loading = () => (
  <Box
    width={"100%"}
    height={"100%"}
    sx={{
      padding: "20px",
      border: "1px solid #e0e0e0",
      borderRadius: "5px",
    }}
  >
    <LinearProgress />
  </Box>
);
