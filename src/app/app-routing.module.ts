import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DynamicFormCreationComponent } from './dynamic-form-creation/dynamic-form-creation.component';

const routes: Routes = [
  { path: '', redirectTo: 'dynamicform', pathMatch: 'full' },
  { path: 'dynamicform', component: DynamicFormCreationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
