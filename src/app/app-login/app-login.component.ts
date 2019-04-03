import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../material/material-module';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-app-login',
  templateUrl: './app-login.component.html',
  styleUrls: ['./app-login.component.css']
})

export class AppLoginComponent implements OnInit {
  uid: string = "";
  username : string ="";

  userobj = {} as any;
  constructor(public afAuth: AngularFireAuth, public snackBar:MatSnackBar) { 

    this.afAuth.authState.subscribe(user => {
    if(user) 
    {
        this.uid = user.uid;
        this.userobj = user;
    }
    else 
    {
        // Empty the value when user signs out
      this.uid = null;
      this.userobj = {};
    }
    });
  }
    username= "";
    password= "";
    submitted = false;
    busy = false;
        loginWithGoogle() {
          this.busy=true;
          this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
            .catch((error)=>{
              if(error.code == "auth/invalid-email")
                {
                  var message = "Ongeldig e-mailadres."
                }
              else if(error.code == "auth/wrong-password")
                {
                  var message = "Ongeldig wachtwoord."
                }
              else if(error.code == "auth/user-not-found")
                {
                  var message = "Gebruiker bestaat niet."
                }
              else 
              {
                var message = error;
              }  
                
              this.snackBar.open(message,"X",{duration:6000});
              this.busy=false;
            })
            .then(()=>{this.busy=false;})

        };

        login() {
          console.log(this.username)
          this.busy=true;
          this.afAuth.auth.signInWithEmailAndPassword(this.username,this.password)
           .catch((error)=>{
              if(error.code == "auth/invalid-email")
                {
                  var message = "Ongeldig e-mailadres."
                }
              else if(error.code == "auth/wrong-password")
                {
                  var message = "Ongeldig wachtwoord."
                }
              else if(error.code == "auth/user-not-found")
                {
                  var message = "Gebruiker bestaat niet."
                }
              else 
              {
                var message = error;
              }  
                
              this.snackBar.open(message,"X",{duration:6000});
              this.busy=false;
              
            } ) 
          
        };

    logout() {
      this.afAuth.auth.signOut();
    
  }

  ngOnInit() {
    
  }

}
