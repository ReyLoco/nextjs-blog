import { ER_NOTFOUND, ER_SERVER } from "../../../constants";
import conectarDB from "../../../lib/dbConnect";
import Articulo from "../../../models/Articulo";

export default async function handler(req, res) {
  await conectarDB();

  const { method, query: { id } } = req;

  console.log("Dentro de la api GET");

  switch (method) {
    case "GET":
      try {
        const articulo = await Articulo.findById(id).lean();

        if (!articulo) {
          return res.status(401).json({ success: false, error: ER_NOTFOUND });
        }

        return res.status(200).json({ success: true, data: articulo });
      } catch (error) {
        return res.status(400).json({ success: false, error });
      }
      case "DELETE":
        try {
          const articulo = await Articulo.findByIdAndDelete(id);
  
          if (!articulo) {
            return res.status(401).json({ success: false });
          }
  
          return res.status(200).json({ success: true, data: articulo });
        } catch (error) {
          return res.status(400).json({ success: false, error });
        }
  
    case "PUT":
      try {
        const articulo = await Articulo.findByIdAndUpdate(id, req.body, {new:true, runValidators:true});

        if (!articulo) {
          return res.status(401).json({ success: false });
        }

        return res.status(200).json({ success: true, data: articulo });
      } catch (error) {
        return res.status(400).json({ success: false, error });
      }
    default:
      return res.status(500).json({ success: false, error: ER_SERVER });
  }
}
