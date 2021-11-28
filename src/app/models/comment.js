import Mongoose from "mongoose";
import timestamps from "../db/constants/timestamps";

const Comment = new Mongoose.model(
  'Comment',
  new Mongoose.Schema({
    creator: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    article: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'Article',
    },
    body: { type: String, },
    ...timestamps
  })  
);

export default Comment;
