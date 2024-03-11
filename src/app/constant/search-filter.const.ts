import {
  AFTER_DATE_SEARCH_KEY,
  AFTER_DATE_SEARCH_LABEL,
  BEFORE_DATE_SEARCH_KEY,
  BEFORE_DATE_SEARCH_LABEL,
  BETWEEN_DATE_SEARCH_KEY,
  BETWEEN_DATE_SEARCH_LABEL,
  BETWEEN_DATE_TYPE,
  DATE_TYPE,
  NO_INPUT_KEY
} from "@app/constant/search.const";
import {SearchFilter} from "@app/model/type";

/**
 * Search filters for searching with all date options.
 */
export const SEARCH_FILTER_ALL_DATE: SearchFilter[] = [
  { key: NO_INPUT_KEY, label: '' },
  { key: BETWEEN_DATE_SEARCH_KEY, type: BETWEEN_DATE_TYPE, label: BETWEEN_DATE_SEARCH_LABEL },
  { key: AFTER_DATE_SEARCH_KEY, type: DATE_TYPE, label: AFTER_DATE_SEARCH_LABEL },
  { key: BEFORE_DATE_SEARCH_KEY, type: DATE_TYPE, label: BEFORE_DATE_SEARCH_LABEL }
];

/**
 * Search filters for searching with between date option.
 */
export const SEARCH_FILTER_BETWEEN_DATE: SearchFilter[] = [
  { key: NO_INPUT_KEY, label: '' },
  { key: BETWEEN_DATE_SEARCH_KEY, type: BETWEEN_DATE_TYPE, label: BETWEEN_DATE_SEARCH_LABEL },
];

/**
 * Search filters for viewing Fleen videos.
 */
export const SEARCH_FILTER_VIEW_FLEEN_VIDEOS: SearchFilter[] = [
  ...SEARCH_FILTER_BETWEEN_DATE,
  { key: 'title', label: 'Title' },
  { key: 'visibility', label: 'Visibility' }
];
