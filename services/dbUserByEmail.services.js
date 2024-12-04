// import {pool, query} from "../config/db.config.js"

import conn from "../config/db.config.js"

export const getDbUser = async (userEmail) => {  

  const q = "SELECT * FROM users WHERE email = ?"

  try {
    const response = await conn.query(q, [userEmail]);
    return response[0];
  } catch (error) {
    console.log(error);
  }  
}