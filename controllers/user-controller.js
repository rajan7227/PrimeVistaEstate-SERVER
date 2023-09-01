const { Prisma } = require('../config/prismaConfig.js');

exports.addUser = async (req, res) => {
  console.log("creating an user");
  let { email } = req.body;


};

