import conn from "../config/db.config.js";
// import { query } from "../config/db.config.js";
import moment from "moment";

export const getDbPosts = async (req, res) => {

  const familyId = req.params.familyId;

  const q = `
    SELECT posts.*, users.firstName, users.lastName
    FROM posts
    JOIN users ON posts.userId = users.id
    JOIN familymember ON users.id = familymember.userId
    WHERE familymember.familyId = ? AND posts.familyId = ?
    ORDER BY posts.createdAt DESC
  `;

  try {
    const response = await conn.query(q, [familyId, familyId]);
    return response[0];
   } catch (error) {
    console.log(error);
  }
};

export const addDbPost = async (req, res) => {

  const q = "INSERT INTO posts (`userId`, `familyId`, `content`, `image`, `createdAt`) VALUES (?)"

  const values = [
    req.body.userId,
    req.params.familyId,
    req.body.content,
    req.body?.image,
    moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
  ]

  try {
    const response = await conn.query(q, [values]);
    return response[0];
   } catch (error) {
    console.log(error);
  }
}

export const deleteDbPost = async (req, res) => {

  const postId = req.params.postId

  const q = "DELETE FROM posts WHERE id = ?"


  try {
    const response = await conn.query(q, [postId]);
    return response[0];
   } catch (error) {
    console.log(error);
  }

}