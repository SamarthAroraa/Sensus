const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const db = require("./config/mongoose");
const env = require("./config/environment");
const partials = require("express-partials");
const sassMiddleware = require("node-sass-middleware");
const flash = require("connect-flash");
const flashMiddleware = require("./config/flash_middleware");
const port = 5000;
const path = require("path");

app.use(
  sassMiddleware({
    src: path.join(__dirname, env.asset_path, "scss"),
    dest: path.join(__dirname, env.asset_path, "css"),
    debug: true,
    outputStyle: "extended",
    prefix: "/css",
  })
);
app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, env.asset_path)));
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
app.set("view engine", "ejs");
app.use(partials());
app.set("views", "./views");
app.use(
  session({
    name: "sensus",
    //TO DO change secret before deployment
    secret: env.session_cookie_key,
    saveUninitialized: false,
    require: false,
    cookie: {
      maxAge: null,
    },

    store: new MongoStore(
      {
        mongooseConnection: db,
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect-mogodb ok");
      }
    ),
  })
);
app.use(flash());
app.use(flashMiddleware.setFlash);
app.use("/", require("./routes"));

app.listen(port, () => {
  console.log(`Server is active on port:${port}`);
});
