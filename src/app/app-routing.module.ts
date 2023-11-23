import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogListComponent } from './blog-list/blog-list.component';
import { AddEditblogComponent } from './add-editblog/add-editblog.component';

const routes: Routes = [
  {path:'',component:BlogListComponent},
  {path:'add',component:AddEditblogComponent},
  {path:'edit/:id',component:AddEditblogComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
