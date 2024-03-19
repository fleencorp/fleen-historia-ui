/**
 * Default maximum file size allowed for uploads, in megabytes.
 */
export const DEFAULT_UPLOAD_MAX_FILE_SIZE: number = 10; // 10 is in megabyte which is equal to 1024 * 1024 * 10;

/**
 * Default value representing an empty or undefined state.
 */
export const ANY_EMPTY: any = {};

/**
 * Minimum age required for account eligibility.
 */
export const MINIMUM_AGE_ELIGIBILITY_FOR_ACCOUNT: number = 18;

/**
 * Default verification type used in account registration.
 */
export const DEFAULT_VERIFICATION_TYPE: string = 'EMAIL';

/**
 * Default value for form controls.
 */
export const DEFAULT_FORM_CONTROL_VALUE: string = '';

/**
 * Default MIME types for images allowed in uploads.
 */
export const DEFAULT_IMAGE_TYPES: string[] = ['image/jpeg', 'image/png'];

/**
 * Default MIME types for videos allowed in uploads.
 */
export const DEFAULT_VIDEO_TYPES: string[] = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/x-flv', 'video/x-matroska', 'video/webm', 'video/x-ms-wmv', 'video/mpeg', 'video/3gpp', 'video/x-m4v'];

/**
 * Available verification types for account registration.
 */
export const VERIFICATION_TYPES: string[] = ['EMAIL', 'PHONE'];

/**
 * Available multi-factor authentication setup types.
 */
export const MFA_SETUP_TYPE: string[] = ['EMAIL', 'PHONE', 'AUTHENTICATOR', 'NONE'];

/**
 * Status code indicating an unauthorized request.
 */
export const UNAUTHORIZED_REQUEST_STATUS_CODE: number = 401;

/**
 * Key used to identify error type.
 */
export const ERROR_TYPE_KEY: string = 'ERROR_TYPE';

/**
 * A constant string representing a message indicating that an action has been copied.
 */
export const COPIED_MESSAGE: string = 'Copied';
