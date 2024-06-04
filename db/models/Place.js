import mongoose from "mongoose";
import Comment from "./Comments";

const { Schema } = mongoose;

const placeSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true },
  mapURL: { type: String, required: true },
  description: { type: String, required: true },
  comments: [{ type: Schema.Types.ObjectId, required: true, ref: "Comment" }],
});

const Place = mongoose.models.Place || mongoose.model("Place", placeSchema);

export default Place;
