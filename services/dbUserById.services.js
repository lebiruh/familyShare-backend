import conn from "../config/db.config.js"

export const getDbUserById = async (userId) => {  


  const q = "SELECT id, firstName, lastName, email FROM users WHERE id = ?"

  try {
    const response = await conn.query(q, [userId]);
    return response[0];
  } catch (error) {
    console.log(error);
  }  
}