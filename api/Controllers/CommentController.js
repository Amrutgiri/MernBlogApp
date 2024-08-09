import { errorHandler } from "../Utils/error.js";
import Comment from "../Models/Comment.js";

export const createComment = async (req, res, next) => {
  try {
   const {content,postId,userId}= req.body;
   if(userId !==req.user.id){
    return next(errorHandler(403,"You are not authorized to create this comment"));
   }
   const newComment =new Comment({
    content,
    postId,
    userId
   })

   await newComment.save();
   res.status(200).json(newComment);

  } catch (error) {
    next(error);
  }
}