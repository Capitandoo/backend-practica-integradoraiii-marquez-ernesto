export default class TicketDTO {
  async ticket(ticket) {
    let ticketParams = {
      code: ticket.code,
      purchase_datetime: ticket.purchase_datetime,
      amount: ticket.amount,
      purchaser: ticket.purchaser,
    };
    console.log('desdeTicketDto',ticketParams)
    return ticketParams;
  }
}

