class TicketError implements Error {
  public ticket: string;
  public name: string;
  public message: string;
  public stack?: string;

  constructor(originalError: Error) {
    this.ticket = "AUTH_SERVER_TICKET_" + new Date().toISOString();
    this.name = originalError.name;
    this.message = originalError.message;
    this.stack = originalError.stack;
  }
  static fromError(err: Error): TicketError {
    return new TicketError(err);
  }
  static fromErrorMessage(message: string): TicketError {
    const error = new Error(message);
    return new TicketError(error);
  }
}

export default TicketError;
