import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ClienteComponent } from './cliente/cliente.component';
import { FormComponent } from './cliente/form/form.component';
import  {APP_ROUTING} from './router';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { MaterialModule } from './core/material.module';
import { AcademyComponent } from './cliente/form/academy/academy.component';
@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    FormComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    AcademyComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    SweetAlert2Module,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
