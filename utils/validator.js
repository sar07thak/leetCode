const validator = require("validator");

const validate = (user) => {
  const requiredFields = ["firstName", "password", "emailId"];
  const isAllowed = requiredFields.every((key) =>
    Object.keys(user).includes(key)
  );

  if (!isAllowed) {
    throw new Error("some fields are required");
  }

  if (!validator.isEmail(user.emailId)) {
    throw new Error("Invalid credentials");
  }

  if (!validator.isStrongPassword(user.password)) {
    throw new Error("Invalid credentials");
  }
};

module.exports = validate;
