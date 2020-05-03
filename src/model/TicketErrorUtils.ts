import TicketError from "./TicketError";

const createTicketAndLog = (err: Error, logMessage?: string): TicketError => {
  const ticketError = TicketError.fromError(err);
  console.log(ticketError.ticket);
  if (logMessage) console.log(logMessage);
  return ticketError;
};

export default {
  createTicketAndLog,
};

// export default createTicketAndLog;
