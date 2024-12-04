
import {getDbfamily} from "../services/family.services.js";


export const getFamily = async (req, res) => {
  
  const userId = req.params.userId;

  const response =  await getDbfamily(userId);

  return res.status(200).json(response);

};


