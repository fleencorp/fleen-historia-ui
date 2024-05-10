import {MemberStatusView} from "./member-status.view";
import {Gender, MfaType, UserType} from "@app/model/enum";
import {FleenBaseView} from "@app/model/view";

export class MemberView extends FleenBaseView {
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly emailAddress: string;
  public readonly phoneNumber: string;
  public readonly profilePhoto: string;
  public readonly mfaEnabled: boolean | null;
  public readonly mfaType: MfaType;
  public readonly profileVerificationStatus: string;
  public readonly userType: UserType;
  public readonly gender: Gender;
  public readonly dateOfBirth: Date;
  public readonly emailAddressVerified: boolean;
  public readonly phoneNumberVerified: boolean;
  public readonly memberStatus: MemberStatusView;

  public constructor(data: MemberView) {
    super(data);
    this.firstName = data?.firstName ?? '';
    this.lastName = data?.lastName ?? '';
    this.emailAddress = data?.emailAddress ?? '';
    this.phoneNumber = data?.phoneNumber ?? '';
    this.profilePhoto = data?.profilePhoto ?? '';
    this.mfaEnabled = data?.mfaEnabled ?? null;
    this.mfaType = data?.mfaType;
    this.profileVerificationStatus = data?.profileVerificationStatus ?? '';
    this.userType = data?.userType;
    this.gender = data?.gender;
    this.dateOfBirth = data?.dateOfBirth ? new Date(data.dateOfBirth) : new Date();
    this.emailAddressVerified = data?.emailAddressVerified ?? false;
    this.phoneNumberVerified = data?.phoneNumberVerified ?? false;
    this.memberStatus = data?.memberStatus ? new MemberStatusView(data.memberStatus) : data?.memberStatus;
  }
}
