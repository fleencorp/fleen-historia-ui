
export class GetMemberUpdateDetailsResponse {

  public readonly firstName: string;
  public readonly lastName: string;
  public readonly emailAddress: string;
  public readonly phoneNumber: string;
  public readonly profilePhoto: string;

  public constructor(data: GetMemberUpdateDetailsResponse) {
    this.firstName = data?.firstName ? data.firstName : data?.firstName;
    this.lastName = data?.lastName ? data.lastName : data?.lastName;
    this.emailAddress = data?.emailAddress ? data.emailAddress : data?.emailAddress;
    this.phoneNumber = data?.phoneNumber ? data.phoneNumber : data?.phoneNumber;
    this.profilePhoto = data?.profilePhoto ? data.profilePhoto : data?.profilePhoto;
  }
}
