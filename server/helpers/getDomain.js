const { decodeSign } = require("../helpers/generateToken");

const getDomain = async (auth) => {
  const token = auth.split(" ")[1];
  const user = decodeSign(token);
  const { email } = user;
  const array = email.split("@");
  const dotsplit = array[1].split(".");
  const domain = dotsplit[0];
  return domain;
};

module.exports = {
  getDomain
}
