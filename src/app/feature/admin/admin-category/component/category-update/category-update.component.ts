import {Component, OnInit} from '@angular/core';
import {BaseUpdateComponent} from "@app/base/component";
import {UpdateCategoryPayload, UpdateVideoPayload} from "@app/model/type";
import {CategoryView} from "@app/model/view/category";
import {AbstractControl, FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {maxLength, minLength, required} from "@app/shared/validator";
import {AdminCategoryService} from "@app/feature/admin/admin-category/service";

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.css']
})
export class CategoryUpdateComponent extends BaseUpdateComponent<CategoryView, UpdateCategoryPayload> implements OnInit {

  public override entryView!: CategoryView;

  public constructor(
    private categoryService: AdminCategoryService,
    protected formBuilder: FormBuilder,
    router: Router,
    route: ActivatedRoute) {
    super(router, route);
  }

  public async ngOnInit(): Promise<void> {
    await this.initEntry();
  }

  protected override getServiceEntry(id: number | string): Observable<CategoryView> {
    return this.categoryService.findCategory(id);
  }

  protected override $updateEntry(id: string | number, dto: UpdateVideoPayload): Observable<CategoryView> {
    return this.categoryService.updateCategory(id, dto);
  }

  protected override initForm(): void {
    this.fleenForm = this.formBuilder.group({
      title: [this.category?.title, [required, minLength(1), maxLength(255)]],

      description: [this.category?.title, [required, minLength(1), maxLength(3000)]],
    });

    this.formReady();
  }

  get category(): CategoryView {
    return this.entryView;
  }

  get updateCategoryForm(): FormGroup {
    return this.fleenForm;
  }

  public updateCategory(): void {
    this.updateEntry();
  }

  get title(): AbstractControl | null | undefined {
    return this.fleenForm?.get('title');
  }

  get description(): AbstractControl | null | undefined {
    return this.fleenForm?.get('description');
  }

}
