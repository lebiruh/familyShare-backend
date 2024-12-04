import {searchDbUser} from "../services/searchDbUser.services.js";

export const searchUser = async (req, res) => {

  const searchTerm = req.query.q;

  if (!searchTerm) {
    return res.status(400).json("User not found");
  }

  const response = await searchDbUser(searchTerm);
  return res.status(200).json(response);

}
