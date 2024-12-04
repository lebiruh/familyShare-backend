import conn from "../config/db.config.js";
import moment from "moment";

export const getDbComments = async (req, res) => {

   const postId = req.params.postId;

  const q = `
    SELECT comments.*, users.firstName, users.lastName
    FROM comments
    JOIN users ON comments.userId = users.id
    WHERE comments.postId = ? 
    ORDER BY comments.createdAt DESC
  `;

  try {
    const response = await conn.query(q, [postId]);

    return response[0];
   } catch (error) {
    console.log(error);
  }
};

export const addDbComment = async (req, res) => {


  const q = "INSERT INTO comments (`userId`, `postId`, `content`, `createdAt`) VALUES (?)"

  const values = [
    req.body.userId,
    req.params.postId,
    req.body.content,
    moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
  ]

  try {
    const response = await conn.query(q, [values]);
    return response[0];
   } catch (error) {
    console.log(error);
  }
}