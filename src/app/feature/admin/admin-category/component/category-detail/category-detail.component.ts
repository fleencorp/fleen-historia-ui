import {Component, OnInit} from '@angular/core';
import {BaseDetailComponent} from "@app/base/component";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {CategoryView} from "@app/model/view/category";
import {AdminCategoryService} from "@app/feature/admin/admin-category/service";


@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent extends BaseDetailComponent<CategoryView> implements OnInit {

  public override entryView!: CategoryView;
  protected override formBuilder;

  public constructor(
      private categoryService: AdminCategoryService,
      router: Router,
      route: ActivatedRoute) {
    super(router, route);
  }

  public async ngOnInit(): Promise<void> {
    this.enableLoading();
    await this.initEntry();
  }

  protected override getServiceEntry(id: number | string): Observable<CategoryView> {
    return this.categoryService.findCategory(id);
  }

  get category(): CategoryView {
    return this.entryView;
  }
}
