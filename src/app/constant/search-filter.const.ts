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

const EMPTY_FILTER: SearchFilter[] = [
  { key: NO_INPUT_KEY, label: '' },
]

/**
 * Search filters for searching with all date options.
 */
export const SEARCH_FILTER_ALL_DATE: SearchFilter[] = [
  { key: BETWEEN_DATE_SEARCH_KEY, type: BETWEEN_DATE_TYPE, label: BETWEEN_DATE_SEARCH_LABEL },
  { key: AFTER_DATE_SEARCH_KEY, type: DATE_TYPE, label: AFTER_DATE_SEARCH_LABEL },
  { key: BEFORE_DATE_SEARCH_KEY, type: DATE_TYPE, label: BEFORE_DATE_SEARCH_LABEL }
];

export const SEARCH_FILTER_DEFAULT: SearchFilter[] = [
  { key: BETWEEN_DATE_SEARCH_KEY, type: BETWEEN_DATE_TYPE, label: BETWEEN_DATE_SEARCH_LABEL },
]

/**
 * Search filters for searching with between date option.
 */
export const SEARCH_FILTER_BETWEEN_DATE: SearchFilter[] = [
  ...SEARCH_FILTER_DEFAULT
];

/**
 * Search filters for viewing Fleen videos.
 */
export const SEARCH_FILTER_VIEW_FLEEN_VIDEOS: SearchFilter[] = [
  ...EMPTY_FILTER,
  { key: 'title', label: 'Title' },
  { key: 'visibility', label: 'Visibility' },
  ...SEARCH_FILTER_BETWEEN_DATE
];

export const SEARCH_FILTER_VIEW_USER_FLEEN_VIDEOS: SearchFilter[] = [
  ...EMPTY_FILTER,
  { key: 'title', label: 'Title' },
];

export const SEARCH_FILTER_VIEW_CATEGORIES: SearchFilter[] = [
  ...EMPTY_FILTER,
  { key: 'title', label: 'Title' },
  ...SEARCH_FILTER_BETWEEN_DATE,
];

export const SEARCH_FILTER_VIEW_CHANNEL: SearchFilter[] = [
  ...EMPTY_FILTER,
  { key: 'title', label: 'Title' },
];

export const SEARCH_FILTER_VIEW_MEMBER: SearchFilter[] = [
  ...EMPTY_FILTER,
  { key: 'email_address', label: 'Email Address' },
  { key: 'verification_status', label: 'Verification Status' },
  { key: 'member_status', label: 'Member Status' },
  ...SEARCH_FILTER_ALL_DATE,
];

