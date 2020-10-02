const Validator = require("validator");
const isEmpty = require("is-empty");
const e = require("express");
module.exports = function validateChangePasswordInput(data) {
	let errors = {};
	// Convert empty fields to an empty string so we can use validator functions
	data.oldPassword = !isEmpty(data.oldPassword) ? data.oldPassword : "";
	data.newPassword = !isEmpty(data.newPassword) ? data.newPassword : "";
	data.confirmNewPassword = !isEmpty(data.confirmNewPassword)
		? data.confirmNewPassword
		: "";
	// Old Password checks

	if (Validator.isEmpty(data.oldPassword)) {
		errors.oldPassword = "Old Password field is required";
	}
	// New Password checks
	if (Validator.isEmpty(data.newPassword)) {
		errors.newPassword = "New Password field is required";
	} else if (data.newPassword.length < 6) {
		errors.newPassword = "Password should be atleast 6 letters";
	}

	//Confirm New password checks

	if (Validator.isEmpty(data.confirmNewPassword)) {
		errors.confirmNewPassword = "Confirm New Password field is required";
	} else if (data.confirmNewPassword != data.newPassword) {
		errors.confirmNewPassword = "Passwords do not match";
	}

	return {
		errors,
		isValid: isEmpty(errors),
	};
};
