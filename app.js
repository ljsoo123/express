const { Router } = require("express");
const express = require("express");
const db = require("./db");
const app = express();
const port = 3000;

const userDatas = {};

const checkBody = (keys) => (req, res, next) => {
  for (let i = 0; i < keys.length; i++) {
    if (req.body[keys[i]] === undefined) {
      res.status(400).json({
        message: "Bad Request!",
      });
      return;
    }
  }
  next();
};

const checkIsLogined = (req, res, next) => {
  const accessToken = req.headers["authorization"];
  if (accessToken !== "dddd") {
    res.status(403).json({
      message: "You Blocked",
    });
    return;
  }
  req.userData = {};
  ("");
  next();
};

app.use(express.json());

app.post("/", (req, res, next) => {
  db.getAllMemos((rows) => {
    //res.render("index", { rows: rows });
    console.log(rows);
  });
  next();
});

app.post("/register", (req, res) => {
  const { id, pw } = req.body;

  userDatas[id] = { id, pw };
  res.status(201).json({
    message: "User Created!",
  });
});

app.post("/login", checkBody(["id", "pw"]), (req, res) => {
  const { id, pw } = req.body;

  const userData = userDatas[id];
  if (userData === undefined) {
    res.status(404).json({
      message: "User X",
    });
    return;
  }

  if (userData.pw !== pw) {
    res.status(400).json({
      message: "Password Diffrent",
    });
    return;
  }

  res.json({
    message: "Login Success",
    accessToken: "dddd",
  });
});

app.post("/post", checkIsLogined, (req, res) => {
  req.userData;
});

app.listen(port, () => {
  console.log(`port : ${port}`);
});

// setInterval(() => {
//   console.log(userDatas);
// }, 5000);
