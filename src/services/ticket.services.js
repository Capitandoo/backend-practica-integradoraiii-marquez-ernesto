import Services from "./class.services.js";
import factory from "../persistence/daos/factory.js";
import TicketRepository from "../persistence/daos/repository/ticket.repository.js";

const { ticketManager } = factory;
const ticketRepository = new TicketRepository();

export default class TicketServices extends Services {
  constructor() {
    super (ticketManager)
  }

  createTicket = async (ticket) => {
    const newTicket = await ticketRepository.createTicket(ticket);
    return  newTicket;
  }
}
