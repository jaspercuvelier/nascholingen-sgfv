import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import {Router} from "@angular/router"

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})

export class AppComponent  {

  uid: string = "";
  username : string ="";
  userobj = {} as any;
  nascholer: boolean = false;
  admin:boolean=false;
  constructor(public afAuth: AngularFireAuth,private router: Router) { 
    this.afAuth.authState.subscribe(user => {
    if(user) 
    {
        this.uid = user.uid;
          if (this.uid === "OWoPVmQ3kRQ5f2EJW8B9GzZUTCU2")
            {
              console.log("admin User Found!" + this.uid)
              this.admin = true;
            }
        this.userobj = user;
        user.getIdTokenResult().then((idTokenResult)=> {
         
          this.nascholer = idTokenResult.claims.nascholer
        });
    }
    else 
    {
        // Empty the value when user signs out
      this.uid = null;
      this.userobj = {};
      this.nascholer = false;
      this.admin= false;
    }
    });
  }

    logout() {
      this.afAuth.auth.signOut();
      this.uid = null;
      this.userobj = {};
      this.nascholer = false;
      this.admin= false;
       this.router.navigate(["./login"])
  }

  ngOnInit() {
    
  }

}