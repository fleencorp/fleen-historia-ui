import {Component, Input, ViewEncapsulation} from '@angular/core';
import {ReplyView} from "@app/model/view/discussion";

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ReplyComponent {

  @Input('replies')
  public replies: ReplyView[] = [];

  public trackByFn(index: number, item: ReplyView): any {
    return item.replyId;
  }

}
