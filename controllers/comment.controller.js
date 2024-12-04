import { addDbComment, getDbComments } from "../services/dbComments.services.js";


export const getComments = async (req, res) => {

    const response =  await getDbComments(req, res);

    return res.status(200).json(response);
  
};

export const addComment = async (req, res) => {

  // if (!token) return res.status(401).json("Not logged in");

  // if (!req.body.content) return res.status(400).json("No content");
  // console.log("added post on controller: ", req.body);

  const response =  await addDbComment(req, res);

  return res.status(200).json(response);
};
