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
