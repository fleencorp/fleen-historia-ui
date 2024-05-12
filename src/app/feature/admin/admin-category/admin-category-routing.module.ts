import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "@app/base/guard";
import {
  CategoryBaseComponent,
  CategoryDashboardComponent,
  CategoryDetailComponent,
  CategoryEntriesComponent,
  CategoryUpdateComponent
} from "@app/feature/admin/admin-category/component";

const routes: Routes = [
  { path: '',
    canActivate: [AuthGuard],
    component: CategoryBaseComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: CategoryDashboardComponent, title: 'Category Dashboard' },
      { path: 'entries', component: CategoryEntriesComponent, title: 'Category Entries' },
      { path: 'detail/:id', component: CategoryDetailComponent, title: 'Category Detail' },
      { path: 'update/:id', component: CategoryUpdateComponent, title: 'Update Category' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminCategoryRoutingModule { }
