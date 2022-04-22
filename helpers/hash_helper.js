const bcrypt = require("bcrypt");

exports.generateHash = async (text) => {
  const hash = await bcrypt.hashSync(text, 5);
  return hash;
}

exports.checkHash = async (text, hash) => {
  const match = await bcrypt.compareSync(text, hash);
  return match;
}
