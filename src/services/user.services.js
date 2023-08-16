import Services from "./class.services.js";
import factory from "../persistence/daos/factory.js";
import { logger } from "../utils/logger.js";
import UserRepository from "../persistence/daos/repository/user.repository.js";

const userRepository = new UserRepository();
const {userManager} = factory;

export default class UserService extends Services {
  constructor() {
    super (userManager)
  }

  register = async (user) => {
    try {
      const token = await this.manager.register (user);
      return token;
    } catch (error) {
      logger.error(error);
      throw new Error (error.message);
    }
  };
  
  login = async (user) => {
    try {
      const usuario = await this.manager.login (user);
      return usuario;
    } catch (error) {
      logger.error(error);
      throw new Error (error.message);
    }
  };

  getUser = async (email) => await userRepository.getUser(email);

  changePassword = async ({ email, newpassword }) =>
    await userRepository.resetPassword({ email, newpassword });

  recoverPassword = async (user) => await userRepository.recoverPassword(user)
  
  changeRole = async (uid) => await userRepository.changeRole(uid)


}
