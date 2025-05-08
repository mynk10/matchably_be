const validator = require("validator");

const validateSignupData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Enter a valid name");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("email id is not valid ");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error(" enter a strong password");
  }
};

module.exports = { validateSignupData };


//this is a helper /utility function 