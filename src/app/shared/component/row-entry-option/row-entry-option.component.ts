import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {faCheck, faEye, faPencil, faSpinner, faTrash, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {DeleteStatusEnum} from "@app/model/enum/base.enum";

@Component({
  selector: 'app-row-entry-option',
  templateUrl: './row-entry-option.component.html',
  styleUrls: ['./row-entry-option.component.css']
})
export class RowEntryOptionComponent {

  protected readonly faEye: IconDefinition = faEye;
  protected readonly faPencil: IconDefinition = faPencil;
  protected readonly faTrash: IconDefinition = faTrash;
  protected readonly faSpinner: IconDefinition = faSpinner;
  protected readonly faCheck: IconDefinition = faCheck;

  @Input('entry-id') public entryId!: number;
  @Input('can-check') public canCheck: boolean = true;
  @Input('can-update') public canUpdate: boolean = true;
  @Input('is-deleting') public isDeleting: DeleteStatusEnum = DeleteStatusEnum.NOT_STARTED;
  @Input('delete-id') public deleteId: number | string = 0;

  @Input('can-delete') public canDelete: boolean = true;
  @Output() public detailClicked: EventEmitter<number> = new EventEmitter<number>();
  @Output() public updateClicked: EventEmitter<number> = new EventEmitter<number>();
  @Output() public deleteClicked: EventEmitter<number> = new EventEmitter<number>();

  @Output() public checkedChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  public viewDetail(): void {
    this.detailClicked.emit(this.entryId);
  }

  public updateEntry(): void {
    this.updateClicked.emit(this.entryId);
  }

  public deleteEntry(): void {
    this.deleteClicked.emit(this.entryId);
  }

  public handleChecked(checked: boolean): void {
    this.checkedChanged.emit(checked);
  }

  protected readonly DeleteStatusEnum = DeleteStatusEnum;
}
