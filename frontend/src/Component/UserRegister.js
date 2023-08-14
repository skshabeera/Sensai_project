import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Card, CardContent, CardActions } from "@mui/material";

import Grid from "@mui/material/Grid";
import HypervergeLogo from "./Hyperverge logo.png";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    address: "",
    profile: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const navigate = useNavigate();
  const { email, password, name, address, profile, phone } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!email || !password || !name || !address || !phone) {
      setError("Please fill in all the required fields.");
      setOpenSnackbar(true);
      return;
    }

    const newUser = {
      email,
      password,
      name,
      address,
      profile,
      phone,
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/user/register",
        newUser
      );
      if (res.data.message === "User already registered") {
        setIsRegistered(true);
      } else {
        setSuccess("Registration successful!");
        setIsRegistered(false);
        setOpenSnackbar(true);
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Invalid register credentials");
      setIsRegistered(false);
      setOpenSnackbar(true);
      console.error(err.message);
    }
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
                  <h2>Register</h2>

                  <br />

                  <TextField
                    id="outlined-controlled-email"
                    name="email"
                    label="Email"
                    value={email}
                    onChange={onChange}
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    variant="outlined"
                    type="password"
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="outlined-controlled-password"
                    name="name"
                    label="Name"
                    value={name}
                    onChange={onChange}
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="outlined-controlled-address"
                    name="address"
                    label="Address"
                    value={address}
                    onChange={onChange}
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="outlined-controlled-phone"
                    name="phone"
                    label="Phone"
                    value={phone}
                    onChange={onChange}
                    fullWidth
                  />
                </Grid>
                <br /> <br />
              </Grid>
            </CardContent>
            <CardActions style={{ justifyContent: "center" }}>
              <Button
                onClick={handleRegister}
                variant="contained"
                color="primary"
                fullWidth
              >
                Register
              </Button>
            </CardActions>
            <p>
              Already have an account? <Link to="/login">Login</Link> here.
            </p>
          </Card>
        </Grid>
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000} // Adjust as needed
        onClose={() => setOpenSnackbar(false)}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setOpenSnackbar(false)}
          severity={isRegistered ? "warning" : success ? "success" : "error"}
        >
          {isRegistered
            ? "User is already registered."
            : success
            ? success
            : error}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default Register;
