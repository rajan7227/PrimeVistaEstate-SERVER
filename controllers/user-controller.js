const prisma = require("../config/prismaConfig.js");

exports.addUser = async (req, res) => {
  console.log("creating an user");
  let { email } = req.body;
  const userExists = await prisma.user.findUnique({ where: { email: email } });
  if (!userExists) {
    const user = await prisma.user.create({ data: req.body });
    res.send({ message: "user added Succesfully", user: user });
  } else {
    res.status(400).json({
      message: "User with that email already exists",
    });
  }
};
