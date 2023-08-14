import React, { useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Grid,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

function AdminGenerateLink() {
  const [adhaar, setAdhaar] = useState("");
  const [registrationToken, setRegistrationToken] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleGenerateLink = async () => {
    if (!adhaar.trim() || !/^\d{12}$/.test(adhaar)) {
      setErrorMessage("Please fill the Aadhaar Number field.");
      setOpenSnackbar(true);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/generate-link",
        { adhaar }
      );
      setRegistrationToken(response.data.registrationToken);
      setErrorMessage("");
      setOpenSnackbar(false);
    } catch (error) {
      setRegistrationToken("");
      setErrorMessage(error.message);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Card>
          <CardContent>
            <Typography variant="h5" align="center">
              Generate Registration Link
            </Typography>
            <TextField
              label="the  adhaar number must be equal to 12 digits"
              variant="outlined"
              fullWidth
              value={adhaar}
              onChange={(e) => setAdhaar(e.target.value)}
              margin="normal"
              inputProps={{
                pattern: "\\d{12}",
                title: "Aadhaar number must be exactly 12 digits",
              }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleGenerateLink}
            >
              Generate Link
            </Button>
            {registrationToken && (
              <Typography variant="body1" color="textPrimary" align="center">
                Generated Registration Token: {registrationToken}
              </Typography>
            )}

            <Snackbar
              open={openSnackbar}
              autoHideDuration={3000}
              onClose={handleCloseSnackbar}
            >
              <MuiAlert
                elevation={6}
                variant="filled"
                onClose={handleCloseSnackbar}
                severity="error"
              >
                {errorMessage}
              </MuiAlert>
            </Snackbar>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default AdminGenerateLink;
