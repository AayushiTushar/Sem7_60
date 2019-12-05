import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductCreateComponent } from './product-create/product-create.component'
import { ProductListComponent } from './product-list/product-list.component'
import { ProductEditComponent } from './product-edit/product-edit.component'

const routes: Routes = [
  { path: 'create', component: ProductCreateComponent},
  { path: '', component: ProductListComponent},
  { path: 'edit/:id', component: ProductEditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
