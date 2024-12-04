import {getDbfamilyMembers} from "../services/familyMembers.services.js";

export const getFamilyMembers = async (req, res) => {
  
  const familyId = req.params.familyId;

  const response =  await getDbfamilyMembers(familyId);

  return res.status(200).json(response);

};