import {Component, OnInit} from '@angular/core';
import {BaseFormComponent} from "@app/base/component";
import {nonNull} from "@app/shared/helper";
import {ANY_EMPTY} from "@app/constant";
import {Observable, of} from "rxjs";
import {GetMemberUpdateDetailsResponse} from "@app/model/response/member";
import {ErrorResponse} from "@app/model/response";
import {Router} from "@angular/router";
import {FormBuilder, FormControl} from "@angular/forms";
import {DEFAULT_IMAGE_CONSTRAINT} from "@app/constant/file.const";
import {FileConstraints} from "@app/model/type";
import {MemberService} from "@app/feature/member/service";
import {S3Service, SignedUrlService} from "@app/shared/service/impl";
import {DeleteResponse, SignedUrlResponse} from "@app/model/response/common";

@Component({
  selector: 'app-update-photo',
  templateUrl: './update-photo.component.html',
  styleUrls: ['./update-photo.component.css']
})
export class UpdatePhotoComponent extends BaseFormComponent implements OnInit {

  protected override formBuilder!: FormBuilder;
  public signedUrl: string | null = null;
  public profilePhoto: FormControl = new FormControl<string>('');
  public photoConstraints: FileConstraints = DEFAULT_IMAGE_CONSTRAINT;

  public constructor(protected memberService: MemberService,
                     protected signedUrlService: SignedUrlService,
                     protected s3Service: S3Service) {
    super();
  }

  protected override getRouter(): Router {
    return ANY_EMPTY;
  }

  public ngOnInit(): void {
    this.enableLoading();
    this.memberService.getDetail()
      .subscribe({
        next: (result: GetMemberUpdateDetailsResponse): void => {
          this.signedUrl = result.profilePhoto;
          this.formReady();
        },
        error: (error: ErrorResponse): void => { this.handleError(error); },
        complete: (): void => { this.disableLoading(); }
    });
  }

  private savePhoto(signedUrl: string): Observable<any> {
    if (nonNull(signedUrl)) {
      return this.memberService.updateProfilePhoto({
        profilePhoto: this.s3Service.extractBaseUrl(signedUrl)!
      });
    }
    return of(ANY_EMPTY);
  }

  get signedUrlMethod(): (...data: any[]) => Observable<SignedUrlResponse> {
    return this.signedUrlService.generateForProfilePhoto.bind(this.signedUrlService);
  }

  get saveFileMethod(): (...data: any[]) => Observable<any> {
    return this.savePhoto.bind(this);
  }

  get deleteFileMethod(): (...data: any[]) => Observable<DeleteResponse> {
    return this.memberService.removeProfilePhoto.bind(this.memberService);
  }

}
