import {isFunction, isTruthy} from "@app/shared/helper";
import {Constructor} from "@app/model/interface";

/**
 * @class SearchResultView
 * @template T - The type of values stored in the search result.
 * @description
 *   Represents a view of search results with pagination information.
 *   It includes metadata such as page number, page size, total entries, total pages,
 *   and flags indicating whether the current page is the last or first page.
 *   The actual search results are stored in the `values` array.
 *
 * @author Yusuf Alamu Musa
 */
export class SearchResultView<T extends Object> {

  /**
   * @property pageNo
   * @description
   *   The current page number in the search results.
   */
  public pageNo: number;

  /**
   * @property pageSize
   * @description
   *   The number of entries per page in the search results.
   */
  public pageSize: number;

  /**
   * @property totalEntries
   * @description
   *   The total number of entries across all pages.
   */
  public totalEntries: number;

  /**
   * @property totalPages
   * @description
   *   The total number of pages in the search results.
   */
  public totalPages: number;

  /**
   * @property isLast
   * @description
   *   A boolean indicating whether the current page is the last page.
   */
  public isLast: boolean;

  /**
   * @property isFirst
   * @description
   *   A boolean indicating whether the current page is the first page.
   */
  public isFirst: boolean;

  /**
   * @property nextPageToken
   * @description
   *   A string indicating whether there is a next page token.
   */
  public nextPageToken: string | undefined;

  /**
   * @property prevPageToken
   * @description
   *   A string indicating whether there is a previous page token.
   */
  public prevPageToken: string | undefined;

  /**
   * @property values
   * @description
   *   An array containing the actual search results.
   */
  public values: T[];

  /**
   * @constructor
   * @description
   *   Initializes a new instance of the SearchResultView class.
   *
   * @param data - The data object containing information about the search results.
   */
  public constructor(data: SearchResultView<T>, Constructor?: Constructor<T>) {
    this.pageNo = data?.pageNo;
    this.pageSize = data?.pageSize;
    this.totalEntries = data?.totalEntries;
    this.totalPages = data?.totalPages;
    this.isLast = data?.isLast;
    this.isFirst = data?.isFirst;
    this.nextPageToken = data?.nextPageToken;
    this.prevPageToken = data?.prevPageToken;
    this.values = data?.values ? data.values : [];
    this.toValues(Constructor);
  }

  public toValues(Constructor: Constructor<T>): void {
    const entries: T[] = [];
    if (isTruthy(this.values) && Array.isArray(this.values)
        && Constructor != null && isFunction(Constructor)) {
        this.values.forEach((value: T): void => { entries.push(new Constructor(value)); });
      this.values = entries;
    }
  }
}
