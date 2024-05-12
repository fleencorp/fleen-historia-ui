import {Component, Input, OnInit} from '@angular/core';
import {MemberView} from "@app/model/view/member";
import {BaseFormImplComponent} from "@app/base/component";
import {AdminMemberService} from "@app/feature/admin/admin-member/service";
import {EnumView} from "@app/model/type";
import {AvailableUserRoleResponse} from "@app/model/response/member";
import {ErrorResponse, FleenResponse} from "@app/model/response";
import {isFalsy, isTruthy} from "@app/shared/helper";
import {RoleView} from "@app/model/view/video/role.view";
import {AbstractControl, FormControl} from "@angular/forms";
import {enumValid} from "@app/shared/validator";
import {RoleType} from "@app/model/enum";

@Component({
  selector: 'app-member-role-update',
  templateUrl: './member-role-update.component.html',
  styleUrls: ['./member-role-update.component.css']
})
export class MemberRoleUpdateComponent extends BaseFormImplComponent implements OnInit {

  @Input('entry') public entryView!: MemberView;
  public roles: any[] | EnumView[] = [];
  public selectedValues: string[] = [];
  public roleCtrl: FormControl = new FormControl('', [enumValid(RoleType)])

  public constructor(
    protected adminMemberService: AdminMemberService) {
    super();
  }

  public isSelected(role: string): boolean {
    return this.selectedValues.includes(role);
  }

  public toggleRole(role: string): void {
    const index: number = this.selectedValues.indexOf(role);
    if (index === -1) {
      this.selectedValues.push(role);
    } else {
      this.selectedValues.splice(index, 1);
    }
    this.updateControlStatus(role);
  }

  protected updateControlStatus(role: string): void {
    this.roleCtrl.patchValue(role);
    this.roleCtrl.updateValueAndValidity();
    this.roleCtrl.markAsTouched();
  }

  private get existingRoles(): RoleView[] {
    return this.entryView.roles;
  }

  public isMatchExistingUserRole(role: string): boolean {
    return this.getRoleCodes(this.existingRoles).includes(role);
  }

  public getRoleCodes(roles: RoleView[]): string [] {
    return roles.map((role: RoleView): string => role.code);
  }

  public updateMemberRole(): void {
    console.log(this.selectedValues);
    if (isFalsy(this.isSubmitting) && this.selectedValues.length > 0) {
      this.clearAllMessages();
      this.disableSubmitting();

      this.adminMemberService.updateMemberRole(this.member.memberId, { roles: this.selectedValues })
        .subscribe({
          next: (result: FleenResponse): void => {
            this.enableSubmitting();
            this.formCompleted();
            this.setStatusMessageAndClear(result.message);
          },
          error: (error: ErrorResponse): void => {
            this.handleError(error);
            this.enableSubmitting();
          }
      });
    }
  }

  public ngOnInit(): void {
    this.enableLoading();
    if (isTruthy(this.entryView)) {
      this.getAvailableRoles((): void => {
        this.initSelectedRoles();
      });
    }
  }

  public initSelectedRoles(): void {
    this.selectedValues = [ ...this.getRoleCodes(this.entryView.roles) ];
  }

  public getAvailableRoles(cb?: Function): void {
    this.adminMemberService.getAvailableUserRoles()
      .subscribe({
        next: (result: AvailableUserRoleResponse): void => {
          this.roles = result.roles;
          this.disableLoading();
          this.formReady();
          this.invokeCallback(cb);
        },
        error: (error: ErrorResponse): void => {
          this.handleError(error);
          this.disableLoading();
        }
    });
  }

  get member(): MemberView {
    return this.entryView;
  }


}
