
import conn from "../config/db.config.js";
import moment from 'moment';

// import { query } from "../config/db.config.js";

export const getDbfamily = async (userId) => {

  const q = "SELECT * FROM familymember WHERE userId = (?)";

  try {
    const response = await conn.query(q, [userId]);

    const familyIds = response[0].map(item => item.familyId);

    const family = "SELECT * FROM family WHERE id IN (?)"

    const families = await conn.query(family, [familyIds]);

    return families[0];

   } catch (error) {
    console.log(error);
  }
};


export const createDbfamily = async (familyName, userId) => {
  

  const q = "INSERT INTO family (`familyName`, `createdAt`) VALUES (?)"

  const values = [familyName, moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")];

  try {
    const response = await conn.query(q, [values]);

    const familyId = response[0].insertId;

    const insertFamilyMemberQuery = "INSERT INTO familymember (`familyId`, `userId`) VALUES (?)"

    const insertValues = [familyId, userId]

    const insertMemberResponse = await conn.query(insertFamilyMemberQuery, [insertValues]);

    return insertMemberResponse[0];

   } catch (error) {
    console.log(error);
  }
};