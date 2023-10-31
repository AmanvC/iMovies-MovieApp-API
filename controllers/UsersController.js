const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");	

module.exports.createSession = async (req, res) => {
	try{
		const data = req.body;
		const user = await User.findOne({username: data.username}).lean();
		if(!user){
			return res.status(200).json({
				success: true,
				message: "User does not exist!"
			})
		}
		const passwordMatches = await bcrypt.compare(data.password, user.password);
		if(!passwordMatches){
			return res.status(401).json({
				success: true,
				message: "Invalid username/password!"
			})
		}
		const {username, name, email} = user;
		return res.status(200).json({
      success: true,
      token: jwt.sign({username, email, name}, process.env.JWT_SECRET_KEY),
      status: user.status,
    });
	} catch(err){
		console.log("Error in logging in: ", err)
;		return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
	}
}

module.exports.createUser = async (req, res) => {
	try{
		const data = req.body;
		const userEmail = await User.findOne({email: data.email});
		if(userEmail){
			return res.status(403).json({
        success: true,
        message:
          "Email is already registered, login to continue!",
      });
		}
		const user = await User.findOne({username: data.username});
		if(user){
			return res.status(403).json({
        success: true,
        message:
          "Username is already taken!",
      });
		}
		if(data.password !== data.passwordAgain){
			return res.status(400).json({
        success: true,
        message: "Passwords do not match!",
      });
		}
		const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(data.password, salt);

    await User.create({
			username: data.username,
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });

		return res.status(201).json({
      success: true,
      message: "User created successfully.",
    });
	} catch(err){
		console.log("Error in creating a new user: ", err);
		return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
	}
}