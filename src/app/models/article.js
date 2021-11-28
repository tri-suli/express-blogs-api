import Mongoose from "mongoose";
import timestamps from "../db/constants/timestamps";

const Article = new Mongoose.model(
  'Article',
  new Mongoose.Schema({
    title: { type: String, },
    body: { type: String, },
    creator: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    comments: [{
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    }],
    ...timestamps
  })  
);

export default Article;
