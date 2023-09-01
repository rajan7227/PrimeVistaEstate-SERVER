const prisma = require("../config/prismaConfig.js");


// NEWUSER

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

//BOOKINGS

exports.booking = async (req,res)=>{
  const { email, date } = req.body
  const { id } = req.params;

  try{
    const booking = await prisma.user.findUnique({
      where: {email:email},
      select: {bookedVisits: true}

    })
    if(booking.bookedVisits.some((visit)=>visit.id === id)){
      res.status(400).json({message:"your visit has been  already been booked"})
    }else{  
          await prisma.user.update({
            where:{email: email},
            data: {
              bookedVisits:{push:{id, date}},
            },
          });
          res.send("booking confirmed succesfully");
    }
  }
  catch(err){
    console.log(err.message);
  }
}

//all bookings

exports.getAllBookings = async (req,res)=>{
  const { email } = req.body
  try{
    const allbookings = await prisma.user.findUnique({
      where: {email: email},
      select: {bookedVisits: true}
    })
    res.status(201).send(allbookings);
  }
  catch(err){
    console.log(err.message);
  }
}
