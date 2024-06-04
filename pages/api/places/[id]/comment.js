import dbConnect from "../../../../db/connect";
import Comment from "../../../../db/models/Comments";
import Place from "../../../../db/models/Place";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (!id) {
    return;
  }

  if (request.method === "POST") {
    // Add comment
    const commentData = request.body;
    const comment = await new Comment({ ...commentData, placeId: id }).save();

    // Update Place with comment id
    const place = await Place.findById(id);
    place.comments.push(comment._id);
    place.save();

    return response
      .status(200)
      .json({ sucess: true, status: "You created a new comment" });
  }
}
