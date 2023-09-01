const prisma = require("../config/prismaConfig.js");

//CREATE PROPERTY

exports.createProperty = async (req, res) => {
  console.log("adding property");
  const {
    title,
    description,
    price,
    address,
    country,
    city,
    facilities,
    image,
    userEmail,
  } = req.body.data;
  console.log(req.body.data);
  try {
    const property = await prisma.propertys.create({
      data: {
        title,
        description,
        price,
        address,
        country,
        city,
        facilities,
        image,
        owner: { connect: { email: userEmail } },
      },
    });
    res.send({ message: "Property added succesfully", propertys: property });
  } catch (err) {
    console.log(err.message);
  }
};

//GET ALL

exports.getAllProperty = async (req, res) => {
  try {
    const allPropertys = await prisma.propertys.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    res.send(allPropertys);
  } catch (err) {
    console.log(err.message);
  }
};

//GET SINGLE

exports.singleProperty = async (req, res) => {
    console.log("GETTING SINGLE PROPERTY");
    const { id } = req.params;
  try {
    const singleProperty = await prisma.propertys.findUnique({
      where: { id: id},
    });
    res.send(singleProperty);
  } catch (err) {
    console.log(err.message);
  }
};
