export default class MessageRepository {
  constructor() {
    this.dao = DAO;
  }

  async saveMessage(data) {
    return await this.dao.create(data);
  }

  async getMessages() {
    return await this.dao.getAll();
  }
}
