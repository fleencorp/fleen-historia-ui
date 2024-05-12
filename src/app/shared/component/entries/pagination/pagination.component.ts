import {Component, EventEmitter, Input, Output} from '@angular/core';
import {faArrowLeft, faArrowRight, faSpinner, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {DeleteStatusEnum} from "@app/model/enum/base.enum";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {

  @Input('entries-available') public entriesAvailable: boolean | undefined;
  @Input('is-first') public isFirst: boolean | undefined;
  @Input('is-last') public isLast: boolean | undefined;
  @Input('current-page-number') public currentPageNumber: number = 0;
  @Input('navigation-in-progress') public navigationInProgress: boolean | undefined;
  @Output() public toNextPage: EventEmitter<void> = new EventEmitter<void>();
  @Output() public toPreviousPage: EventEmitter<void> = new EventEmitter<void>();
  @Input('bottom') public bottom: boolean = false;

  public nextPage(): void {
    this.toNextPage.emit();
  }

  public previousPage(): void {
    this.toPreviousPage.emit();
  }

  protected readonly faArrowRight: IconDefinition = faArrowRight;
  protected readonly faArrowLeft: IconDefinition = faArrowLeft;
  protected readonly faSpinner: IconDefinition = faSpinner;
  protected readonly DeleteStatusEnum = DeleteStatusEnum;
}
