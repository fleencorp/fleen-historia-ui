import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl} from "@angular/forms";
import {FileUploadDownloadService} from "@app/shared/service/impl";
import {isFalsy, isTruthy, nonNull} from "@app/shared/helper";
import {catchError, Observable, Subscription, switchMap, tap, throwError} from "rxjs";
import {HttpEvent, HttpEventType, HttpResponse} from "@angular/common/http";
import {statusText} from "@app/messages/";
import {BaseFormComponent} from "@app/base/component";
import {Router} from "@angular/router";
import {ExchangeRequest,} from "@app/model/type";
import {ANY_EMPTY, DEFAULT_ERROR_MESSAGE, MISSING_CONFIG} from "@app/constant";
import {ErrorResponse} from "@app/model/response";
import {AwsSignedUrlResponse} from "@app/model/response/common";
import {DEFAULT_IMAGE_CONSTRAINT} from "@app/constant/file.const";
import {FileConstraints} from "@app/model/type/file.type";

/**
 * @module UploadFileComponent
 * @description This component provides functionality to upload, download, and delete files.
 * It extends the BaseFormComponent for form handling.
 *
 * @author Yusuf Alamu Musa
 * @version 1.0
 */
@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent extends BaseFormComponent implements OnInit {

  /**
   * @description Instance of FormBuilder used for creating form controls.
   */
  protected formBuilder!: FormBuilder;

  /**
   * @description Message displayed after upload operation.
   */
  public uploadMessage: string = '';

  /**
   * @description Subscription to handle canceling ongoing requests.
   */
  public cancelRequest$!: Subscription | null;

  /**
   * @description Flag indicating whether the upload operation has completed.
   */
  private uploadCompleted: boolean = false;

  /**
   * @input control - The form control for file upload.
   * @required true
   * @description The form control bound to the file upload component.
   */
  @Input({ alias: 'control', required: true }) public control!: FormControl;

  /**
   * @input control-label - The label for the form control.
   * @description The label to display alongside the file upload component.
   * @default 'This field'
   */
  @Input({ alias: 'control-label', required: true }) public controlLabel: string = 'This field';

  /**
   * @input file-key - The key associated with the file.
   * @required true
   * @description The key used to identify the uploaded file.
   */
  @Input({ alias: 'file-key', required: true }) public fileKey!: string;

  /**
   * @input file-id - The unique identifier for the file.
   * @required true
   * @description The unique identifier assigned to the uploaded file.
   */
  @Input({ alias: 'file-id', required: true }) public fileId!: string;

  /**
   * @input save-file-method - Method to save the file.
   * @description Method used to save the uploaded file.
   */
  @Input({ alias: 'save-file-method', required: false }) public saveFile$!: (...data: any[]) => Observable<any>;

  /**
   * @input download-file-method - Method to download the file.
   * @description Method used to download the uploaded file.
   */
  @Input({ alias: 'delete-file-method', required: true }) public deleteFile$!: (...data: any[]) => Observable<any>;

  /**
   * @input download-file-method - Method to download the file.
   * @description Method used to download the uploaded file.
   */
  @Input({ alias: 'download-file-method', required: false }) public downloadFile$!: (...data: any[]) => Observable<AwsSignedUrlResponse>;

  /**
   * @input signed-url-method - Method to generate signed URL.
   * @required true
   * @description Method used to generate a signed URL for file upload/download.
   */
  @Input({ alias: 'signed-url-method', required: true }) public generateSignedUrl$!: (...data: any[]) => Observable<any>;

  /**
   * @input file-url - The URL or name of the uploaded file.
   * @description The URL or name of the uploaded file to be displayed/downloaded.
   */
  @Input('file-url') public fileNameOrUrl: string | null = '';

  /**
   * @input can-download-or-view - Flag indicating whether the file can be downloaded or viewed.
   * @description Indicates whether the uploaded file can be downloaded or viewed.
   * @default false
   */
  @Input('can-download-or-view') public canDownloadOrView: boolean = false;

  /**
   * @input file-constraints - Constraints for the uploaded file.
   * @description Constraints applied to the uploaded file.
   * @default DEFAULT_IMAGE_CONSTRAINT
   */
  @Input('file-constraints') public fileConstraints: FileConstraints = DEFAULT_IMAGE_CONSTRAINT;

  /**
   * @output upload-details - Event emitter for upload details.
   * @description Event emitter triggered with upload details after successful upload.
   */
  @Output('upload-details') public uploadDetails: EventEmitter<any> = new EventEmitter<any>();

  /**
   * @output delete-details - Event emitter for delete details.
   * @description Event emitter triggered with delete details after successful deletion.
   */
  @Output('delete-details') public deleteDetails: EventEmitter<any> = new EventEmitter<any>();

  /**
   * @description Reference to the file input element.
   */
  @ViewChild('elem', { static: false }) inputElement!: ElementRef;

  /**
   * @constructor
   * @param fileService - Instance of FileUploadDownloadService for file operations.
   * @description Constructor for UploadFileComponent.
   * Injects FileUploadDownloadService for file operations.
   */
  public constructor(protected fileService: FileUploadDownloadService) {
    super();
  }

  /**
   * @method getRouter
   * @description Overrides the base class method to return the router instance.
   * @returns The router instance.
   * @override
   */
  protected override getRouter(): Router {
    return ANY_EMPTY;
  }

  /**
   * @method ngOnInit
   * @description Lifecycle hook called after Angular initializes the component.
   * Checks configuration and prepares the form if configuration is valid.
   */
  public ngOnInit(): void {
    if (this.checkConfig()) {
      this.formReady();
    }
  }

  /**
   * Uploads a file using the provided input element, control, and constraints.
   *
   * @param input - The HTMLInputElement from which the file will be obtained.
   * @param control - The AbstractControl used for file validation.
   * @param constraints - The constraints to be applied during file validation.
   * @returns void
   */
  public upload(input: HTMLInputElement, control: AbstractControl, constraints: FileConstraints): void {
    // Get the files from the input element
    let files: FileList | null = input?.files;

    // Check if files exist, input is not null, control is not null, and constraints are not null
    if (nonNull(files) && this.fileService.isFilesPresent(files) && nonNull(control) && nonNull(constraints)) {
      // Get the first file from the FileList
      const file: File | any = this.fileService.getFirst(files);

      // Validate the file against the provided control and constraints
      if (this.fileService.validationPassed(file, control, constraints)) {
        // Generate a signed URL and upload the file
        this.generateSignedUrlAndUploadFile(file.name, files as any, input);
      }
    }
  }

  /**
   * Generates a signed URL for uploading a file to a remote server and initiates the upload process.
   * This method prepares the necessary request for exchanging file information, generates a signed URL
   * for secure file upload, and handles the upload operation including progress tracking and error handling.
   *
   * @param fileName - The name of the file to be uploaded.
   * @param files - A FileList object containing the file(s) to be uploaded.
   * @param input - The HTMLInputElement from which the file(s) were obtained.
   * @returns void
   */
  private generateSignedUrlAndUploadFile(fileName: string, files: FileList, input: HTMLInputElement): void {
    // Prepare the request for exchanging file information
    const req: ExchangeRequest = this.fileService.toFileUploadRequest(files, this.fileNameOrUrl as string);

    // Generate a signed URL for uploading the file
    this.cancelRequest$ = this.generateSignedUrl$(fileName)
      .pipe(
        switchMap((result: AwsSignedUrlResponse): Observable<any> => {
          // Update the file name or URL with the signed URL
          this.fileNameOrUrl = result.signedUrl;
          req.uri = this.fileNameOrUrl;
          // Upload the file using the signed URL
          return this.fileService.uploadFile(req, files[0].type);
        }),
        tap((event: any): void => {
          // Update the upload progress
          this.updateDownloadOrUploadProgress(event);
        }),
        catchError((error: any): Observable<any> => throwError(error)))
      .subscribe({
        error: (error): void => { this.handleFailedUpload(input, error); },
        complete: (): void => { this.handleCompletedUploadOperation(); }
      });
  }

  /**
   * Handles the case when an upload operation fails. This method updates the error message if it's not provided,
   * then invokes the error handling mechanism. Additionally, it clears any files selected in the input element.
   *
   * @param input - The HTMLInputElement containing the files that failed to upload.
   * @param error - An ErrorResponse object containing details about the upload failure.
   * @returns void
   */
  private handleFailedUpload(input: HTMLInputElement, error: ErrorResponse): void {
    // Handle upload errors
    error.message = error.message || DEFAULT_ERROR_MESSAGE;
    this.handleError(error);
    // Clear the input files
    this.fileService.clearInputFiles(input);
  }

  /**
   * Handles the completion of an upload operation. This method saves the uploaded file and emits
   * details about the upload, such as the file's key or URL, via an event emitter.
   *
   * @returns void
   */
  private handleCompletedUploadOperation(): void {
    // Save the uploaded file and emit upload details
    this.saveFile(this.fileNameOrUrl);
    this.uploadDetails.emit({
      [(this.fileKey)]: this.fileNameOrUrl
    });
    this.resetCancelRequest();
  }

  /**
   * Cancels an ongoing upload operation. This method unsubscribes from the cancel request observable,
   * if it exists, to halt the upload process. It then clears any files selected in the input element
   * and updates the upload message to indicate that the upload has been aborted.
   *
   * @param element - The HTMLInputElement containing the files being uploaded.
   * @returns void
   */
  public cancelUpload(element: HTMLInputElement): void {
    // If there is an ongoing cancel request, unsubscribe to halt the upload process
    if (isTruthy(this.cancelRequest$) && this.cancelRequest$ !== null) {
      this.cancelRequest$.unsubscribe();
    }
    // Clear the input files
    this.fileService.clearInputFiles(element);
    // Update the upload message to indicate that the upload has been aborted
    this.uploadMessage = statusText.fileUpload.abort;
  }


  /**
   * Saves a file using the provided file name or URL. If a file name or URL is provided and a save file
   * observable exists, this method initiates the file saving process. Upon completion, it updates the
   * upload message to indicate success. In case of errors, it updates the upload message accordingly
   * and clears any input files associated with the operation.
   *
   * @param fileNameOrUrl - The name or URL of the file to be saved.
   * @returns void
   */
  private saveFile(fileNameOrUrl: string | null): void {
    // Check if the file name or URL is not null and a save file observable exists
    if (nonNull(fileNameOrUrl) && isTruthy(this.saveFile$)) {
      // Initiate the file saving process
      this.saveFile$(fileNameOrUrl).subscribe({
        complete: (): void => {
          // Update upload message upon successful file saving
          this.uploadMessage = statusText.fileUpload.success;
        },
        error: (): void => {
          // Update upload message in case of an error during file saving
          this.uploadMessage = statusText.fileUpload.error;
          // Clear any input files associated with the operation
          this.fileService.clearInputFiles(this.inputElement?.nativeElement);
        },
      });
    }
  }


  /**
   * Deletes a file identified by its name or URL. If both the file name or URL and a delete file
   * observable exist, this method initiates the file deletion process. Upon completion, it updates
   * the upload message to indicate success, clears the file name or URL, emits deletion details,
   * and clears any associated input files.
   *
   * @param elem - The HTMLInputElement associated with the file being deleted.
   * @returns void
   */
  public deleteFile(elem: HTMLInputElement): void {
    // Check if the file name or URL and a delete file observable exist
    if (isTruthy(this.fileNameOrUrl) && isTruthy(this.deleteFile$)) {
      // Update upload message to indicate deletion in progress
      this.uploadMessage = statusText.deleteObject.inProgress;

      // Initiate the file deletion process
      this.deleteFile$(this.fileNameOrUrl)
        .subscribe({
          error: (error: ErrorResponse): void => {
            // Handle deletion errors and update error message
            error.message = statusText.deleteObject.error;
            this.handleError(error);
          },
          complete: (): void => {
            // Reset the file name or URL and update upload message upon successful deletion
            this.fileNameOrUrl = null;
            this.uploadMessage = statusText.deleteObject.success;
            // Emit deletion details
            this.deleteDetails.emit({
              [this.fileKey]: this.fileNameOrUrl
            });
            // Clear any associated input files
            this.fileService.clearInputFiles(elem);
            this.resetCancelRequest();
          }
        });
    }
  }


  /**
   * Initiates the download or viewing of a file identified by its path, URL, link, or key.
   * If the path or URL and the file name are provided, along with a download file observable
   * and permission to download or view, this method initiates the file download process.
   * Upon completion, it handles any errors that occur during the download operation.
   *
   * @param pathOrUrlOrLinkOrKey - The path, URL, link, or key of the file to be downloaded or viewed.
   * @param fileName - The name of the file to be downloaded.
   * @returns void
   */
  public downloadOrView(pathOrUrlOrLinkOrKey: string, fileName: string): void {
    // Check if the path or URL or link or key, file name, download file observable, and permission to download or view exist
    if (isTruthy(pathOrUrlOrLinkOrKey) && isTruthy(fileName) && isTruthy(this.downloadFile$) && isTruthy(this.canDownloadOrView)) {
      // Initiate the file download process
      this.downloadFile$(pathOrUrlOrLinkOrKey)
        .pipe(
          switchMap((result: AwsSignedUrlResponse) => {
            // Download the file using the signed URL
            return this.fileService.downloadFile(result.signedUrl, fileName);
          })
        ).subscribe({
        error: (error: ErrorResponse | any): void => {
          // Handle download errors
          this.handleError(error);
        }
      });
    }
  }

  /**
   * Checks the configuration of the file service to ensure that all necessary components are present.
   * If any required component is missing, an error is thrown. Otherwise, it returns true.
   *
   * @returns boolean - Returns true if the configuration is valid; otherwise, throws an error.
   */
  private checkConfig(): boolean {
    // Check if generateSignedUrl$ and deleteFile$ are both missing
    if (isFalsy(this.generateSignedUrl$) && isFalsy(this.deleteFile$)) {
      throw new Error(MISSING_CONFIG);
    }
    // Check if generateSignedUrl$ and deleteFile$ are both missing, and downloadFile$ is missing, but canDownloadOrView is truthy
    else if (isFalsy(this.generateSignedUrl$) && isFalsy(this.deleteFile$)
      && isFalsy(this.downloadFile$) && isTruthy(this.canDownloadOrView)) {
      throw new Error(MISSING_CONFIG);
    }
    // Check if downloadFile$ is missing, but canDownloadOrView is truthy
    else if (isFalsy(this.downloadFile$) && isTruthy(this.canDownloadOrView)) {
      throw new Error(MISSING_CONFIG);
    }
    // All configurations are present
    return true;
  }


  /**
   * Updates the upload or download progress based on the provided HTTP event.
   * If the event represents upload progress, it calculates the percentage completed
   * and updates the upload message accordingly. If the event represents a completed
   * upload or download (HttpResponse), it updates the upload message to indicate success.
   *
   * @param event - The HTTP event representing the progress or completion of an upload or download.
   * @returns void
   */
  private updateDownloadOrUploadProgress(event: HttpEvent<any>): void {
    if (event.type === HttpEventType.UploadProgress) {
      // Calculate the percentage of upload progress and update the upload message
      const percentage: number = Math.round((event.loaded / event.total!) * 100);
      this.uploadMessage = statusText.fileUpload.inProgress(percentage);
    } else if (event instanceof HttpResponse) {
      // Update the upload message to indicate upload or download success
      this.uploadMessage = statusText.fileUpload.success;
    }
  }

  /**
   * Determines whether the file is ready for download or viewing based on the current state.
   * This method sets the upload completed flag to true if a file name or URL exists.
   * It then checks if download or view permissions are granted and if the upload is completed.
   *
   * @returns boolean - Returns true if the file is ready for download or viewing; otherwise, false.
   */
  get readyForDownload(): boolean {
    // Set the upload completed flag to true if a file name or URL exists
    if (this.fileNameOrUrl) {
      this.uploadCompleted = true;
    }
    // Check if download or view permissions are granted and upload is completed
    return this.canDownloadOrView && this.uploadCompleted;
  }

  protected resetCancelRequest(): void {
    this.cancelRequest$ = null;
  }

  public openFileDialog(): void {
    this.inputElement.nativeElement.click();
  }

}
