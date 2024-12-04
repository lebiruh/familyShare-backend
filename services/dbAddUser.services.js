import conn from "../config/db.config.js"

export const addDbUser = async (values) => {  

  const insertQuery = "INSERT INTO users (firstName, lastName, email, password, userName) VALUES (?)"

  try {
    const response = await conn.query(insertQuery, [values]);

    return response[0];
  } catch (error) {
    console.log(error);
  }  
}