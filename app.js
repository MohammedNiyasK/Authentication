const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");

const db = require("./db");

const User = db.User;

const app = express();

const bcrypt = require("bcrypt");
const saltRounds = 10;

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, async function (err, hash) {
    // Store hash in your password DB.

    try {
      const newUser = await new User({ email: email, password: hash });

      await newUser.save();
      res.render("secrets");
    } catch (error) {
      console.log(`Error found : ${error}`);
    }
  });
});

app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const user = await User.findOne({ email: username });
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      //login
      res.render("secrets");
    } else {
      res.render("register");
    }
  } catch (error) {
    console.log(`error found : ${error}`);
  }
});

app.listen(3000, () => {
  console.log("server running at port 3000");
});
