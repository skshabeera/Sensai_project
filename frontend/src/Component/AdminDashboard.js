import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { Avatar } from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import Button from "@mui/material/Button";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("users", users);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/user/all");
      console.log(response.data);
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/user/${id}`);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Admin Dashboard
      </Typography>
      <Box mt={4}>
        <Grid container spacing={4} justifyContent="center">
          {loading ? (
            <CircularProgress />
          ) : (
            users.map((user) => (
              <Grid key={user._id} item xs={12} sm={6} md={4} lg={3}>
                <Card elevation={3}>
                  <CardContent>
                    <Avatar
                      src={user.profile}
                      alt={`${user.name}'s profile`}
                      sx={{ width: 80, height: 80, margin: "0 auto" }}
                    />
                    <Typography variant="h6" align="center" gutterBottom>
                      {user.name}
                    </Typography>

                    <Typography color="textSecondary" align="center">
                      Email: {user.email}
                    </Typography>
                    <Typography color="textSecondary" align="center">
                      Address: {user.address}
                    </Typography>
                    <Typography color="textSecondary" align="center">
                      Phone: {user.phone}
                    </Typography>

                    <Box mt={2} textAlign="center">
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default AdminDashboard;
