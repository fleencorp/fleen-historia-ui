export class FleenBaseView {

  private readonly createdOn: Date;
  private readonly updatedOn: Date;

  public constructor(data: FleenBaseView) {
    this.createdOn = data?.createdOn ? new Date(data.createdOn) : new Date();
    this.updatedOn = data?.updatedOn ? new Date(data.updatedOn) : new Date();
  }
}
