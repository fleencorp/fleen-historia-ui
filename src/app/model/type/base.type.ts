/**
 * @typedef AnyArray
 * @description
 *   Represents an array that can have elements of varying types, such as [string, any][] or any.
 */
export type AnyArray = [string, any][] | any;

/**
 * @typedef AnyObject
 * @description
 *   Represents an object with string keys and values of any type.
 */
export type AnyObject = Record<string, any>;

/**
 * @typedef AnyRegEx
 * @description
 *   Represents an object with properties of any type. Often used to store regular expressions.
 */
export type AnyRegEx = AnyObject;

/**
 * @typedef TwoArray
 * @description
 *   Represents an array that can have either two numbers, two strings, or be null.
 */
export type TwoArray = [number, number] | [string, string] | null;

/**
 * @typedef DependencyProvider
 * @description
 *   Represents a dependency provider configuration for use in Angular's dependency injection.
 *
 * @property {string} provide - The key used to provide the dependency in the dependency injection.
 * @property {AnyObject} useValue - The actual value or object to be provided.
 */
export type DependencyProvider = {
  provide: string;
  useValue: AnyObject;
}


/**
 * @typedef SearchPayload
 * @type {object}
 * @description
 *   Represents a payload for search operations.
 *   It is an object where keys can be any string, and values can be of any type.
 */
export type SearchPayload = {
  [key: string]: any;
};


/**
 * @typedef DeleteIdsPayload
 * @type {object}
 * @description
 *   Represents a payload for deleting items by their IDs.
 *   It includes an array of IDs, where each ID can be a string or a number.
 */
export type DeleteIdsPayload = {
  ids: Array<string | number>;
};


/**
 * @typedef SearchFilter
 * @type {object}
 * @property {string} key - The key used for filtering.
 * @property {string} label - The human-readable label for the filter.
 * @property {string | undefined} [type] - The type of filter (optional).
 * @description
 *   Represents a search filter with key, label, and an optional type.
 */
export type SearchFilter = {
  key: string;
  label: string;
  type?: string;
};


/**
 * @typedef SearchParamPayload
 * @type {object}
 * @property {string} type - The type of search parameter.
 * @property {string} value - The value of the search parameter.
 * @description
 *   Represents a payload for specifying a search parameter with type and value.
 */
export type SearchParamPayload = {
  type: string;
  value: string;
};


/**
 * @type FileConstraints
 * @description
 *   Represents constraints for file-related operations.
 *   - `maxFileSize`: Maximum allowed file size.
 *   - `allowableTypes`: Array of allowable file types.
 *   - `fileSizeUnit`: Unit of file size (e.g., 'MB').
 */
export type FileConstraints = {
  maxFileSize: number;
  allowableTypes: string[];
  fileSizeUnit: 'MB';
};


/**
 * @type DateAndTimeConstraints
 * @description
 *   Represents constraints for date and time-related operations.
 *   - `pattern`: Date and time pattern.
 *   - `minTime`: Minimum allowed time.
 */
export type DateAndTimeConstraints = {
  pattern?: string;
  minTime?: string;
};
