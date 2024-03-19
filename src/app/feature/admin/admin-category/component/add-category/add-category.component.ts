import {Component, EventEmitter, Input, Output} from '@angular/core';
import {YouTubeCategoryResponse} from "@app/model/response/youtube";
import {BaseFormImplComponent} from "@app/base/component";
import {isFalsy} from "@app/shared/helper";
import {ErrorResponse} from "@app/model/response";
import {AdminCategoryService} from "@app/feature/admin/admin-category/service";
import {CreateCategoryPayload} from "@app/model/type";
import {FormControl} from "@angular/forms";
import {maxLength} from "@app/shared/validator";

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent extends BaseFormImplComponent {

  public $description: FormControl = new FormControl<string>('', [maxLength(3000)]);

  @Input('entry')
  public entry!: YouTubeCategoryResponse;

  @Output()
  public addedCategory: EventEmitter<string> = new EventEmitter<string>();

  public constructor(
      protected categoryService: AdminCategoryService) {
    super();
  }

  public ngOnInit(): void {
    this.formReady();
  }

  public addCategory(): void {
    if (isFalsy(this.isSubmitting)) {
      this.disableSubmittingAndResetErrorMessage();

      this.categoryService.addCategory(this.getAddCategoryPayload())
        .subscribe({
          next: (): void => { this.formCompleted(this.notifyNewAddedCategory.bind(this)); },
          error: (error: ErrorResponse): void => { this.handleError(error); },
          complete: async (): Promise<void> => { this.enableSubmitting(); }
      });
    }
  }

  private getAddCategoryPayload(): CreateCategoryPayload {
    return  {
      title: this.entry.categoryDetails.snippet.title,
      categoryExternalId: this.entry.categoryDetails.id
    }
  }

  public notifyNewAddedCategory(): void {
    this.addedCategory.emit(this.entry.categoryDetails.id);
  }

  get description(): string {
    return this.$description.value;
  }

}
