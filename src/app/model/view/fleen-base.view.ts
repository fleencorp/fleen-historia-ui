import {DeleteStatusEnum} from "@app/model/enum";

export class FleenBaseView {

  public readonly createdOn: Date;
  public readonly updatedOn: Date;
  public deleteStatus: DeleteStatusEnum = DeleteStatusEnum.NOT_STARTED;

  public constructor(data: FleenBaseView) {
    this.createdOn = data?.createdOn ? new Date(data.createdOn) : new Date();
    this.updatedOn = data?.updatedOn ? new Date(data.updatedOn) : new Date();
  }
}
