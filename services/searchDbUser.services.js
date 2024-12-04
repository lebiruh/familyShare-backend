import conn from "../config/db.config.js"

export const searchDbUser = async (searchTerm) => {  

  const q = "SELECT id, firstName, lastName, email FROM users WHERE firstName LIKE ? OR lastName LIKE ? OR email LIKE ? LIMIT 5"

  try {
    const response = await conn.query(q, [`${searchTerm}%`, `${searchTerm}%`, `${searchTerm}%`]);
    return response[0];
  } catch (error) {
    console.log(error);
  }  
}