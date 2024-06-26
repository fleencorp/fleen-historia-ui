export class FleenResponse {

  public message: string;
  public timestamp: Date;
  public statusCode: number;

  public constructor(data: FleenResponse) {
    this.message = data.message;
    this.timestamp = data.timestamp;
    this.statusCode = data.statusCode;
  }
}
