import factory from "../factory.js";
import UserDTO from "../../dtos/user/user.dto.js";

const { userManager } = factory;

export default class UserRepository {
  constructor() {
    this.dao = userManager;
  }

  async register(user) {
    let userDBFormat = new UserDTO(user);
    return await this.dao.create(userDBFormat);
  }

  async getUser(email) {
    return await this.dao.getByEmail(email);
  }

  async resetPassword({ email, newpassword }) {
    return await this.dao.updatePassword({ email, newpassword });
  }

  async recoverPassword(user) {
    return await this.dao.recoverPassword(user)
  }

  async changeRole(uid) {
    return await this.dao.changeRole(uid);
  }

}
