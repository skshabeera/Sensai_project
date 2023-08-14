const express = require("express");
const config = require("config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../../model/Admin");
const TokenModel = require("../../model/Token");
const uuid = require("uuid");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    let admin = await Admin.findOne({ username });
    if (admin) {
      res.status(400).json({ errors: [{ msg: "User is already exists" }] });
    }

    admin = new Admin({
      username,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(password, salt); // Fix this line

    await admin.save();

    const payload = {
      user: {
        id: admin.id,
      },
    };
    jwt.sign(
      payload,
      config.get("jwtSecretKey"),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });

    if (!admin) {
      throw new Error("Admin not found");
    }

    const isPasswordMatch = await bcrypt.compare(password, admin.password);

    if (!isPasswordMatch) {
      throw new Error("Invalid login credentials");
    }

    const token = jwt.sign({ _id: admin._id.toString() }, "your-secret-key");

    res.send({ admin, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
});
router.post("/generate-link", async (req, res) => {
  const Adhaar = req.body.adhaar;
  const registrationToken = uuid.v4();

  try {
    const existingToken = await TokenModel.findOne({ Adhaar });

    if (existingToken) {
      return res
        .status(400)
        .json({ message: "A registration token already exists for this user" });
    }

    const tokenData = new TokenModel({
      Adhaar,
      registrationToken,
    });

    await tokenData.save();

    res.json({ registrationToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
