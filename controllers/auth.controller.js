import bcrypt from 'bcrypt'
import { addDbUser } from "../services/dbAddUser.services.js";
import { getDbUser } from "../services/dbUserByEmail.services.js";
import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';

export const register = async (req, res) => {

  //Check if valid data is provided
  if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password || !req.body.userName) {
    return res.status(400).json("Please fill all the required fields!");
  } 

  //CHECK if USER EXISTS
  const userEmail = req.body.email;

  const data = await getDbUser(userEmail);

  if (!data)  return res.status(500).json("Something went wrong. Please try again later.");
  
  if(data.length > 0) return res.status(409).json("User already exists!");

  //CREATE NEW USER
  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);

  const values = [req.body.firstName, req.body.lastName, req.body.email, hashedPassword, req.body.userName];

  const response = await addDbUser(values);
  if (response.affectedRows === 1) {
    return res.status(200).json("User has been created.");
  }
}

export const logIn = async(req, res) => {

  //Check if valid data is provided
  if (!req.body.email || !req.body.password) {
    return res.status(400).json("Please fill all the required fields!");
  } 

  //CHECK if USER EXISTS
  const userEmail = req.body.email;

  const data = await getDbUser(userEmail);

  if (!data)  return res.status(500).json("Something went wrong. Please try again later.");
  
  if(data.length === 0) return res.status(400).json({message: "User not found!"});


  // Check if the correct password is provided
  const isPassword = await bcrypt.compare(req.body.password, data[0].password);

  if (!isPassword) return res.status(400).json({message: "Wrong password or username!"});

  // Extract the required data to be sent to the user
  const {password, ...others} = data[0];

  // return res.status(200).json(others);

  // Sign the cookie the be sent to the user
  const token = jwt.sign({id: data[0].id}, process.env.JWT_SECRET);

  // Send the cookie and required data for subsequent requests
  res.cookie("accessToken", token, {
      httpOnly: true,
      sameSite: "none",
      // secure: true,
      domain: "localhost",
      // path: "/"
    }).status(200).json({...others, token});

}

export const logOut = (req, res) => {
  res.clearCookie("accessToken", {
    secure: true,
    sameSite: "none"
  }).status(200).json("User logged out");
}