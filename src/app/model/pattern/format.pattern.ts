/**
 * @constant DATE
 * @description
 *   Regular expression for validating date strings in the format 'yyyy-MM-dd'.
 */
export const DATE: RegExp = /^\d{4}-\d{2}-\d{2}$/;

/**
 * @constant PHONE_NUMBER
 * @description
 *   Regular expression for validating phone numbers in the format '+<country code>-<area code>-<local number>'.
 */
export const PHONE_NUMBER: RegExp = /^\+\d{1,3}-?\d{3}-?\d{3}-?\d{4}$/;

/**
 * @constant TWO_DATES
 * @description
 *   Regular expression for validating two date strings separated by a colon, e.g., 'yyyy-MM-dd:yyyy-MM-dd'.
 */
export const TWO_DATES: RegExp = /^\d{4}-\d{2}-\d{2}:\d{4}-\d{2}-\d{2}$/;

/**
 * @constant PASSWORD_PATTERNS
 * @description
 *   Object containing named regular expressions for password strength criteria.
 *   - lowerCase: At least one lowercase letter.
 *   - upperCase: At least one uppercase letter.
 *   - digit: At least one digit.
 *   - specialChar: At least one special character from !@#$%^&*()_+{}[]:;<>,.?~\/-
 */
export const PASSWORD_PATTERNS: { [key: string]: RegExp } = {
  lowerCase: /[a-z]/,
  upperCase: /[A-Z]/,
  digit: /\d/,
  specialChar: /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/
};

/**
 * @constant VERIFICATION_CODE
 * @description
 *   Regular expression for validating numeric verification codes.
 */
export const VERIFICATION_CODE: RegExp = /^\d+$/;

/**
 * @constant TIME_FORMAT
 * @description
 *   String format for representing time in 'HH:MM' format.
 */
export const TIME_FORMAT: string = "HH:MM";

/**
 * @constant DATE_FORMAT
 * @description
 *   String format for representing dates in 'yyyy-MM-dd' format.
 */
export const DATE_FORMAT: string = "yyyy-MM-dd";
