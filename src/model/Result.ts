import Status from "./Status";

class Result {
  constructor(
    public status: Status = Status.OK,
    public data?: any,
    public error?: any
  ) {}
  static fromData(data: any) {
    return new Result(Status.OK, data);
  }
  static fromErrorMessage(errorMessage: string) {
    return new Result(Status.ERROR, null, errorMessage);
  }
  static fromError(error: Error) {
    return new Result(Status.ERROR, null, error);
  }
}

export default Result;
