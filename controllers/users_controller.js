const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const validateChangePasswordInput = require("../validation/changePassword");
const env = require("../config/environment");

const User = require("../models/user");
const mailer = require("../config/nodemailer");
const { use } = require("passport");

const addUser = (req, res) => {
	const user = new User({});
};

module.exports.profile = function (req, res) {
	return res.render("profile", {
		title: "Profile",
	});
};

module.exports.signUp = function (req, res) {
	// Form validation
	const { errors, isValid } = validateRegisterInput(req.body);
	// Check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}
	User.findOne({ email: req.body.email }).then((user) => {
		if (user) {
			return res.status(400).json({ email: "Email already exists" });
		} else {
			const defaultName =
				req.body.defaultPname && req.body.penName != ""
					? req.body.penName
					: req.body.firstName;
			const penName = req.body.penName ? req.body.penName : "";

			const newUser = new User({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				email: req.body.email,
				password: req.body.password,
				defaultName: defaultName,
				penName: penName,
				usePenNameDefault: req.body.defaultPname,
			});
			// Hash password before saving in database
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUser
						.save()
						.then((user) => res.json(user))
						.catch((err) => console.log(err));
				});
			});
		}
	});
};

module.exports.login = function (req, res) {
	const { errors, isValid } = validateLoginInput(req.body);
	// Check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}
	const email = req.body.email;
	const password = req.body.password;
	// Find user by email
	User.findOne({ email }).then((user) => {
		// Check if user exists
		if (!user) {
			return res.status(404).json({ emailnotfound: "Email not found" });
		}
		// Check password
		bcrypt.compare(password, user.password).then((isMatch) => {
			if (isMatch) {
				// User matched
				// Create JWT Payload
				const payload = {
					id: user._id,
					fname: user.firstName,
					lname: user.lastName,
					defaultName: user.defaultName,
					usePenNameDefault: user.usePenNameDefault,
					about: user.about,
					penName: user.penName,
					country: user.country,
					instagramURL: user.instagramURL,
					linkedinURL: user.linkedinURL,
					twitterURL: user.twitterURL,
					facebookURL: user.facebookURL,
					entries: user.entries,
				};
				// Sign token
				jwt.sign(
					payload,
					env.secretOrKey,
					{
						expiresIn: 31556926, // 1 year in seconds
					},
					(err, token) => {
						res.json({
							success: true,
							token: "Bearer " + token,
						});
					}
				);
			} else {
				return res
					.status(400)
					.json({ passwordincorrect: "Password incorrect" });
			}
		});
	});
};

//get the sign up date

module.exports.create = function (req, res) {
	if (req.body.password != req.body.confirm_password) {
		return res.redirect("back");
	}

	User.findOne(
		{
			email: req.body.email,
		},
		function (err, user) {
			if (err) {
				console.log("Error in finding user in signing up!");
				return;
			}

			if (!user) {
				User.create(req.body, function (err, user) {
					if (err) {
						console.log("Error in creating user while signing up!" + err);
						return;
					}

					mailer.sendMail({
						from: "Team Sensus",
						to: req.body.email,
						subject: "Test Email",
						text:
							"If you are receiving this email, you have successfully signed up for Sensus!",
					});

					return res.redirect("/users/sign-in");
				});
			} else {
				return res.redirect("back");
			}
		}
	);
};

//Session functions

module.exports.createSession = function (req, res) {
	return res.redirect("/users/profile");
};

module.exports.destroySession = function (req, res) {
	req.logout();

	return res.redirect("/");
};

//Profile Page Modifications.

module.exports.updateProfile = async (req, res) => {
	let pnamedef = req.body.pnamedef;
	let uid = req.body.id;
	if (req.body.pnamedef == "false") {
		pnamedef = false;
	} else {
		pnamedef = true;
	}
	// console.log(pnamedef, typeof pnamedef);
	let updated = await User.findByIdAndUpdate(
		{ _id: uid },
		{
			firstName: req.body.fname,
			lastName: req.body.lname,
			penName: req.body.pname,
			usePenNameDefault: pnamedef,
			about: req.body.abt,
			defaultName: req.body.dname,
			facebookURL: req.body.fburl,
			twitterURL: req.body.turl,
			instgramURL: req.body.iurl,
			linkedinURL: req.body.liurl,
		}
	);
	return res.status(200).json({
		message: "user profile updated!",
		updatedUser: updated,
	});
};

//Password Manager

module.exports.changePassword = async (req, res) => {
	const uid = req.body.id;
	const oldPassword = req.body.oldPassword;
	const newPassword = req.body.newPassword;

	User.findById(uid, (err, user) => {
		if (err) {
			res.status(401).json({ err: err });
		}

		bcrypt.compare(oldPassword, user.password).then((isMatch) => {
			if (!isMatch) {
				res.status(401).json({ passwordMismatch: "Password is incorrect" });
			} else {
				const { errors, isValid } = validateChangePasswordInput(req.body);

				if (!isValid) {
					return res.status(400).json(errors);
				}

				// Hash password before saving in database
				bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(newPassword, salt, (err, hash) => {
						if (err) throw err;
						user.password = hash;
						user
							.save()
							.then(res.status(200).json({ message: "Password Updated!" }))
							.catch((err) => console.log(err));
					});
				});
			}
		});
	});
};
