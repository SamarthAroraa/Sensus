const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
// const AVATAR_PATH = path.join("/uploads/users/avatars");
//////////////////////////////////////
//          User Schema             //
//////////////////////////////////////
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    
  },
  {
    timestamps: true,
  }
);

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", AVATAR_PATH));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

//static methods
userSchema.statics.uploadedAvatar = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    console.log("check:", path.extname(file.originalname));
    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      
      return cb(new Error("Only images are allowed"));
    }
    cb(null, true);
  },
  limits: {
    fileSize: 1024 * 1024,
  },
}).single("avatar");
userSchema.statics.avatarPath = AVATAR_PATH;
const User = mongoose.model("User", userSchema);
module.exports = User;
