const users = require("../models/usersSchema");

const moment = require("moment");

exports.userpost = async (req, res) => {
  const file = req.file.filename;
  const { fname, lname, email, mobile, gender, status, location } = req.body;

  if (
    !fname ||
    !lname ||
    !email ||
    !mobile ||
    !gender ||
    !status ||
    !location ||
    !file
  ) {
    res.status(401).json("All inputs Are required");
  }

  try {
    const preuser = users.findOne({ email: email });
    const mobileExist = users.findOne({ mobile: mobile });
    if (preuser) {
      res.status(401).json("An User with this email already exist");
    } else if (mobileExist) {
      res.status(401).json("An User with this Mobile number already exist");
    } else {
      const datecreated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
      const userData = new users({
        fname,
        lname,
        email,
        mobile,
        gender,
        status,
        location,
        profile: file,
        datecreated,
      });

      let response = await userData.save();
      res.status(200).json(userData);
    }
  } catch (error) {
    res.status(401).json(error);
    console.log("catch error", error);
  }
};

exports.getsitedata = async (req, res) => {
  const { secretKey } = req.body;


  let ourSecretKey = process.env.SECRET_KEY;
  try {
    if (secretKey != ourSecretKey) {
      res.status(401).json("Unauthorized Access");
    } else {
      const siteData = await users.findOne({secretKey:secretKey});
      if (!siteData) {
        res.status(401).json({error:"User Not found with this secret key"});
      } else {
        res.status(200).json({data:siteData});
      }
    }
  } catch (error) {
    
    res.status(401).json(error);
    console.log("catch error", error);
  }
};
