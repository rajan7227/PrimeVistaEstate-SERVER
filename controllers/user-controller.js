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

exports.booking = async (req, res) => {
  const { email, date } = req.body;
  const { id } = req.params;

  try {
    const booking = await prisma.user.findUnique({
      where: { email: email },
      select: { bookedVisits: true },
    });
    if (booking.bookedVisits.some((visit) => visit.id === id)) {
      res
        .status(400)
        .json({ message: "your visit has been  already been booked" });
    } else {
      await prisma.user.update({
        where: { email: email },
        data: {
          bookedVisits: { push: { id, date } },
        },
      });
      res.send("booking confirmed succesfully");
    }
  } catch (err) {
    console.log(err.message);
  }
};

//all bookings

exports.getAllBookings = async (req, res) => {
  const { email } = req.body;
  try {
    const allbookings = await prisma.user.findUnique({
      where: { email: email },
      select: { bookedVisits: true },
    });
    res.status(201).send(allbookings);
  } catch (err) {
    console.log(err.message);
  }
};

//deletebookings
exports.cancelBookings = async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: { bookedVisits: true },
    });
    const bookingId = user.bookedVisits.findIndex((visit) => visit.id === id);
    if (bookingId === -1) {
      res.status(404).json({ message: "NO BOOKING FOUND" });
    } else {
      user.bookedVisits.splice(bookingId, 1);
      await prisma.user.update({
        where: { email: email },
        data: {
          bookedVisits: user.bookedVisits,
        },
      });
      res.send("booking cancelled succesfully");
    }
  } catch (err){
    console.log(err.message);
  }
};


//favorite property

exports.favoritePropperty = async (req,res)=>{
  const { email } = req.body;
  const { pid } = req.params;
  try{
    //grab the user
    const user = await prisma.user.findUnique({
      where: { email:email }
    })

    //check the user if he already have that id in its favorite coloum
    if(user.favResidenciesID.includes(pid)){
      //if it includes then we removed it from favorite so we update
      const updateUser = await prisma.user.update({
        where: {email:email},
        data:{
          favResidenciesID:{
            set: user.favResidenciesID.filter((id)=>id !== pid)
          }
        }
      })
      res.send({message: "Removed from favorite", user : updateUser})
    }else {
      const updateUser = await prisma.user.update({
        where:{ email:email },
        data: {
          favResidenciesID:{
            push: pid
          }
        }
      })
      res.send({message: "Added to favorites", user : updateUser})
    }
  }
  catch(err){
    console.log(err.message);
  }
}