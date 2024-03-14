import {Injectable} from '@angular/core';
import {AnyObject, BaseRequest, UpdateCategoryPayload} from "@app/model/type";
import {map, Observable} from "rxjs";
import {SearchResultView} from "@app/model/view";
import {mapToSearchResult} from "@app/shared/helper";
import {HttpClientService} from "@app/shared/service/impl";
import {CategoryView} from "@app/model/view/category";
import {DeleteResponse} from "@app/model/response/common";

@Injectable({
  providedIn: 'root'
})
export class AdminCategoryService {

  private readonly BASE_PATH: string = "admin/category";

  constructor(
    private httpService: HttpClientService) { }


  public findCategories(params: AnyObject): Observable<SearchResultView<CategoryView>> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'entries'], params);
    return this.httpService.get(req)
      .pipe(
        map(data => mapToSearchResult(CategoryView, data))
      );
  }

  public findCategory(id: number | string): Observable<CategoryView> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'detail', +id]);
    return this.httpService.get(req)
      .pipe(
        map(data => new CategoryView(data))
      );
  }

  public updateCategory(id: number | string, body: UpdateCategoryPayload): Observable<CategoryView> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'update', +id], null, { ...body });
    return this.httpService.update(req)
      .pipe(
        map(data => new CategoryView(data))
      );
  }

  public deleteCategory(id: number | string): Observable<DeleteResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'delete', +id]);
    return this.httpService.delete(req)
      .pipe(
        map(data => new DeleteResponse(data))
      );
  }
}
