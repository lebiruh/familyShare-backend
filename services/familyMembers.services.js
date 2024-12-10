import conn from "../config/db.config.js";
// import { query } from "../config/db.config.js";

export const getDbfamilyMembers = async (familyId) => {

  const q = "SELECT * FROM familymember WHERE familyId = (?)";

  try {
    const response = await conn.query(q, [familyId]);

    const userIds = response[0].map(item => item.userId);

    const user = "SELECT * FROM users WHERE id IN (?)"

    const users= await conn.query(user, [userIds]);

    return users[0];

   } catch (error) {
    console.log(error);
  }
};


export const addDbFamilyMember = async (familyId, userId) => {

  const q = "SELECT * FROM familymember WHERE familyId = (?)";

  try {
    const response = await conn.query(q, [familyId]);

    const userIds = response[0].map(item => item.userId);

    if (userIds.includes(userId)) {

      return {status: 409, message: 'User already is a member of this family.'}
    }

    const values = [familyId, userId]

    const addFamilyMember = "INSERT INTO familymember (`familyId`, `userId`) VALUES (?)";

    const member = await conn.query(addFamilyMember, [values]);

    return {status: 200, message: member[0]};

    } catch (error) {
      console.log(error);
    }

};