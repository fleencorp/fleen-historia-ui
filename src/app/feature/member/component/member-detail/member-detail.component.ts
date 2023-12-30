import {Component, OnInit} from '@angular/core';
import {BaseComponentImpl} from "@app/base/component/base/base.component.impl";
import {MemberService} from "@app/feature/member/service";
import {GetMemberUpdateDetailsResponse} from "@app/model/response/member";
import {ErrorResponse} from "@app/model/response";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent extends BaseComponentImpl implements OnInit {

  public memberDetails!: GetMemberUpdateDetailsResponse;

  public constructor(protected readonly memberService: MemberService,
                     protected readonly route: ActivatedRoute) {
    super();
  }

  public ngOnInit(): void {
    this.pageTitle = this.route.snapshot.title;
    this.memberService.getDetail()
     .subscribe({
       next: (result: GetMemberUpdateDetailsResponse): void => { this.memberDetails = result; },
       error: (error: ErrorResponse): void => { this.handleError(error); }
     });
  }
}
