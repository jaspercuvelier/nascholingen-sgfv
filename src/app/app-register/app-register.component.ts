import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import { FirebaseAuthState } from 'angularfire2';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { NewUser } from './new-user';
import {Router} from "@angular/router"
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-app-register',
  templateUrl: './app-register.component.html',
  styleUrls: ['./app-register.component.css']
})


export class AppRegisterComponent implements OnInit {


  constructor(public afAuth: AngularFireAuth, private router: Router, public snackBar:MatSnackBar ) { }

  model = new NewUser('','','','');
  submitted = false;
  busy = false;
  onSubmit() { 
      this.busy = true;
      if ((this.model.email != "") && (this.model.firstName != "") && (this.model.lastName != "") && (this.model.password != ""))
      {
        this.submitted = true; 
        return this.afAuth.auth.createUserWithEmailAndPassword(this.model.email,this.model.password)
        .then((user) => {
          console.log("success");
          this.router.navigate(["./login"])
          user.user.updateProfile({'displayName':this.model.firstName + " " + this.model.lastName})
        })
        .catch((error) => {
          console.log(error);
          this.router.navigate(["./registreer"])
          this.submitted = false; 
          this.errorMessage = error;
          this.snackBar.open(error,"X",{duration:6000});
          throw error;
        });
      }
      else
      {
        console.log("nonnie nonnie!")
        
            this.snackBar.open("Vul alle verplichte velden in.","X",{duration:6000});
      }
  }


  

  ngOnInit() {
  }

}
