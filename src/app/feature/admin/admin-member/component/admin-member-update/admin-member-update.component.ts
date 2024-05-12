import {Component, ViewEncapsulation} from '@angular/core';
import {BaseUpdateComponent} from "@app/base/component";
import {AnyObject} from "@app/model/type";
import {MemberView} from "@app/model/view/member";
import {Observable} from "rxjs";
import {AbstractControl, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ANY_EMPTY} from "@app/constant";
import {AdminMemberService} from "@app/feature/admin/admin-member/service";
import {enumValid, required} from "@app/shared/validator";
import {MemberStatus} from "@app/model/enum";
import {isFalsy} from "@app/shared/helper";
import {ErrorResponse} from "@app/model/response";
import {faArrowLeft, faInfo, faKey, IconDefinition} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-admin-member-update',
  templateUrl: './admin-member-update.component.html',
  styleUrls: ['./admin-member-update.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminMemberUpdateComponent extends BaseUpdateComponent<MemberView, AnyObject> {

  public override entryView!: MemberView;
  public startUpdateMemberRole: boolean = false;

  public constructor(
      protected adminMemberService: AdminMemberService,
      protected override formBuilder: FormBuilder,
      router: Router,
      route: ActivatedRoute) {
    super(router, route);
  }

  public async ngOnInit(): Promise<void> {
    this.enableLoading();
    await this.initEntry((): void => {
      this.start();
    });
  }

  public goBack(): void {
    this.startUpdateMemberRole = false;
  }

  get fleenVideo(): MemberView {
    return this.entryView;
  }

  get canUpdateMemberStatus(): boolean {
    return !(this.startUpdateMemberRole);
  }

  protected $updateEntry(id: string | number, payload: AnyObject): Observable<MemberView> {
    return ANY_EMPTY;
  }

  public updateMemberRole(): void {
    this.startUpdateMemberRole = true;
  }

  protected getServiceEntry(id: number | string): Observable<MemberView> {
    return this.adminMemberService.findMember(id);
  }

  protected initForm(): void {
    this.fleenForm = this.formBuilder.group({
      memberStatus: new FormControl(this.entryView.memberStatus, [required, enumValid(MemberStatus)])
    });
    this.formReady();
  }

  public start(): void {
    this.initForm();
  }

  public updateMemberStatus(): void {
    if (isFalsy(this.isSubmitting) && this.fleenForm.valid) {
      this.disableSubmittingAndResetErrorMessage();

      this.adminMemberService.updateMemberStatus(this.entryId, this.fleenForm.value)
        .subscribe({
          next: (): void => { this.formCompleted(); },
          error: (error: ErrorResponse): void => { this.handleError(error); },
          complete: async (): Promise<void> => { this.enableSubmitting(); }
        });
    }
  }

  get memberStatus(): AbstractControl | null | undefined {
    return this.fleenForm?.get('memberStatus');
  }

  get updateMemberStatusForm(): FormGroup {
    return this.fleenForm;
  }

  protected readonly faInfo: IconDefinition = faInfo;
  protected readonly faArrowLeft: IconDefinition = faArrowLeft;
  protected readonly faKey = faKey;
}
