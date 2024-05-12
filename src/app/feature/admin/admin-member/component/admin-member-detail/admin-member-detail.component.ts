import {Component, OnInit} from '@angular/core';
import {BaseDetailComponent} from "@app/base/component";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {MemberView} from "@app/model/view/member";
import {AdminMemberService} from "@app/feature/admin/admin-member/service";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-admin-member-detail',
  templateUrl: './admin-member-detail.component.html',
  styleUrl: './admin-member-detail.component.css'
})
export class AdminMemberDetailComponent extends BaseDetailComponent<MemberView> implements OnInit {

  public override entryView!: MemberView;
  protected override formBuilder!: FormBuilder;

  public constructor(
      private memberService: AdminMemberService,
      router: Router,
      route: ActivatedRoute) {
    super(router, route);
  }

  public async ngOnInit(): Promise<void> {
    this.enableLoading();
    await this.initEntry();
  }

  protected override getServiceEntry(id: number | string): Observable<MemberView> {
    return this.memberService.findMember(id);
  }

  get member(): MemberView {
    return this.entryView;
  }
}
