import {Component, OnInit} from '@angular/core';
import {BaseEntriesComponent} from "@app/base/component";
import {AnyObject, DeleteIdsPayload, SearchFilter} from "@app/model/type";
import {SEARCH_FILTER_VIEW_FLEEN_VIDEOS} from "@app/constant/search-filter.const";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {Observable} from "rxjs";
import {SearchResultView} from "@app/model/view";
import {ANY_EMPTY} from "@app/constant";
import {AdminCategoryService} from "@app/feature/admin/admin-category/service/admin-category.service";
import {CategoryView} from "@app/model/view/category";

@Component({
  selector: 'app-category-entries',
  templateUrl: './category-entries.component.html',
  styleUrls: ['./category-entries.component.css']
})
export class CategoryEntriesComponent extends BaseEntriesComponent<CategoryView> implements OnInit {

  public override entries: CategoryView[] = [];
  public override searchFilter: SearchFilter[] = SEARCH_FILTER_VIEW_FLEEN_VIDEOS;

  public constructor(protected categoryService: AdminCategoryService,
                     router: Router,
                     route: ActivatedRoute,
                     location: Location) {
    super(router, route, location);
  }

  public ngOnInit(): void {
    this.startComponent();
  }

  override findEntries(params: AnyObject): Observable<SearchResultView<CategoryView>> {
    return this.categoryService.findCategories(params);
  }


  override deleteEntries(payload: DeleteIdsPayload): Observable<any> {
    return ANY_EMPTY;
  }
}
