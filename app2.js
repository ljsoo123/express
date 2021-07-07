const express = require("express");
const path = require("path");
const morgan = require("morgan");
const nunjucks = require("nunjucks");
const chokidar = require("chokidar");
const models = require("./models");
const { sequelize } = require("./models/index");

const app = express();
//sequelize.sync();
console.log("데이터베이스 연결됨");
models.User.create({
  nick: "John",
});
app.set("port", process.env.port || 3001);
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});
sequelize
  .sync({ force: false })
  .then((res) => {
    models.User.findAll().then((res) => console.log(res));
    models.User.findOne({ where: { nick: "John" } }).then((user) => {
      if (user) {
        user.update({ nick: "Bob" }).then(() => console.log("data updated"));
      }
    });
    models.User.findAll().destroy();
    models.User.destroy({ where: { nick: "*" } }).then(() =>
      console.log("user deleted")
    );
    models.User.findAll();
  })
  .catch((err) => {
    console.log(err);
  });

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), `번 포트에서 대기중`);
});
