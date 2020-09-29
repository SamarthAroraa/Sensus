const User = require("../models/user");
const mailer = require("../config/nodemailer");
const bcrypt = require("bcryptjs");

const generatePassword = () => {
	const alphas =
		"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

	let pass = "";

	for (let i = 0; i < 8; i++) {
		pass += alphas[Math.floor(Math.random() * alphas.length)];
	}

	return pass;
};

const mailNewPasswordToUser = async (newPassword, userEmail, callback) => {
	const subject = "Reset Password";

	const message = `Dear user,
        We received a request of reset password from your account. We have generated a random temporary password for you which you can later change in the user profile tab.
        
    Your new generated Password is: ${newPassword}
        
    Regards,
    Team Sensus`;

	await mailer.sendMail(
		{
			from: "sensus.service@gmail.com",
			to: userEmail,
			subject: subject,
			text: message,
		},
		(err) => {
			if (err) {
				callback(err);
			} else {
				callback(null);
			}
		}
	);
};

module.exports.forgotPassword = async (req, res) => {
	const email = req.body.email;

	console.log(email);

	User.findOne({ email: email }, (err, user) => {
		if (err) {
			console.log(err);
			res.status(500).json({ message: "DB error in finding user", err: err });
		} else if (!user) {
			res.status(400).json({ userNotFound: "The Email ID is not registered" });
		} else {
			const newPass = generatePassword();

			// Hash password before saving in database
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newPass, salt, (err, hash) => {
					if (err) {
						res
							.status(500)
							.json({ message: "Unable to hash password", err: err });
					}
					const oldPass = user.password;
					user.password = hash;

					user.save((err, newUser) => {
						if (err) {
							res.status(500).json({ message: "User not saved", err: err });
						} else {
							mailNewPasswordToUser(newPass, email, (err) => {
								if (err) {
									res.status(500).json({ message: "Email not sent", err: err });
								} else {
									res.status(200).json({ message: "Password Sent to user!" });
								}
							});
						}
					});
				});
			});
		}
	});
};
