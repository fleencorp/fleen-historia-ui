import {Component, Input} from '@angular/core';
import {YouTubeCategoryResponse} from "@app/model/response/youtube";

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {

  @Input('entry')
  public entry!: YouTubeCategoryResponse;

}
