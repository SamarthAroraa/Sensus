const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");

const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const passportJWT = require("./config/passport-jwt");
const MongoStore = require("connect-mongo")(session);

const env = require("./config/environment");
const partials = require("express-partials");
const sassMiddleware = require("node-sass-middleware");
const flash = require("connect-flash");
const flashMiddleware = require("./config/flash_middleware");
const port = 5000;
const path = require("path");

// app.use(
//     sassMiddleware({
//         src: path.join(__dirname, env.asset_path, "scss"),
//         dest: path.join(__dirname, env.asset_path, "css"),
//         debug: true,
//         outputStyle: "extended",
//         prefix: "/css",
//     })
// );

app.use(
	express.urlencoded({
		extended: true,
	})
);

app.use(cookieParser());

app.use(expressLayouts);

app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.use(express.static(path.join(__dirname, env.asset_path)));

app.use(partials());

app.use(cors());
app.use(
	session({
		name: "sensus",
		//TO DO change secret before deployment
		secret: env.session_cookie_key,
		saveUninitialized: false,
		resave: true,
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

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport-jwt")(passport);
app.use(express.static(path.join(__dirname, "client/build")));

app.use("/users", require("./routes/users"));
app.use("/app-utils", require("./routes/utils"));
app.use("/api", require("./routes/api"));
app.use("/forgot-password", require("./routes/forgot_password"));

// app.get("/", function(req, res) {
//     res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// });

app.get("*", function (req, res) {
	res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
	console.log(`Server is active on port:${port}`);
});
