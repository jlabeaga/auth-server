import Status from "./Status";

class Result {
  constructor(
    public status: Status = Status.OK,
    public data?: any,
    public error?: Error
  ) {}
  static fromData(data: any) {
    return new Result(Status.OK, data);
  }
  static fromErrorMessage(errorMessage: string) {
    return new Result(Status.ERROR, null, {
      message: errorMessage,
      name: "",
      stack: undefined,
    });
  }
  static fromError(error: Error) {
    return new Result(Status.ERROR, null, error);
  }
}

export default Result;
