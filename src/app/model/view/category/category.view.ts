import {FleenBaseView} from "@app/model/view";

export class CategoryView extends FleenBaseView {

  public readonly categoryId: number;
  public readonly title: string;
  public readonly description: string;

  public constructor(data: CategoryView) {
    super(data);
    this.categoryId = data?.categoryId;
    this.title = data?.title;
    this.description = data?.description;
  }
}
