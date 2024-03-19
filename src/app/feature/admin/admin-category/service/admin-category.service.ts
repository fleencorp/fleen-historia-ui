import {Injectable} from '@angular/core';
import {AnyObject, BaseRequest, CreateCategoryPayload, UpdateCategoryPayload} from "@app/model/type";
import {Observable} from "rxjs";
import {SearchResultView} from "@app/model/view";
import {HttpClientService} from "@app/shared/service/impl";
import {CategoryView} from "@app/model/view/category";
import {DeleteResponse} from "@app/model/response/common";
import {toSearchResult} from "@app/shared/rxjs";

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
        toSearchResult(CategoryView),
      );
  }

  public findCategory(id: number | string): Observable<CategoryView> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'detail', +id]);
    return this.httpService.get(req, CategoryView);
  }

  public addCategory(body: CreateCategoryPayload): Observable<CategoryView> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'add'], null, { ...body });
    return this.httpService.post(req, CategoryView);
  }

  public updateCategory(id: number | string, body: UpdateCategoryPayload): Observable<CategoryView> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'update', +id], null, { ...body });
    return this.httpService.update(req, CategoryView);
  }

  public deleteCategory(id: number | string): Observable<DeleteResponse> {
    const req: BaseRequest = this.httpService.toRequest([this.BASE_PATH, 'delete', +id]);
    return this.httpService.delete(req, DeleteResponse);
  }
}
