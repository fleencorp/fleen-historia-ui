import {Component, OnInit} from '@angular/core';
import {BaseEntriesComponent} from "@app/base/component";
import {AnyObject, DeleteIdsPayload, SearchFilter, SearchPayload} from "@app/model/type";
import {SEARCH_FILTER_VIEW_CATEGORIES} from "@app/constant/search-filter.const";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {Observable} from "rxjs";
import {FleenBaseView, SearchResultView} from "@app/model/view";
import {ANY_EMPTY} from "@app/constant";
import {CategoryView} from "@app/model/view/category";
import {DeleteResponse} from "@app/model/response/common";
import {ErrorResponse} from "@app/model/response";
import {AdminCategoryService} from "@app/feature/admin/admin-category/service";
import {DeleteStatusEnum} from "@app/model/enum";
import {removeProperty} from "@app/shared/helper";

@Component({
  selector: 'app-category-entries',
  templateUrl: './category-entries.component.html',
  styleUrls: ['./category-entries.component.css']
})
export class CategoryEntriesComponent extends BaseEntriesComponent<CategoryView> implements OnInit {

  public override entries: CategoryView[] = [];
  public override searchFilter: SearchFilter[] = SEARCH_FILTER_VIEW_CATEGORIES;
  public override defaultEntryIdKey: string = 'categoryId';

  public constructor(
      protected categoryService: AdminCategoryService,
      router: Router,
      route: ActivatedRoute,
      location: Location) {
    super(router, route, location);
  }

  public ngOnInit(): void {
    this.enableLoading();
    this.startComponent();
  }

  public override async search(payload: SearchPayload): Promise<void> {
    removeProperty(payload, 'q');
    await super.search(payload);
  }

  public override findEntries(params: AnyObject): Observable<SearchResultView<CategoryView>> {
    return this.categoryService.findCategories(params);
  }

  public override deleteEntryMethod(id: number | string): Observable<DeleteResponse> {
    return this.categoryService.deleteCategory(id);
  }

  public override deleteEntries(payload: DeleteIdsPayload): Observable<DeleteResponse> {
    return this.categoryService.deleteManyCategories(payload);
  }
}
