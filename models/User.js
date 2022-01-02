const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "please enter an email"],
      unique: true,
      validate: [isEmail, "please enter a valid email"],
    },
    first_name: {
      type: String,
      required: [true, "please enter your first name"],
    },
    last_name: {
      type: String,
      required: [true, "please enter your last name"],
    },
    username: {
      type: String,
      required: [true, "please enter an username"],
      unique: [true, "username already exist"]
    },
    password: {
      type: String,
      required: [true, "please enter a password"],
      minlength: [6, "minimum password length is 6 characters"],
    },
    isAdmin: {
      type: Boolean,
    },
  },
  { collection: "users" }
);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//login
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect username");
};

const model = mongoose.model("UserSchema", userSchema);

module.exports = model;
