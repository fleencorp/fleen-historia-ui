import {Gender, MemberStatus, MfaType, ProfileVerificationStatus, UserType} from "@app/model/enum";
import {FleenBaseView} from "@app/model/view";
import {RoleView} from "@app/model/view/video/role.view";
import {toValues} from "@app/shared/helper";

export class MemberView extends FleenBaseView {
  public readonly memberId: number;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly emailAddress: string;
  public readonly phoneNumber: string;
  public readonly profilePhoto: string;
  public readonly mfaEnabled: boolean | null;
  public readonly mfaType: MfaType;
  public readonly profileVerificationStatus: ProfileVerificationStatus;
  public readonly userType: UserType;
  public readonly gender: Gender;
  public readonly dateOfBirth: Date;
  public readonly emailAddressVerified: boolean;
  public readonly phoneNumberVerified: boolean;
  public readonly memberStatus: MemberStatus;
  public readonly roles: RoleView[];

  public constructor(data: MemberView) {
    super(data);
    this.memberId = data?.memberId ?? 0;
    this.firstName = data?.firstName ?? '';
    this.lastName = data?.lastName ?? '';
    this.emailAddress = data?.emailAddress ?? '';
    this.phoneNumber = data?.phoneNumber ?? '';
    this.profilePhoto = data?.profilePhoto ?? '';
    this.mfaEnabled = data?.mfaEnabled ?? null;
    this.mfaType = data?.mfaType;
    this.profileVerificationStatus = data?.profileVerificationStatus;
    this.userType = data?.userType;
    this.gender = data?.gender;
    this.dateOfBirth = data?.dateOfBirth ? new Date(data.dateOfBirth) : new Date();
    this.emailAddressVerified = data?.emailAddressVerified ?? false;
    this.phoneNumberVerified = data?.phoneNumberVerified ?? false;
    this.memberStatus = data?.memberStatus;
    this.roles = data?.roles ? toValues(data.roles, RoleView): [];
  }

  get fullName(): string {
    return this.firstName + ' ' + this.lastName;
  }
}
