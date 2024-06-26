export type StatusText = {
  error: string;
  timeout: string;
  filesize: {
    valid: string;
    invalid(size: number, label?: string): string;
  };
  filetype: {
    invalid(allowedTypes: string[]): string;
    valid: string;
  };
  fileUpload: {
    empty: string;
    success: string;
    allowableType: string;
    choose: string;
    required: string;
    optional: string;
    error: string;
    abort: string;
    timeout: string;
    inProgress(percentage: number): string;
  };
  deleteObject: {
    inProgress: string;
    success: string;
    error: string;
  };
  fileTypeAllowedToUploadText: string;
  fileChosenText(fileName: string): string;
}



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
