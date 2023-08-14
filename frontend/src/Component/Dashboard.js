import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Container from "@mui/material/Container";
import { Avatar } from "@mui/material";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

function UserDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/user/all");
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        User Dashboard
      </Typography>
      <Grid container spacing={2}>
        {loading ? (
          <CircularProgress />
        ) : (
          users.map((user) => (
            <Grid key={user._id} item xs={12} sm={6} md={4} lg={3}>
              <Card>
                <Avatar
                  src={user.profile}
                  alt={`${user.name}'s profile`}
                  sx={{ width: 80, height: 80, margin: "0 auto" }}
                />

                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {user.name}
                  </Typography>
                  <Typography color="textSecondary">{user.email}</Typography>
                  <Typography color="textSecondary">
                    Phone: {user.phone}
                  </Typography>
                  <br />
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to={`/editprofile/${user._id}`}
                  >
                    Update
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}

export default UserDashboard;
