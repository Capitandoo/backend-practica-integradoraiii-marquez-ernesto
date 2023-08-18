import Controllers from "./class.controllers.js";
import UserService from "../services/user.services.js";
import { createHash, createResponse, isValidPassword } from "../utils/utils.js";
import { logger } from "../utils/logger.js";
import { transporter } from "../services/email.services.js";
import config from "../../config.js";

const userService = new UserService();

export default class UserController extends Controllers {
  constructor(){
      super(userService)
  }  
  
  register = async (req, res, next) => {
    try {
      const token = await this.service.register (req.body);
      createResponse (res, 200, token);
    } catch (error) {
      logger.error(error);
      next(error.message);
    }
  };  
  
  login = async (req, res, next) => {
    try {
      const user = await this.service.login (req.body);
      createResponse(res, 200, user);
    } catch (error) {
      logger.error(error);
      next(error.message);
    }
  };
  
  github = async (req, res, next) => {
    try {
      const { first_name, last_name, email, role, isGithub } = req.user;
      res.json({
        msg: "Register/Login Github OK",
        session: req.session,
        userData: {
          first_name,
          last_name,
          email,
          role,
          isGithub,
        },
      });
    } catch (error) {
      logger.error(error);
      next(error.message);
    }
  };

  perfil = async (req, res, next) => {
    try {
      const { first_name, last_name, email, role } = req.user;
      createResponse(res, 200, {
          first_name,
          last_name,
          email,
          role
      })
  } catch (error) {
    logger.error(error);
      next(error.message)
  }
  }
  
  logout = async (req, res, next) => {
    try {
      req.session.destroy((err) => {
        if (err) {
            console.log(err);
        } else{
            res.send("logout");
        };
    });
      //res.clearCookie("token").send("logout");
    } catch (error) {
      logger.error(error);
      next(error.message);
    }
  };

  resetpassword = async (req, res, next) => {
    let { email, newpassword } = req.body;
    const user = await userService.getUser (email);
    if (user?.error)
      return res.status(401).send({ error: `Usuario no encotrado` });
    if (isValidPassword(newpassword, user))
      return res.send({ error: `La nueva clave debe ser distinta de la antigüa` });
    newpassword = createHash(newpassword);
    let response = await userService.changePassword({ email, newpassword });
    response?.error
      ? res.status(400).send({ error: response.error })
      : res.send({
          success: `Clave modificada correctamente.`,
        });
  };

  recoverpassword = async (req, res) => {
    let { email } = req.body;
    const user = await userService.getUser(email);
    if (user?.error)
      return res.status(401).send({ error: `Usuario no encontrado` });
    user.recover_password = {
      id_url: uuidv4(),
      createTime: new Date(),
    };
    await userService.recoverPassword(user);
    user.recover_password.id_url;
    let result = await transporter.sendMail({
      from: config.EMAIL,
      to: email,
      subject: "Recuperar contraseña",
      html: `<a href="http://localhost:8080/resetpassword/${user.recover_password.id_url}">Recuperar Contrasena</a>`
    })
    response.send({ result })
  };

  changeRole = async (req, res, next) =>{
    const { uid } = req.params;
    let result = await userService.changeRole(uid)
    res.send({result});
  }

}
