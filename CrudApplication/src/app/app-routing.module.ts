import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';
import { DeleteComponent } from './delete/delete.component';

const routes: Routes = [
  { path: 'add', component: AddComponent },
  { path: 'update', component: UpdateComponent },
  { path: 'delete', component: DeleteComponent }
];

@NgModule({
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
