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

const validateEditProfileData = (req) => {
  const validFieldUpdate = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "description",
    "photoURL",
  ];
  const isVlaidFieldUpdate = Object.keys(req.body).every((feild) =>
    validFieldUpdate.includes(feild)
  );

  return isVlaidFieldUpdate;
};

module.exports = { validateSignupData, validateEditProfileData };

//this is a helper /utility function
