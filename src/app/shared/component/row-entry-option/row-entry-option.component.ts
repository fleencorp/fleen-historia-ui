import {Component, EventEmitter, Input, Output} from '@angular/core';
import {faEye, faPencil, faTrash, IconDefinition} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-row-entry-option',
  templateUrl: './row-entry-option.component.html',
  styleUrls: ['./row-entry-option.component.css']
})
export class RowEntryOptionComponent {

  protected readonly faEye: IconDefinition = faEye;
  protected readonly faPencil: IconDefinition = faPencil;
  protected readonly faTrash: IconDefinition = faTrash;

  @Input('entry-id') public entryId!: number;
  @Input('can-check') public canCheck: boolean = true;
  @Input('can-update') public canUpdate: boolean = true;

  @Input('can-delete') public canDelete: boolean = true;
  @Output() public detailClicked: EventEmitter<number> = new EventEmitter<number>();
  @Output() public updateClicked: EventEmitter<number> = new EventEmitter<number>();
  @Output() public deleteClicked: EventEmitter<number> = new EventEmitter<number>();

  @Output() public checkedChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

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
}
