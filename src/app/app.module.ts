import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Error404Component } from './components/error404/error404.component';
import { FormComponent } from './components/users/form/form.component';

import { PaginatorComponent } from './components/paginator/paginator.component';
import { HttpClientModule } from '@angular/common/http';
import { FiltroUsersComponent } from './components/filtro-users/filtro-users.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    HeaderComponent,
    FooterComponent,
    Error404Component,
    FormComponent,
    PaginatorComponent,
    FiltroUsersComponent
  ],
  entryComponents: [FiltroUsersComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
