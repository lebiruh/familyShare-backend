import { addDbFamilyMember } from "../services/familyMembers.services.js";

export const addFamilyMember = async (req, res) => {
  
  const familyId = req.params.familyId;
  const userId = req.body.userId;

  const response =  await addDbFamilyMember(familyId, userId);

  return res.status(response.status).json({data: response.message});

};