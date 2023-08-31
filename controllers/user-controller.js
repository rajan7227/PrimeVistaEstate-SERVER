const { Prisma } = require('../config/prismaConfig.js');

exports.addUser = async (req, res) => {
  console.log("creating an user");
  let { email } = req.body;
  console.log(email);
  res.json("email added")
  // Your asynchronous code here
};

// Now you can use the addUser function in your routes
