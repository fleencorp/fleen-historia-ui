
/**
 * @function isTruthy
 * @description
 *   Checks if the provided value is truthy.
 *
 * @param {any} value - The value to check for truthiness.
 * @returns {boolean} - True if the value is truthy, false otherwise.
 */
export function isTruthy(value: any): boolean {
  return !!value;
}

/**
 * @function isFalsy
 * @description
 *   Checks if the provided value is falsy.
 *
 * @param {any} value - The value to check for falseness.
 * @returns {boolean} - False if the value is false, true otherwise.
 */
export function isFalsy(value: any): boolean {
  return !value;
}


/**
 * Check if a value is an object.
 *
 * This function determines whether the provided value is an object by checking if it's truthy and has a type of 'object'.
 *
 * @param value The value to be checked.
 *
 * @returns `true` if the value is an object, `false` otherwise.
 *
 * @example
 * // Example usage:
 * const obj = { key: 'value' };
 * const isArray = Array.isArray(obj); // Result: false
 * const isObj = isObject(obj); // Result: true
 */
export function isObject(value: any): boolean {
  return isTruthy(value) && typeof value === 'object';
}


/**
 * Capitalize the first letter of a word and convert the rest of the letters to lowercase.
 *
 * This function takes a word as input and returns the word with its first letter capitalized and the rest of the letters in lowercase.
 *
 * @param word The word to be capitalized.
 *
 * @returns The capitalized word.
 *
 * @example
 * // Example usage:
 * const inputWord = 'hello';
 * const capitalizedWord = capitalizeFirstLetter(inputWord);
 * // Result: 'Hello'
 */
function capitalizeFirstLetter(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}


/**
 * Convert a space-separated or hyphen-separated string into camelCase.
 *
 * This function takes a string as input, which may be space-separated or hyphen-separated, and converts it into camelCase.
 * In camelCase, each word except the first is capitalized, and spaces or hyphens are removed.
 *
 * @param input The input string to convert to camelCase.
 *
 * @returns The input string converted to camelCase.
 *
 * @example
 * // Example usage:
 * const inputString = 'hello world';
 * const camelCasedString = toCamelCase(inputString);
 * // Result: 'helloWorld'
 */
export function toCamelCase(input: string): string {
  const words: string[] = input.split(/[\s_-]+/);
  const camelCaseWords: string[] = words.map((word:string, index: number): string =>
    index === 0 ? word.toLowerCase() : capitalizeFirstLetter(word)
  );

  return camelCaseWords.join('');
}


/**
 * Recursively converts object keys to camelCase.
 * This function handles nested objects and arrays, ensuring that all keys are transformed to camelCase.
 *
 * @param data - The JavaScript object to be transformed.
 * @returns A new object with keys in camelCase.
 *
 * @remarks
 * - This function provides a way to convert object keys to camelCase, which is a common convention
 *   for JavaScript object properties.
 * - It recursively processes nested objects and arrays to ensure that all keys within the structure
 *   are transformed correctly.
 *
 * Usage:
 * ```typescript
 * const data = {
 *   first_name: 'John',
 *   last_name: 'Doe',
 *   contact_details: {
 *     email_id: 'johndoe@example.com',
 *     phone_number: '123-456-7890'
 *   },
 *   hobbies: ['reading', 'swimming']
 * };
 *
 * const camelCaseData = toCamelCaseKeys(data);
 * console.log(camelCaseData);
 * ```
 *
 * Output:
 * ```json
 * {
 *   "firstName": "John",
 *   "lastName": "Doe",
 *   "contactDetails": {
 *     "emailId": "johndoe@example.com",
 *     "phoneNumber": "123-456-7890"
 *   },
 *   "hobbies": ["reading", "swimming"]
 * }
 * ```
 *
 * @see toCamelCase
 */
export function toCamelCaseKeys(data: any): any {
  if (!isObject(data)) {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map((item: string) => toCamelCaseKeys(item));
  }

  const newData: Record<string, any> = {};
  for (const property of Object.keys(data)) {
    const transformedProperty: string = toCamelCase(property);
    newData[transformedProperty] = toCamelCaseKeys(data[property]);
  }

  return newData;
}



/**
 * Converts object keys to snake_case and returns a new object with key-value pairs.
 * This function is useful for transforming JavaScript objects into request body parameters
 * following the snake_case convention, commonly used in API requests.
 *
 * @param data - The JavaScript object to be transformed.
 * @returns A new object with keys in snake_case and string values.
 *
 * @remarks
 * - This function provides a way to convert object keys to snake_case, which is a common
 *   convention for request parameters in some APIs.
 * - It iterates through the properties of the input object and converts the keys from camelCase
 *   or PascalCase to snake_case.
 *
 * Usage:
 * ```typescript
 * const data = {
 *   firstName: 'John',
 *   lastName: 'Doe',
 *   emailId: 'johndoe@example.com'
 * };
 *
 * const requestBody = toRequestBody(data);
 * console.log(requestBody);
 * ```
 *
 * Output:
 * ```json
 * {
 *   "first_name": "John",
 *   "last_name": "Doe",
 *   "email_id": "johndoe@example.com"
 * }
 * ```
 *
 * @see toCamelCaseKeys
 */
export function toRequestBody(data: any): Record<string, string> {
  const newData: Record<string, string> = {};

  if (isObject(data)) {
    for (const property of Object.keys(data)) {
      const transformedProperty: string = property.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
      newData[transformedProperty] = data[property];
    }
  }
  return newData;
}

export const toSnakeCase = toRequestBody;



/**
 * Converts a JavaScript object into a JSON-formatted string with keys converted to snake_case.
 * This function handles nested objects and arrays, ensuring that all keys are transformed to snake_case.
 *
 * @param data - The JavaScript object to be converted.
 * @returns A JSON-formatted string with keys in snake_case.
 *
 * @remarks
 * - This function provides a way to convert object keys to snake_case, which is a common convention
 *   for API request bodies and payloads.
 * - It recursively processes nested objects and arrays to ensure that all keys within the structure
 *   are transformed correctly.
 *
 * Usage:
 * ```typescript
 * const data = {
 *   firstName: 'John',
 *   lastName: 'Doe',
 *   contactDetails: {
 *     emailId: 'johndoe@example.com',
 *     phoneNumber: '123-456-7890'
 *   },
 *   hobbies: ['reading', 'swimming']
 * };
 *
 * const requestBody = toBody(data);
 * console.log(requestBody);
 * ```
 *
 * Output:
 * ```json
 * {
 *   "first_name": "John",
 *   "last_name": "Doe",
 *   "contact_details": {
 *     "email_id": "johndoe@example.com",
 *     "phone_number": "123-456-7890"
 *   },
 *   "hobbies": ["reading", "swimming"]
 * }
 * ```
 *
 * @see JSON.stringify
 */
export function toBody(data: any): string {
  function convertKeysToSnakeCase(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map((item: any) => convertKeysToSnakeCase(item));
    } else if (typeof obj === 'object' && obj !== null) {
      const newObj: any = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const transformedKey: string = key.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
          newObj[transformedKey] = convertKeysToSnakeCase(obj[key]);
        }
      }
      return newObj;
    } else {
      return obj;
    }
  }

  const convertedData = convertKeysToSnakeCase(data);
  return toJson(convertedData);
}


/**
 * Converts a JavaScript object to a JSON string representation.
 * This function is used to serialize JavaScript objects into JSON format,
 * making it suitable for sending data in API requests or for data storage.
 *
 * @param data - The JavaScript object to be converted to JSON.
 * @returns A string representing the JSON serialization of the input object.
 *
 * @remarks
 * - This function takes a JavaScript object as input and returns its JSON string representation.
 * - It uses the `JSON.stringify` method internally to perform the serialization.
 *
 * Usage:
 * ```typescript
 * const data = {
 *   name: 'John',
 *   age: 30,
 *   city: 'New York'
 * };
 *
 * const jsonString = toJson(data);
 * console.log(jsonString);
 * ```
 *
 * Output:
 * ```json
 * {
 *   "name": "John",
 *   "age": 30,
 *   "city": "New York"
 * }
 * ```
 *
 * @see fromJson
 */
export function toJson(data: any): string {
  return JSON.stringify(data);
}


/**
 * Checks if an object has at least one property.
 *
 * This function takes an object as input and determines whether it contains at least one property.
 *
 * @param obj The object to be checked for properties.
 *
 * @returns `true` if the object has at least one property, `false` otherwise.
 *
 * @example
 * // Example usage:
 * const emptyObject = {};
 * const hasProperty = hasAtLeastAProperty(emptyObject);
 * // Result: false (the emptyObject has no properties)
 *
 * const nonEmptyObject = { name: 'John', age: 30 };
 * const hasProperty = hasAtLeastAProperty(nonEmptyObject);
 * // Result: true (the nonEmptyObject has properties)
 *
 * const nullObject = null;
 * const hasProperty = hasAtLeastAProperty(nullObject);
 * // Result: false (null input is treated as having no properties)
 */
export function hasAtLeastAProperty(obj: any): boolean {
  return isObject(obj) && Object.keys(obj).length > 0;
}
