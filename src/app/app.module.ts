import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { AngularFireModule,  } from 'angularfire2';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { MaterialModule } from "./material/material-module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AppLoginComponent } from './app-login/app-login.component';
import { AppOverzichtNascholingenComponent } from './app-overzicht-nascholingen/app-overzicht-nascholingen.component';
import { UsermanagementComponent } from './usermanagement/usermanagement.component';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {APP_BASE_HREF} from '@angular/common';


@NgModule({
  imports:      [ AppRoutingModule,
                  BrowserModule, 
                  FormsModule , 
                  FlexLayoutModule , 
                  BrowserAnimationsModule, 
                  MaterialModule ,
                  AngularFirestoreModule,

                  AngularFireModule.initializeApp( {
                    apiKey: "AIzaSyANtuXshTEBB-AuFc1qzrjpL38BZlDQfPw",
                    authDomain: "ict-nascholingen.firebaseapp.com",
                    databaseURL: "https://ict-nascholingen.firebaseio.com",
                    projectId: "ict-nascholingen",
                    storageBucket: "ict-nascholingen.appspot.com",
                    messagingSenderId: "409145896186"
                  }),
                  AngularFireAuthModule,
                 


  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}],
  declarations: [ AppComponent  ],
  bootstrap:    [ AppComponent  ]
})
export class AppModule { }
