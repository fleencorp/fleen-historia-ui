import {FileConstraints} from "@app/model/type";
import {DEFAULT_IMAGE_TYPES, DEFAULT_VIDEO_TYPES} from "@app/constant/common.const";

export const DEFAULT_IMAGE_CONSTRAINT: FileConstraints = {
  maxFileSize: 1,
  allowableTypes: DEFAULT_IMAGE_TYPES,
  fileSizeUnit: 'MB'
}

export const DEFAULT_VIDEO_CONSTRAINT: FileConstraints = {
  maxFileSize: 1,
  allowableTypes: DEFAULT_VIDEO_TYPES,
  fileSizeUnit: 'MB'
}
