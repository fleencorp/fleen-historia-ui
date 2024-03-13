import {FileConstraints} from "@app/model/type";
import {DEFAULT_IMAGE_TYPES, DEFAULT_VIDEO_TYPES} from "@app/constant/common.const";

/**
 * Default file constraints for images.
 */
export const DEFAULT_IMAGE_CONSTRAINT: FileConstraints = {
  /**
   * Maximum file size allowed for images, in megabytes.
   */
  maxFileSize: 1,

  /**
   * Array of allowable file types for images.
   */
  allowableTypes: DEFAULT_IMAGE_TYPES,

  /**
   * File size unit used for displaying constraints (e.g., 'MB' for megabytes).
   */
  fileSizeUnit: 'MB'
};


/**
 * Default file constraints for videos.
 */
export const DEFAULT_VIDEO_CONSTRAINT: FileConstraints = {
  /**
   * Maximum file size allowed for videos, in megabytes.
   */
  maxFileSize: 5000,

  /**
   * Array of allowable file types for videos.
   */
  allowableTypes: DEFAULT_VIDEO_TYPES,

  /**
   * File size unit used for displaying constraints (e.g., 'MB' for megabytes).
   */
  fileSizeUnit: 'MB'
};
