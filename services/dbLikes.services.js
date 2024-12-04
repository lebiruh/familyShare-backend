import conn from "../config/db.config.js";

export const getDbLikes = async (req, res) => {

  const postId = req.params.postId;


  const q = `
    SELECT likes.*
    FROM likes
    WHERE likes.postId = ?
  `;

  try {
    const response = await conn.query(q, [postId]);

    return response[0];
   } catch (error) {
    console.log(error);
  }

}

export const addDbLike = async (req, res) => {

  const postId = req.params.postId;
  const userId = req.body.userId;

        
  const q = "INSERT INTO likes (`userId`, `postId`) VALUES (?)";

  const values = [userId, postId];

  try {
    const response = await conn.query(q, [values]);

    return response[0];
   } catch (error) {
    console.log(error);
  }

}

export const removeDbLike = async (req, res) => {

  const userId = req.body.userId;
  const postId = req.params.postId;

  const q = `DELETE FROM likes WHERE likes.userId = ? AND likes.postId = ?`;

    try {
    const response = await conn.query(q, [userId, postId]);

    return response[0];
   } catch (error) {
    console.log(error);
  }

}
