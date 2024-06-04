import { db_comments } from "../../../../lib/db_comments";
import dbConnect from "../../../../db/connect";
import Place from "../../../../db/models/Place";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const place = await Place.findById(id).populate("comments");

    if (!place) {
      return response.status(404).json({ status: "Not Found" });
    }
    const comments = place?.comments;

    return response.status(200).json({ place: place, comments: comments });
  }

  if (!id) {
    return;
  }

  if (request.method === "PUT") {
    const data = request.body;
    await Place.findByIdAndUpdate(id, data);

    response.status(200).json({ status: "Place updated!" });
    return;
  }

  if (request.method === "DELETE") {
    await Place.findByIdAndDelete(id);

    response.status(200).json({ status: "Place deleted!" });
  }

  const place = db_places.find((place) => place._id.$oid === id);
  const comment = place?.comments;
  const allCommentIds = comment?.map((comment) => comment.$oid) || [];
  const comments = db_comments.filter((comment) =>
    allCommentIds.includes(comment._id.$oid)
  );

  if (!place) {
    return response.status(404).json({ status: "Not found" });
  }

  response.status(200).json({ place: place, comments: comments });
}
