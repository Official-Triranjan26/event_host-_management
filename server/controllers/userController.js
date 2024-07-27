const generateToken = require("../config/generateToken");
const UserModel = require("../models/userAdminModel");
const {LocalStorage}=require("node-localstorage")

const authLogin = async (req,res) => {
    localStorage = new LocalStorage('./local')
    const {role,email,password}=req.body;
  
    if(!email || !password){
      return res.status(400).json({
        success:false,
        message:"credentials not provideded !!"
      })
    }
  
    const user = await UserModel.findOne({email:email});
    // console.log(user)
    // const ref = 
    if(user && (await user.matchPassword(password)) && (role===user.role)){
      if(role==='user'){
        localStorage.setItem("userId",user._id);
      }else if(role==='admin'){
        localStorage.setItem("adminId",user._id);
      }
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        role:user.role,
        token: await generateToken(user._id,user.role),
      });
    }
    else{
      return res.status(400).json({
        success:false,
        message:"invalid credentials !!"
      })
    }
  };
  

const authSignup = async (req, res) => {
    const { name, email, password, picUrl,role } = req.body;
    if (!name || !email || !password ||!role) {
      return res.status(400).json({
        success: false,
        message: "credentials are needed !",
      });
    }
  
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "user with credential exists",
      });
    }
    const newUser = await UserModel.create({
      name,
      email,
      password,
      pic:picUrl,
      role
    });
    console.log(newUser);
    if (newUser) {
      res.status(201).json({
        success: true,
        data: {
          id:newUser._id,
          name:newUser.name,
          email:newUser.email,
          password:newUser.password,
          pic:newUser.pic,
          role:newUser.role,
        },
      });
    }else{
      return res.status(400).json({
          success:false,
          message:"Failed to craeate user !"
      })
    }
  };
  

  module.exports = { authLogin , authSignup };
  