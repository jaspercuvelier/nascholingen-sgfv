import { NgModule }             from '@angular/core';
import { CommonModule } from '@angular/common';  
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppLoginComponent }             from './app-login/app-login.component';
import { AppOverzichtNascholingenComponent }             from './app-overzicht-nascholingen/app-overzicht-nascholingen.component';
import { UsermanagementComponent }             from './usermanagement/usermanagement.component';
import { NascholingToevoegenComponent }             from './nascholing-toevoegen/nascholing-toevoegen.component';
import { AppRegisterComponent } from './app-register/app-register.component';
import { MaterialModule } from "./material/material-module";


@NgModule({
    declarations: [ 
    AppLoginComponent,
    AppOverzichtNascholingenComponent, 
    UsermanagementComponent,
    NascholingToevoegenComponent,
    AppRegisterComponent,


  ],
  imports: [
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    RouterModule.forRoot([
      { path: 'login', component: AppLoginComponent },
      { path: 'overzicht', component: AppOverzichtNascholingenComponent }, 
      { path: 'usermanagement', component: UsermanagementComponent }, 
      { path: 'nascholingtoevoegen', component: NascholingToevoegenComponent },
      { path: 'registreer', component: AppRegisterComponent} ,
        { path: '**', redirectTo: 'login' }
    ])
  ],

  exports: [ RouterModule ]
})
export class AppRoutingModule {}