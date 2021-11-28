import Mongoose from "mongoose";
import timestamps from "../db/constants/timestamps";

const User = new Mongoose.model(
  'User',
  new Mongoose.Schema({
    name: { type: String },
    email: { type: String, unique: true },
    ...timestamps,
  })
);

export default User;
