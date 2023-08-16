import factory from "../factory.js";
//import TicketDTO from "../../dtos/ticket/ticket.dto.js";

const { ticketManager } = factory;

export default class TicketRepository {
  constructor() {
    this.dao = ticketManager;
  }

  async createTicket(ticket) {
    //let ticketDBFormat = new TicketDTO(ticket);
    return await this.dao.addTicket(ticket);
  }
}

