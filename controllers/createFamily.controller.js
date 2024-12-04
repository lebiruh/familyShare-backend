import {createDbfamily} from "../services/family.services.js";


export const createFamily = async (req, res) => {

  
  const userId = req.params.userId;
  const familyName = req.body.familyName;

  const response =  await createDbfamily(familyName, userId);

  return res.status(200).json(response);

};
