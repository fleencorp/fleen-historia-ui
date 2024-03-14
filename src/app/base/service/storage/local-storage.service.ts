import {Injectable} from '@angular/core';


/**
 * @class LocalStorageService
 * @description
 *   This class provides methods for interacting with the browser's local storage.
 *
 * @remarks
 *   All methods in this class operate on the `localStorage` object of the browser.
 *
 * @author Yusuf Alamu Musa
 * @version 1.0
 */
@Injectable()
export class LocalStorageService {
  /**
   * @constructor
   * @description
   *   Initializes a new instance of the LocalStorageService.
   */
  constructor() {}

  /**
   * @method getObject
   * @description
   *   Retrieves the value associated with the specified key from local storage.
   *
   * @param {string} key - The key for which to retrieve the value.
   * @returns {string | null} - The retrieved value or null if the key does not exist.
   */
  public getObject(key: string): string | null {
    return localStorage.getItem(key);
  }

  /**
   * @method setObject
   * @description
   *   Sets the value associated with the specified key in local storage.
   *
   * @param {string} key - The key for which to set the value.
   * @param {string} value - The value to set.
   */
  public setObject(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  /**
   * @method hasObject
   * @description
   *   Checks if a value associated with the specified key exists in local storage.
   *
   * @param {string} key - The key to check for existence.
   * @returns {boolean} - True if the key exists, false otherwise.
   */
  public hasObject(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }

  /**
   * @method removeObject
   * @description
   *   Removes the value associated with the specified key from local storage.
   *
   * @param {string} key - The key for which to remove the value.
   */
  public removeObject(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * @method clear
   * @description
   *   Clears all key-value pairs from local storage.
   */
  public clear(): void {
    localStorage.clear();
  }

  /**
   * @method clearObject
   * @description
   *   Removes multiple key-value pairs from local storage based on the provided keys.
   *
   * @param {...string} keys - The keys for which to remove key-value pairs.
   */
  public clearObject(...keys: string[]): void {
    if (Array.isArray(keys) && keys.length > 0) {
      keys.forEach((key: string): void => localStorage.removeItem(key));
    }
  }
}
