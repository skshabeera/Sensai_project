import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import axios from "axios";

function EditProfile({ folderName }) {
  const { userId } = useParams();

  const navigate = useNavigate();
  const [user, setUser] = useState({});
  console.log("user", user);
  const [editedUser, setEditedUser] = useState({
    name: "",
    email: "",
    phone: "",
    profile: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  console.log("imageUrl", imageUrl);
  const [fileId, setFileId] = useState(null);
  console.log("fileId", fileId);

  const handleImageUpload = (event) => {
    setSelectedImage(event.target.files[0]);
  };
  const handleClick = () => {
    console.log("clicked");
    if (!selectedImage) {
      return;
    }
    const data = new FormData();
    console.log(data);
    console.log("namee", folderName);
    data.append("file", selectedImage);

    data.append("upload_preset", "Image_upload");
    data.append("cloud_name", "dvib3dpad");
    data.append("folder", folderName);

    fetch("https://api.cloudinary.com/v1_1/dvib3dpad/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setImageUrl(data.secure_url);
        setFileId(data.fileId);

        console.log(data.secure_url);
      })
      .catch((err) => {
        console.log("error");
      });
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/user/${userId}`
        );
        setUser(response.data);
        setEditedUser(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  const handleSave = async () => {
    try {
      if (selectedImage) {
        console.log("Image uploaded:", imageUrl);
        await handleClick();
        editedUser.profile = imageUrl;
        console.log("image", imageUrl);
      }
      await axios.put(`http://localhost:5000/api/user/${userId}`, editedUser);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/user/all");
        const data = response && response.data;
        const urls = data.map((file) => file.profile);
        console.log("imageUrls", urls);
        setImageUrl(urls);
        console.log("fetched data ::", data);
      } catch (error) {
        console.error("server error");
      }
    };
    fetchData();
  }, []);

  return (
    <Container maxWidth="sm">
      <Card>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Edit Profile
          </Typography>
          <form>
            <TextField
              label="Name"
              fullWidth
              value={editedUser.name}
              onChange={(e) =>
                setEditedUser({ ...editedUser, name: e.target.value })
              }
              margin="normal"
            />
            <TextField
              label="Email"
              fullWidth
              value={editedUser.email}
              onChange={(e) =>
                setEditedUser({ ...editedUser, email: e.target.value })
              }
              margin="normal"
            />
            <TextField
              label="Phone"
              fullWidth
              value={editedUser.phone}
              onChange={(e) =>
                setEditedUser({ ...editedUser, phone: e.target.value })
              }
              margin="normal"
            />
            <br />
            <TextField
              label="Address"
              fullWidth
              value={editedUser.address}
              onChange={(e) =>
                setEditedUser({ ...editedUser, phone: e.target.value })
              }
              margin="normal"
            />
            <br /> <br />
            <input
              type="file"
              className="form-control mb-3"
              onChange={handleImageUpload}
            />
            {imageUrl && (
              <div>
                <img
                  src={imageUrl}
                  alt="Profile"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </div>
            )}
            <br />
            <br />
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}

export default EditProfile;
