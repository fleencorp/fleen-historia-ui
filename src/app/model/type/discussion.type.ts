import {FormControl} from "@angular/forms";
import {FeatureState} from "@app/model/type/base.type";

export interface ReplyState extends FeatureState {
  replyContent: FormControl;
}

export interface ReplyStateMap {
  [commentId: string]: ReplyState;
}
