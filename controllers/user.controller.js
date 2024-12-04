import { getDbUser } from "../services/dbUserByEmail.services.js";
import { getDbUserById } from "../services/dbUserById.services.js";



export const getUser = async (req, res) => {

  const userEmail = req.params.userEmail;

  if (userEmail === 'undefined') {
    return res.status(400).json("User not found");
  }

  const response = await getDbUser(userEmail);
  return res.status(200).json(response);

}


export const getUserById = async (req, res) => {

  const userId = req.params.id;

  if (!userId) {
    return res.status(400).json("User not found");
  }

  const response = await getDbUserById(userId);
  return res.status(200).json(response);

}