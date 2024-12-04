import { addDbPost, deleteDbPost, getDbPosts } from "../services/posts.services.js";


export const getPosts = async (req, res) => {

    // const userId = req.params.userId;

    const response =  await getDbPosts(req, res);

    return res.status(200).json(response);
  
};

export const addPost = async (req, res) => {

  // if (!token) return res.status(401).json("Not logged in");

  // if (!req.body.content) return res.status(400).json("No content");
  // console.log("added post on controller: ", req.body);

  const response =  await addDbPost(req, res);

  return res.status(200).json(response);
};

export const deletePost = async (req, res) => {
  

  // if (!token) return res.status(401).json("Not logged in");

  const response = await deleteDbPost(req, res);

  return res.status(200).json(response);

};



