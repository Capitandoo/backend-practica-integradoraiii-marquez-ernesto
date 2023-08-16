import express from "express";
import cors from "cors";
import { __dirname, pathMessages } from "./path.js";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import { errorHandler } from "./middlewares/errors/errorHandler.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import passport from "passport";
import { logger } from "./utils/logger.js";
import "./middlewares/passport/jwt.js";
import "./middlewares/passport/local.js";
import "./middlewares/passport/github.js";
import routerApi from "./routes/index.js";
//import ProductManager from "./daos/filesystem/ProductDao.js";
//import ProductDao from "./daos/mongodb/ProductDao.js";
//import MessagesDao from "./daos/mongodb/MessagesDao.js";
//import MessageManager from "./daos/filesystem/MessagesDao.js";
import config from "../config.js";
import morgan from "morgan"


const app = express();
const port = config.PORT;
const httpServer = app.listen(port, () => {
  logger.info(`Server iniciado en el puerto ${port}`);
});
const socketServer = new Server(httpServer);
//const productDao = new ProductManager ();
//const productDao = new ProductDao ();
//const messageDao = new MessagesDao ();
//const messageDao = new MessageManager ();

app.use(
  session({
    store: new MongoStore ({
      mongoUrl: config.MONGO_URL,
      ttl: 10,
      crypto: {secret: config.SESSION_SECRET},
      autoremove: "internal",
    }),
    secret: config.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {maxAge: 1500},
  })
);
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");
app.use("/", routerApi);
app.use(errorHandler);

/*socketServer.on("connection", (socket) => {
  console.log("Usuario conectado", socket.id);
  socket.on("disconnect", () => {
    console.log("Usuario desconectado");
  });

  socket.on("newProduct", async (obj) => {
    await productDao.addProduct(obj);
    socketServer.emit("arrayProductsAdd", await productDao.getProducts());
  });

  socket.on("erase", async (id) => {
    await productDao.deleteProduct(id);
    socketServer.emit("arrayProductsErase", await productDao.getProducts());
  });

  socket.on("mostrar", async () => {
    const listado = await productDao.getProducts();
    socketServer.emit("mostrar", listado);
  });

  socket.on("newUser", (user) => {
    console.log(`${user} is logged in`);
  });

  socket.on("chat:message", async (msg) => {
    await messageDao.createMsg(msg);
    socketServer.emit("messages", await messageDao.getAll());
  });

  socket.on("newUser", (user) => {
    socket.broadcast.emit("newUser", user);
  });

  socket.on("chat:typing", (data) => {
    socket.broadcast.emit("chat:typing", data);
  });
});*/
