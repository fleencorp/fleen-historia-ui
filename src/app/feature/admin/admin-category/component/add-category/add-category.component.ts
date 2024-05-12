import {Component, EventEmitter, Input, Output} from '@angular/core';
import {YouTubeCategoryResponse} from "@app/model/response/youtube";
import {BaseFormImplComponent} from "@app/base/component";
import {isFalsy, isTruthy} from "@app/shared/helper";
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

  public descriptionCtrl: FormControl = new FormControl<string>('', [maxLength(3000)]);

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
    this.initDetails();

  }

  public override initDetails(): void {
    if (isTruthy(this.entry)) {
      this.descriptionCtrl.patchValue(this.entry.description);
    }
  }

  public updateCategory(): void {
    if (isFalsy(this.isSubmitting)) {
      this.clearAllMessages();
      this.disableSubmittingAndResetErrorMessage();

      this.categoryService.addCategory(this.getCategoryPayload())
        .subscribe({
          next: (): void => { this.formCompleted((): void => {
            this.notifyUpdatedCategory();
            this.enableSubmitting();
          });
        },
        error: (error: ErrorResponse): void => {
          this.handleError(error);
          this.enableSubmitting();
        },
      });
    }
  }

  private getCategoryPayload(): CreateCategoryPayload {
    return  {
      title: this.entry.categoryDetails.snippet.title,
      description: this.descriptionCtrl.value,
      categoryExternalId: this.entry.categoryDetails.id
    }
  }

  public notifyUpdatedCategory(): void {
    this.addedCategory.emit(this.entry.categoryDetails.id);
  }

  get description(): string {
    return this.descriptionCtrl.value;
  }

}
