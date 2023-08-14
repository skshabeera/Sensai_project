const express = require("express");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../../model/User");

router.get("/", (req, res) => {
  console.log(req.body);
});
router.post("/register", async (req, res) => {
  const { email, password, name, address, profile, phone } = req.body;
  try {
    const newUser = new User({
      email,
      password,
      name,
      address,
      profile,
      phone,
    });
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    await newUser.save();

    const payload = {
      user: {
        id: newUser.id,
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
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }
    const token = jwt.sign({ userId: user._id }, "jwtSecretKey");
    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
});
router.get("/all", async (req, res) => {
  try {
    const user = await User.find();
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const userData = await User.findById(_id);
    res.send(userData);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const updatedUserData = req.body;
    const userData = await User.findByIdAndUpdate(_id, updatedUserData, {
      new: true,
    });
    res.json(userData);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const userData = await User.findByIdAndRemove(_id);
    res.send(userData);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
