import {Injectable} from '@angular/core';
import {isFalsy, isObject, isTruthy, nonNull} from "@app/shared/helper";
import {Observable, Subscriber} from "rxjs";
import {HttpHeaders} from "@angular/common/http";
import {AbstractControl} from "@angular/forms";
import {LoggerService} from "@app/base/service";
import {ExchangeRequest, FileConstraints, RequestMethod} from "@app/model/type";
import {HttpClientService} from "@app/shared/service/impl";
import {CONTENT_TYPE_HEADER_KEY, DEFAULT_ERROR_MESSAGE, DEFAULT_UPLOAD_MAX_FILE_SIZE} from "@app/constant";

@Injectable()
export class FileUploadDownloadService {

  constructor(protected httpService: HttpClientService,
              protected logger: LoggerService) { }

  /**
   * Checks if a file is empty or not.
   *
   * @param file - The file to be checked.
   * @returns boolean - Returns true if the file is empty; otherwise, false.
   */
  public isFileEmpty(file: File): boolean {
    return isFalsy(file);
  }

  /**
   * Retrieves the first file from a FileList object.
   *
   * @param files - The FileList object from which the first file is to be retrieved.
   * @returns File | null - Returns the first file if it exists; otherwise, null.
   */
  public getFirst(files: FileList | null): File | null {
    if (this.isFilesPresent(files)) {
      return (files as any)[0];
    }
    return null;
  }

  /**
   * Checks if there are files present in a FileList object.
   *
   * @param files - The FileList object to be checked.
   * @returns boolean - Returns true if files are present; otherwise, false.
   */
  public isFilesPresent(files: FileList | null): boolean {
    return isTruthy(files) && isObject(files) && (files as any).length > 0;
  }

  /**
   * Checks if the size of a file is valid based on a maximum size limit.
   *
   * @param file - The file whose size is to be checked.
   * @param maxSize - The maximum allowed size for the file in MB (defaults to DEFAULT_UPLOAD_MAX_FILE_SIZE).
   * @returns boolean - Returns true if the file size is valid; otherwise, false.
   */
  public isFileSizeValid(file: File, maxSize: number = DEFAULT_UPLOAD_MAX_FILE_SIZE): boolean {
    let fileSize: number = Math.round((file.size / 1024 / 1024));
    return fileSize < maxSize;
  }

  /**
   * Checks if the type of a file is valid based on a list of allowed file types.
   *
   * @param allowedFileTypes - An array of allowed file types.
   * @param type - The type of the file to be checked.
   * @returns boolean - Returns true if the file type is valid; otherwise, false.
   */
  public isFileTypeValid(allowedFileTypes: string[], type: string): boolean {
    return allowedFileTypes.includes(type);
  }


  /**
   * Creates and builds a FormData object containing files from a FileList object.
   *
   * @param files - The FileList object containing files to be added to the FormData.
   * @returns FormData - The FormData object containing the files.
   */
  public createAndBuildFormData(files: FileList): FormData {
    const formData: FormData = new FormData();
    if (this.isFilesPresent(files)) {
      return this.buildFormData(formData, files);
    }
    return formData;
  }

  /**
   * Builds a FormData object by appending files from a FileList object.
   *
   * @param formData - The FormData object to which files will be appended.
   * @param files - The FileList object containing files to be added to the FormData.
   * @returns FormData - The FormData object with files appended.
   */
  public buildFormData(formData: FormData, files: FileList): FormData {
    Array.from(files).forEach((file: File, index: number) => formData.append(index.toString(), file));
    return formData;
  }

  /**
   * Clears the selected files from an HTMLInputElement.
   *
   * @param element - The HTMLInputElement from which files were selected.
   * @returns void
   */
  public clearInputFiles(element: HTMLInputElement): void {
    if (nonNull(element)) {
      (element as any).value = null;
    }
  }


  /**
   * Uploads a file using the provided exchange request and content type.
   *
   * @param req - The exchange request containing information for the file upload.
   * @param contentType - The content type of the file being uploaded.
   * @returns Observable<any> - An observable representing the file upload process.
   */
  public uploadFile(req: ExchangeRequest, contentType: string): Observable<any> {
    let { headers } = req;
    if (isFalsy(headers)) {
      // Set the content type header if not provided in the request
      headers = new HttpHeaders().set(CONTENT_TYPE_HEADER_KEY, contentType);
      req.headers = headers;
    }

    // Perform the file upload by exchanging the request
    return this.httpService.multipart(req);
  }

  /**
   * Validates a file against the provided control and validators.
   *
   * @param file - The file to be validated.
   * @param control - The AbstractControl used for file validation.
   * @param validators - The constraints to be applied during file validation.
   * @returns boolean - Returns true if the file passes validation; otherwise, false.
   */
  public validationPassed(file: File | null | any, control: AbstractControl, validators: FileConstraints): boolean {
    if (nonNull(file)) {
      const { maxFileSize, allowableTypes } = validators;
      if (this.isFileEmpty(file)) {
        // Set error if file is empty
        control.setErrors({ fileEmpty: true });
      }

      if (!(this.isFileSizeValid(file, maxFileSize))) {
        // Set error if file size exceeds the maximum allowed size
        control.setErrors({ fileSize: true });
      }

      if (!(this.isFileTypeValid(allowableTypes, file.type))) {
        // Set error if file type is not allowed
        control.setErrors({ fileType: true });
      }

      if (nonNull(control.errors)) {
        // Return false if any validation errors exist
        return false;
      }
    }
    // Return true if validation passes
    return true;
  }


  /**
   * Converts file upload information into an ExchangeRequest object suitable for file upload operations.
   *
   * @param files - The FileList object containing files to be uploaded.
   * @param uri - The URI where the files will be uploaded.
   * @param method - The HTTP method to be used for the upload operation (defaults to 'PUT').
   * @returns ExchangeRequest - An ExchangeRequest object containing file upload information.
   */
  public toFileUploadRequest(files: FileList, uri: string, method: RequestMethod = 'PUT'): ExchangeRequest {
    // Create and build a FormData object containing the files
    const body: FormData = this.createAndBuildFormData(files);

    // Construct and return the ExchangeRequest object
    return {
      uri,
      method,
      body,
      reportProgress: true,
      observe: 'events'
    };
  }

  /**
   * Initiates a file download by creating a temporary anchor element with the specified path and filename.
   *
   * @param path - The URL or path from which the file will be downloaded.
   * @param filename - The name to be given to the downloaded file.
   * @returns Observable<void> - An observable that triggers when the download is complete.
   */
  public downloadFile(path: string, filename: string): Observable<void> {
    return new Observable<void>((observer: Subscriber<void>): void => {
      // Create a temporary anchor element
      const anchor: HTMLAnchorElement = document.createElement('a');
      // Set the href attribute to the download path
      anchor.href = path;
      // Set the download attribute to the desired filename
      anchor.download = filename;
      // Open the download link in a new tab
      anchor.target = '_blank';

      // Hide the anchor element
      anchor.style.display = 'none';
      // Append the anchor to the document body
      document.body.appendChild(anchor);

      // Listen for the click event on the anchor element
      anchor.addEventListener('click', (): void => {
        // Remove the anchor element from the document body
        document.body.removeChild(anchor);
        // Emit next and complete signals to the observer to indicate completion
        observer.next();
        observer.complete();
      });

      // Simulate a click on the anchor element to trigger the download
      anchor.click();
    });
  }


  /**
   * Downloads a file from a URL by fetching its content as a Blob and creating a temporary anchor element.
   *
   * @param fileUrl - The URL of the file to be downloaded.
   * @param fileName - The name to be given to the downloaded file.
   * @returns void
   */
  public downloadFileBlob(fileUrl: string, fileName: string): void {
    fetch(fileUrl) // Fetch the file content from the provided URL
      .then((response: Response) => response.blob()) // Extract the response as a Blob
      .then((blob: Blob): void => {
        // Create a Blob URL for the downloaded Blob content
        const blobUrl: string = window.URL.createObjectURL(blob);

        // Create a temporary anchor element for initiating the download
        const a: HTMLAnchorElement = document.createElement('a');
        a.href = blobUrl; // Set the Blob URL as the anchor's href
        a.download = fileName; // Set the filename for the downloaded file

        // Simulate a click on the anchor to trigger the download
        a.click();

        // Revoke the Blob URL to free up memory
        window.URL.revokeObjectURL(blobUrl);
      })
      .catch(error => {
        // Log any errors that occur during the download process
        this.logger.error(DEFAULT_ERROR_MESSAGE, error);
      });
  }


}
