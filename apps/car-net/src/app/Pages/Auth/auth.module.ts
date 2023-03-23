import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Location } from '@angular/common';
import { RouterModule } from '@angular/router';




@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
    ],
    imports: [
      CommonModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      TooltipModule.forRoot(),
      ModalModule.forRoot(),
      BsDatepickerModule.forRoot(),
      RouterModule,
    ],
     exports: [LoginComponent, RegisterComponent],
     providers: [Location],
  })
  export class AuthModule {}