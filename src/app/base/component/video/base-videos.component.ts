import {BaseEntriesComponent} from "@app/base/component";
import {FleenVideoView} from "@app/model/view/video";
import {AnyObject, DeleteIdsPayload, SearchFilter, SearchPayload} from "@app/model/type";
import {SEARCH_FILTER_VIEW_FLEEN_VIDEOS} from "@app/constant/search-filter.const";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {Observable} from "rxjs";
import {SearchResultView} from "@app/model/view";
import {ANY_EMPTY, VIDEO_STATUS_SEARCH_KEY} from "@app/constant";
import {isFalsy, isTruthy, nonNull, removeProperty} from "@app/shared/helper";
import {VideoStatus} from "@app/model/enum";
import {PublishVideoResponse, RequestForReviewResponse} from "@app/model/response/video";
import {ErrorResponse} from "@app/model/response";
import {BaseVideoService} from "@app/base/service";
import {ContributorService} from "@app/feature/contributor/service";

export abstract class BaseVideosComponent extends BaseEntriesComponent<FleenVideoView> {

  public override entries: FleenVideoView[] = [];
  public override searchFilter: SearchFilter[] = SEARCH_FILTER_VIEW_FLEEN_VIDEOS;
  protected override defaultEntryIdKey: string = 'fleenVideoId';

  protected constructor(
      protected videosService: BaseVideoService | ContributorService | any,
      router: Router,
      route: ActivatedRoute,
      location: Location) {
    super(router, route, location);
  }

  public override findEntries(params: AnyObject): Observable<SearchResultView<FleenVideoView>> {
    return this.videosService.findVideos(params);
  }

  public override deleteEntries(payload: DeleteIdsPayload): Observable<any> {
    return ANY_EMPTY;
  }

  /**
   * Generates a unique identifier for each FleenVideoView item in a list.
   * Uses the 'fleenVideoId' property of the FleenVideoView object as the identifier.
   *
   * @param index - The index of the item in the list.
   * @param item - The FleenVideoView item in the list.
   * @returns The unique identifier for the FleenVideoView item.
   */
  public override trackByFn(index: number, item: FleenVideoView): any {
    return item.fleenVideoId;
  }

  /**
   * Determines whether a FleenVideoView can be requested for review based on its status.
   *
   * @param video - The FleenVideoView object to check.
   * @returns A boolean indicating whether the video can be requested for review.
   */
  public canRequestForReview(video: FleenVideoView): boolean {
    if (isTruthy(video)) {
      return video.videoStatus === VideoStatus.DRAFT
        || video.videoStatus === VideoStatus.DISAPPROVED;
    }
    return false;
  }

  /**
   * Determines whether a FleenVideoView can be published based on its status and publishing status.
   *
   * @param video - The FleenVideoView object to check.
   * @returns A boolean indicating whether the video can be published.
   */
  public canPublish(video: FleenVideoView): boolean {
    if (isTruthy(video)) {
      return video.videoStatus === VideoStatus.APPROVED
        && !video.isPublished;
    }
    return false;
  }


  /**
   * Enables the submitting for review state for the provided video.
   * Sets the 'isSubmittingForReview' flag to true if the video object is not null.
   *
   * @param video - The FleenVideoView object for which submitting for review is enabled.
   */
  protected enableIsSubmittingForReview(video: FleenVideoView): void {
    if (nonNull(video)) {
      video.isSubmittingForReview = true;
    }
  }

  /**
   * Disables the submitting for review state for the provided video.
   * Sets the 'isSubmittingForReview' flag to false if the video object is not null.
   *
   * @param video - The FleenVideoView object for which submitting for review is disabled.
   */
  protected disableIsSubmittingForReview(video: FleenVideoView): void {
    if (nonNull(video)) {
      video.isSubmittingForReview = false;
    }
  }

  /**
   * Enables the submitting for review successful state for the provided video.
   * Sets the 'isSubmittingForReviewSuccessful' flag to true if the video object is not null.
   *
   * @param video - The FleenVideoView object for which submitting for review successful is enabled.
   */
  protected enableSubmittingForReviewSuccessful(video: FleenVideoView): void {
    if (nonNull(video)) {
      video.isSubmittingForReviewSuccessful = true;
    }
  }

  /**
   * Enables the publishing state for the provided video.
   * Sets the 'isPublishing' flag to true if the video object is not null.
   *
   * @param video - The FleenVideoView object for which publishing is enabled.
   */
  protected enableIsPublishing(video: FleenVideoView): void {
    if (nonNull(video)) {
      video.isPublishing = true;
    }
  }

  /**
   * Disables the publishing state for the provided video.
   * Sets the 'isPublishing' flag to false if the video object is not null.
   *
   * @param video - The FleenVideoView object for which publishing is disabled.
   */
  protected disableIsPublishing(video: FleenVideoView): void {
    if (nonNull(video)) {
      video.isPublishing = false;
    }
  }

  /**
   * Enables the publishing successful state for the provided video.
   * Sets the 'isPublishingSuccessful' flag to true if the video object is not null.
   *
   * @param video - The FleenVideoView object for which publishing successful is enabled.
   */
  protected enableIsPublishingSuccessful(video: FleenVideoView): void {
    if (nonNull(video)) {
      video.isPublishingSuccessful = true;
    }
  }


  /**
   * Initiates a request for video review by calling the videos service.
   * Handles success and error responses, displays status messages, and invokes a callback after a delay.
   *
   * @param video - The FleenVideoView object for which review is requested.
   */
  public requestForReview(video: FleenVideoView): void {
    // Extract the video ID from the provided video object
    const { fleenVideoId: videoId } = video;

    // Check if the video is not already in the process of submitting for review
    if (isFalsy(video.isSubmittingForReview)) {
      // Clear all previous messages
      this.clearAllMessages();

      // Disable general submitting state
      this.disableSubmitting();

      // Enable submitting for review state for the provided video
      this.enableIsSubmittingForReview(video);

      // Clear any previous messages associated with the video entry
      this.clearVideoEntryMessages(videoId);

      // Call the videos service to request for review of the video
      this.videosService.requestForReview(videoId)
        .subscribe({
          next: (result: RequestForReviewResponse): void => {
            // Set status message indicating successful request for review
            this.setStatusMessage(result.message);

            // Disable submitting for review state for the provided video
            this.disableIsSubmittingForReview(video);

            // Enable successful submitting for review state for the video
            this.enableSubmittingForReviewSuccessful(video);

            // Set status message for the video entry
            this.setVideoEntryStatusMessage(videoId, result.message);

            // Invoke a callback after a delay to handle successful submission for review
            this.invokeCallbackWithDelay((): void => this.handleSuccessfulSubmissionForReview(result));

            // Re-enable general submitting state
            this.enableSubmitting();
          },
          error: (error: ErrorResponse): void => {
            // Handle error response
            this.handleError(error);

            // Set error message for the video entry
            this.setVideoEntryErrorMessage(videoId, error);

            // Disable submitting for review state for the provided video
            this.disableIsSubmittingForReview(video);

            // Re-enable general submitting state
            this.enableSubmitting();
          }
      });
    }
  }


  /**
   * Handles a successful submission response for requesting a video review.
   * Updates the corresponding FleenVideoView entry with the updated video data.
   *
   * @param result - The response containing the updated FleenVideoView object.
   */
  protected handleSuccessfulSubmissionForReview(result: RequestForReviewResponse): void {
    // Replace the existing FleenVideoView entry with the updated one
    this.replaceOldWithUpdateVideo(result.fleenVideo.fleenVideoId, result.fleenVideo);
  }

  /**
   * Handles a successful submission response for publishing a video.
   * Updates the corresponding FleenVideoView entry with the updated video data.
   *
   * @param result - The response containing the updated FleenVideoView object.
   */
  protected handleSuccessfulSubmissionForPublishing(result: PublishVideoResponse): void {
    // Replace the existing FleenVideoView entry with the updated one
    this.replaceOldWithUpdateVideo(result.fleenVideo.fleenVideoId, result.fleenVideo);
  }

  /**
   * Sets the error message for a specific FleenVideoView entry identified by videoId.
   *
   * @param videoId - The ID of the video entry.
   * @param error - The error response containing the error message.
   */
  protected setVideoEntryErrorMessage(videoId: number | string, error: ErrorResponse): void {
    // Retrieve the FleenVideoView entry corresponding to the provided videoId
    const fleenVideo: FleenVideoView | null = this.getFleenVideoViewById(videoId);
    if (fleenVideo != null) {
      // Set the error message for the FleenVideoView entry
      fleenVideo.errorMessage = error.message;
    }
  }

  /**
   * Sets the status message for a specific FleenVideoView entry identified by videoId.
   *
   * @param videoId - The ID of the video entry.
   * @param message - The status message to set.
   */
  protected setVideoEntryStatusMessage(videoId: number | string, message: string): void {
    // Retrieve the FleenVideoView entry corresponding to the provided videoId
    const fleenVideo: FleenVideoView | null = this.getFleenVideoViewById(videoId);
    if (fleenVideo != null) {
      // Set the status message for the FleenVideoView entry
      fleenVideo.statusMessage = message;
    }
  }

  /**
   * Clears the status and error messages for a specific FleenVideoView entry identified by videoId.
   *
   * @param videoId - The ID of the video entry.
   */
  protected clearVideoEntryMessages(videoId: number | string): void {
    // Retrieve the FleenVideoView entry corresponding to the provided videoId
    const fleenVideo: FleenVideoView | null = this.getFleenVideoViewById(videoId);
    if (fleenVideo != null) {
      // Clear the status and error messages for the FleenVideoView entry
      fleenVideo.statusMessage = '';
      fleenVideo.errorMessage = '';
    }
  }


  /**
   * Publishes a FleenVideoView by calling the videos service to initiate the publishing process.
   * Displays status messages, handles success and error cases, and invokes a callback after a delay.
   *
   * @param video - The FleenVideoView object to be published.
   */
  public publishVideo(video: FleenVideoView): void {
    // Extract the video ID from the provided video object
    const { fleenVideoId: videoId } = video;

    // Check if the video is not already in the process of publishing
    if (isFalsy(video.isPublishing)) {
      // Clear all previous messages
      this.clearAllMessages();

      // Enable publishing state for the provided video
      this.enableIsPublishing(video);

      // Clear any previous messages associated with the video entry
      this.clearVideoEntryMessages(videoId);

      // Call the videos service to publish the video
      this.videosService.publishVideo(videoId)
        .subscribe({
          next: (result: PublishVideoResponse): void => {
            // Set status message indicating successful publishing
            this.setStatusMessage(result.message);

            // Disable publishing state for the provided video
            this.disableIsPublishing(video);

            // Enable successful publishing state for the video
            this.enableIsPublishingSuccessful(video);

            // Set status message for the video entry
            this.setVideoEntryStatusMessage(videoId, result.message);

            // Invoke a callback after a delay to handle successful publishing
            this.invokeCallbackWithDelay((): void => this.handleSuccessfulSubmissionForPublishing(result));
          },
          error: (error: ErrorResponse): void => {
            // Handle error response
            this.handleError(error);

            // Set error message for the video entry
            this.setVideoEntryErrorMessage(videoId, error);

            // Disable publishing state for the provided video
            this.disableIsPublishing(video);
          }
        });
    }
  }


  /**
   * Replaces an existing FleenVideoView entry with an updated one based on its ID.
   *
   * @param videoId - The ID of the video to be replaced.
   * @param newVideo - The updated FleenVideoView object to replace the old one.
   */
  private replaceOldWithUpdateVideo(videoId: number | string, newVideo: FleenVideoView): void {
    // Find the position or index of the entry with the specified videoId
    const videoPositionOrIndex: number = this.entries.findIndex((entry: FleenVideoView): boolean => entry.fleenVideoId === videoId);

    // Check if an entry with the specified videoId exists
    if (videoPositionOrIndex !== -1) {
      // If found, update the entry with the new video
      this.entries[videoPositionOrIndex] = newVideo;
    }

    // Ensure immutability by creating a new array with the updated entries
    this.entries = [ ...this.entries ];
  }

  /**
   * Overrides the search method to include video status search parameter if specified.
   *
   * @param payload - The payload containing search parameters.
   * @param withStatus - A boolean indicating whether to include video status search parameter (default: true).
   * @returns A Promise that resolves when the search operation completes.
   */
  public override async search(payload: SearchPayload, withStatus: boolean = true): Promise<void> {
    // Include video status search parameter if specified
    if (withStatus) {
      payload[VIDEO_STATUS_SEARCH_KEY] = this.currentVideoSearchStatus;
    }

    // Call the base class search method asynchronously
    await super.search(payload);
  }


  protected setDefaultVideoSearchStatus(): void {
    // Clone the searchParams object to avoid modifying the original object
    this.searchParams = { ...(this.searchParams), ...(this.route.snapshot.queryParams) };

    // Retrieve the status query parameter from the route snapshot
    let statusQueryParam: string | null = this.searchParams[VIDEO_STATUS_SEARCH_KEY];

    // Check if the status query parameter is truthy and not empty
    if (isTruthy(statusQueryParam) && statusQueryParam?.trim()) {
      // Set the status query parameter in searchParams if it exists
      this.searchParams[VIDEO_STATUS_SEARCH_KEY] = statusQueryParam;
    } else {
      // Set the default status query parameter if it doesn't exist or is empty
      this.searchParams[VIDEO_STATUS_SEARCH_KEY] = this.defaultVideoStatusSearch;
    }
  }

  /**
   * Sets the video status search parameter in the search parameters object.
   * If the provided status matches the current status, the status search parameter is removed.
   *
   * @param status - The status to set for the video search.
   */
  public setVideoStatusSearchParam(status: VideoStatus): void {
    // Retrieve the current status from the search parameters
    const currentStatus: VideoStatus = this.searchParams[VIDEO_STATUS_SEARCH_KEY];

    // Check if the provided status matches the current status
    if (currentStatus === status) {
      // If they match, remove the status search parameter
      removeProperty(this.searchParams, VIDEO_STATUS_SEARCH_KEY);
    } else {
      // If they don't match, update the search parameters with the new status
      this.searchParams = { ...(this.searchParams), status };
    }
  }

  /**
   * Retrieves a FleenVideoView entry from the entries array by its ID.
   *
   * @param videoId - The ID of the video to retrieve.
   * @returns The FleenVideoView entry if found, otherwise null.
   */
  protected getFleenVideoViewById(videoId: number | string): FleenVideoView | null {
    // Find the entry in the entries array with the specified videoId
    const entry: FleenVideoView | undefined = this.entries.find((entry: FleenVideoView): boolean => entry.fleenVideoId === videoId);

    // Check if an entry was found
    if (isTruthy(entry)) {
      // If found, return the entry
      return entry as FleenVideoView;
    }

    // If not found, return null
    return null;
  }


  get defaultVideoStatusSearch(): VideoStatus {
    return VideoStatus.IN_REVIEW;
  }

  get currentVideoSearchStatus(): VideoStatus {
    return this.searchParams[VIDEO_STATUS_SEARCH_KEY];
  }

}
