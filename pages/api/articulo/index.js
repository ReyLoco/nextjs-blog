import ER_SERVER from "../../../constants";
import conectarDB from "../../../lib/dbConnect";
import Articulo from "../../../models/Articulo";

export default async function handler(req, res) {
  await conectarDB();

  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const articulo = new Articulo(req.body);

        await articulo.save();

        return res.status(200).json({ success: true, articulo });
      } catch (error) {
        return res.status(400).json({ success: false, error });
      }
    case "PUT":
    default:
      return res.status(500).json({ success: false, error: ER_SERVER });
  }
}
