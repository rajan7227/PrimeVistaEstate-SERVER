const prisma = require("../config/prismaConfig.js");

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
  } catch (err){
    console.log(err.message);
  }
};
