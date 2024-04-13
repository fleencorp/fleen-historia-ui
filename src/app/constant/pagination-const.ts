import {PaginationAction} from "@app/model/type";

/**
 * Default page size used for pagination.
 */
export const DEFAULT_PAGE_SIZE: number = 10;

/**
 * Default query parameter key used for specifying the page number in pagination requests.
 */
export const DEFAULT_PAGE_NO_KEY: string = 'page';

/**
 * Default query parameter key used for specifying the next page token in pagination requests.
 */
export const DEFAULT_NEXT_PAGE_TOKEN_KEY: string = 'next_page_token';

/**
 * Default query parameter key used for specifying the previous page token in pagination requests.
 */
export const DEFAULT_PREV_PAGE_TOKEN_KEY: string = 'prev_page_token';

/**
 * Constant representing the search key for video status.
 */
export const VIDEO_STATUS_SEARCH_KEY: string = 'status';

/**
 * Constant representing the search key for video title.
 */
export const VIDEO_TITLE_SEARCH_KEY: string = 'title';

/**
 * Constant representing the search key for video query.
 */
export const VIDEO_QUERY_SEARCH_KEY: string = 'q';


