import fs from "fs";
import { pathMessages } from "../../../../path.js";

export default class MessageManager {
  constructor() {
    this.path = pathMessages;
  }

  async getAll() {
    try {
      if (!fs.existsSync(this.path)) {
        fs.writeFileSync (this.path, '[]');
      } 
      const msgsJS = JSON.parse (await fs.promises.readFile(this.path, "utf8"));
      return msgsJS;
    } catch (error) {
      console.log(error);
    }
  }

  async createMsg(obj) {
    try {
      const msg = {
        id: await this.#getMaxId() + 1,
        ...obj,
      };
      const msgFile = await this.getAll();
      msgFile.push(msg);
      await fs.promises.writeFile(this.path, JSON.stringify(msgFile));
      return msg;
    } catch (error) {
      console.log(error);
    }
  }

  async #getMaxId() {
    let maxId = 0;
    const msgs = await this.getAll();
    msgs.map((msg) => {
      if (msg.id > maxId) maxId = msg.id;
    });
    return maxId;
  }


  async getById(id) {
    const msgsFile = await this.getAll();
    const msg = msgsFile.find((sms) => sms.id === id);
    if (msg) {
      return msg;
    }
    return false;
  }

  async updateMsg(obj, id) {
    try {
      const msgsFile = await this.getAll();
      const index = msgsFile.findIndex((msg) => msg.id === id);
      if (index === -1) {
        throw new Error(`Id ${id} not found`);
      } else {
        msgsFile[index] = { ...obj, id };
      }
      await fs.promises.writeFile(this.path, JSON.stringify(msgsFile));
    } catch (error) {
      console.log(error);
    }
  }

  async deleteMsg(id) {
    const msgsFile = await this.getAll();
    if (msgsFile.length > 0) {
      const newArray = msgsFile.filter((m) => m.id !== id);
      await fs.promises.writeFile(this.path, JSON.stringify(newArray));
    } else {
      throw new Error(`Msg not found`);
    }
  }

  async deleteMsgs() {
    if (fs.existsSync(this.path)) {
      await fs.promises.unlink(this.path);
    }
  }
}
