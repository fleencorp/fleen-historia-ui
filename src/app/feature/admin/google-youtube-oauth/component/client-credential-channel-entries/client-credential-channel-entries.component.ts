import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BaseEntriesComponent} from "@app/base/component";
import {AnyObject, ChannelState, DeleteIdsPayload, SearchFilter, SearchPayload} from "@app/model/type";
import {SEARCH_FILTER_VIEW_CHANNEL} from "@app/constant/search-filter.const";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {Observable} from "rxjs";
import {SearchResultView} from "@app/model/view";
import {ANY_EMPTY} from "@app/constant";
import {GoogleYoutubeOauthService} from "@app/feature/admin/google-youtube-oauth/service";
import {ChannelView} from "@app/model/view/channel";
import {AbstractControl, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ChannelStateMap} from "@app/model/type/youtube-oauth.type";
import {defaultChannelState} from "@app/model/default";
import {faArrowRight, faPlus} from "@fortawesome/free-solid-svg-icons";
import {isFalsy, removeProperty} from "@app/shared/helper";
import {UpdateChannelPayload} from "@app/model/type/channel.type";
import {ErrorResponse} from "@app/model/response";

@Component({
  selector: 'app-client-credential-channel-entries',
  templateUrl: './client-credential-channel-entries.component.html',
  styleUrls: ['./client-credential-channel-entries.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ClientCredentialChannelEntriesComponent extends BaseEntriesComponent<ChannelView> implements OnInit {

  public override pageTitle: string = 'Channels';
  public override entries: ChannelView[] = [];
  public override searchFilter: SearchFilter[] = SEARCH_FILTER_VIEW_CHANNEL;
  public override pageSize: number = 100;

  public form = new FormGroup({
    active: new FormControl('true')
  });

  get active(): any {
    return this.form.get('active')
  }

  public channelState: ChannelStateMap = {};

  public constructor(
      protected googleYoutubeOauthService: GoogleYoutubeOauthService,
      protected override formBuilder: FormBuilder,
      router: Router,
      route: ActivatedRoute,
      location: Location) {
    super(router, route, location);
  }

  public ngOnInit(): void {
    this.enableLoading();
    this.startComponent((): void => {
      this.formReady();
      this.initChannelState();
    });
  }

  public override async search(payload: SearchPayload): Promise<void> {
    removeProperty(payload, 'q');
    await super.search(payload);
  }

  public initChannelState(): void {
    this.entries.forEach((channel: ChannelView): void => {
      this.channelState[channel.channelId] = { ...defaultChannelState, formBuilder: this.formBuilder }
      this.channelState[channel.channelId].initForm(channel, this.formBuilder);
    });
  }

  public override findEntries(params: AnyObject): Observable<SearchResultView<ChannelView>> {
    return this.googleYoutubeOauthService.findChannelsByCredential(params);
  }

  public override deleteEntries(payload: DeleteIdsPayload): Observable<any> {
    return ANY_EMPTY;
  }

  public updateChannel(channel: ChannelView): void {
    const payload: UpdateChannelPayload = this.getChannelForm(channel).value;
    console.log(payload);

    const channelState: ChannelState = this.getChannelState(channel);
    channelState.clearErrors();

    if (isFalsy(channelState.isSubmitting) && this.getChannelForm(channel).valid) {
      channelState.disableSubmitting();
      channelState.clearMessages();

      this.googleYoutubeOauthService
        .updateChannel(channel.channelId, this.getChannelPayload(channel))
        .subscribe({
          next: (): void => {
            channelState.enableIsSubmittingSuccessful();
            this.invokeCallbackWithDelay((): void => {
              channelState.disableIsSubmittingSuccessful();
              channelState.enableSubmitting();
            });
          },
          error: (error: ErrorResponse): void => {
            this.getChannelState(channel).errorMessage = error.message;
            channelState.enableSubmitting();
          },
      });
    }
  }

  public getChannelState(channel: ChannelView): ChannelState {
    return this.channelState[channel.channelId];
  }

  public getChannelForm(channel: ChannelView): FormGroup {
    console.log(this.getChannelState(channel).form);
    return this.getChannelState(channel).form;
  }

  public getChannelPayload(channel: ChannelView): UpdateChannelPayload {
    return this.getChannelForm(channel).value;
  }

  public getDescriptionCtrl(channel: ChannelView): AbstractControl | null | undefined {
    return this.getChannelState(channel)?.form.get('description');
  }

  public getIsActiveCtrl(channel: ChannelView): AbstractControl | null | undefined {
    console.log(this.getChannelForm(channel).value);
    return this.getChannelForm(channel).get('isActive');
  }

  protected readonly faPlus = faPlus;
  protected readonly faArrowRight = faArrowRight;
}
