import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Card, CardContent, CardActions } from "@mui/material";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HypervergeLogo from "./Hyperverge logo.png";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("hgjhkjhjk");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        { email, password }
      );
      console.log("res", response);
      if (response.data) {
        console.log("response", response.data);
        const { token } = response.data;
        setSuccess("Login successful!");
        setOpenSnackbar(true);

        setToken(token);

        navigate("/dashboard");
      } else {
        console.error("Unexpected response format:", response.data);
      }
    } catch (error) {
      setError("Invalid login credentials");
      setSuccess("");
      setOpenSnackbar(true);

      if (error.response) {
        console.error(error.response.data.error);
      } else {
        console.error("Error during request:", error.message);
      }
    }
  };
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="md">
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <Grid
          item
          xs={12}
          md={6}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <img
              src={HypervergeLogo}
              alt="Hyperverge Logo"
              style={{ width: "500px", paddingRight: "150px" }}
            />
          </div>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card
            style={{ width: "100%", textAlign: "center", marginLeft: "180px" }}
          >
            <CardContent>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <h2>Login</h2>
                </Grid>
                <Grid item>
                  <TextField
                    label="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    variant="outlined"
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    variant="outlined"
                    type="password"
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions style={{ justifyContent: "center" }}>
              <Button
                onClick={handleLogin}
                variant="contained"
                color="primary"
                fullWidth
              >
                Login
              </Button>
            </CardActions>
            <p>
              Don't have an account? <Link to="/">Register</Link> here.
            </p>
          </Card>
        </Grid>
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity={error ? "error" : "success"}
        >
          {error || success}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default Login;
