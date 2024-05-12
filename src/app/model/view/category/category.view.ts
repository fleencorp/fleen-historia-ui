import {FleenBaseView} from "@app/model/view";

export class CategoryView extends FleenBaseView {
  public readonly categoryId: number;
  public readonly title: string;
  public readonly description: string;
  public readonly isActive: boolean;

  public constructor(data: CategoryView) {
    super(data);
    this.categoryId = data?.categoryId ?? 0;
    this.title = data?.title ?? '';
    this.description = data?.description ?? '';
    this.isActive = data?.isActive ?? false;
  }
}
