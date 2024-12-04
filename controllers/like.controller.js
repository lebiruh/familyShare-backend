import { addDbLike, getDbLikes, removeDbLike } from "../services/dbLikes.services.js";

export const getLikes = async (req, res) => {

  const response = await getDbLikes(req, res);

  return res.status(200).json(response);

}

export const addLike = async (req, res) => {

  const response =  await addDbLike(req, res);

  return res.status(200).json(response);

}

export const removeLike = async (req, res) => {

  const response = await removeDbLike(req, res);
  
  return res.status(200).json(response);

}