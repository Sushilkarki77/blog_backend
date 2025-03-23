import mongoose, { Document, Schema } from "mongoose";

export interface IComment extends Document {
  id: string;
  postId: string;
  author: string;
  content: string;
  date: string;
}

const CommentSchema: Schema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  postId: { type: String, required: true },
  author: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: String, required: true }
});

export const CommentModel = mongoose.model<IComment>('Comment', CommentSchema);

export const getComments = (): Promise<IComment[]> => CommentModel.find().exec();

export const getCommentsByPostID = (postId: string): Promise<IComment[]> =>
  CommentModel.find({ postId }).exec();

export const createComment = (comment: Partial<IComment>): Promise<IComment> => {
  const newComment = new CommentModel({ ...comment});
  return newComment.save().then((comment) => comment.toObject() as IComment);  
};

export const deleteCommentHandler = (commentID: string): Promise<IComment | null> =>
  CommentModel.findOneAndDelete({ id: commentID }).exec();
