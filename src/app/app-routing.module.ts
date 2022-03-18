import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './components/error404/error404.component';
import { FormComponent } from './components/users/form/form.component';
import { UsersComponent } from './components/users/users.component';
const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'users', component: UsersComponent },
  { path: 'users/page/:page', component: UsersComponent },
  { path: 'users/form', component: FormComponent },
  { path: 'users/form/:id', component: FormComponent },
  { path: 'error404', component: Error404Component },
  { path: '**', redirectTo: 'error404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
