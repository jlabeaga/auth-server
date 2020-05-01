import Status from "./Status";

class Result {
  static fromData(data: any) {
    return new Result(Status.OK, data, "", "");
  }
  static fromError(error: string, stack: string = "") {
    return new Result(Status.ERROR, null, error, stack);
  }
  constructor(
    public status: Status = Status.OK,
    public data: any,
    public error: string = "",
    public stack: string = ""
  ) {}
}

export default Result;
