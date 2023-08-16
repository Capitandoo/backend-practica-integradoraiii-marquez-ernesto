import { dirname } from "path";
import { fileURLToPath } from "url";
import multer from "multer";

export const __dirname = dirname(fileURLToPath(import.meta.url));
export const pathProducts = __dirname + "/daos/filesystem/productos.json";
export const pathCarritos = __dirname + "/daos/filesystem/carrito.json";
export const pathMessages = __dirname + "/daos/filesystem/messages.json";

const storage = multer.diskStorage({
  destination: function (request, file, cb) {
    cb(null, `${__dirname}/public/images/products`);
  },
  filename: function (request, file, cb) {
    cb(null, file.originalname);
  },
});

export const uploader = multer({ storage });
