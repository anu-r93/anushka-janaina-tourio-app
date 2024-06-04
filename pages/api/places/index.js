import dbConnect from "../../../db/connect";
import Place from "../../../db/models/Place";

export default async function handler(request, response) {
  await dbConnect();
  try {
    if (request.method === "GET") {
      const places = await Place.find();
      return response.status(200).json(places);
    }
    if (request.method === "POST") {
      const placeData = request.body;
      const place = new Place(placeData);
      await place.save();
      return response
        .status(200)
        .json({ sucess: true, status: "You created a new place" });
    }
  } catch (error) {
    console.error(error);
    response.status(400).json({ error: error.message });
  }
}
