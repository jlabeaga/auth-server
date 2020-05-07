import Status from "./Status";

class Result {
  constructor(
    public status: Status = Status.SUCCESS,
    public message: string,
    public data?: any,
    public error?: Error
  ) {}
  static fromData(data: any, message: string = "Success") {
    return new Result(Status.SUCCESS, message, data);
  }
  static fromErrorMessage(errorMessage: string) {
    return new Result(Status.ERROR, errorMessage, {
      message: errorMessage,
      name: "",
      stack: undefined,
    });
  }
  static fromError(error: Error) {
    return new Result(Status.ERROR, error.message, null, error);
  }
}

export default Result;
