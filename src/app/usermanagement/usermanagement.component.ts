import { Component, OnInit, ViewChild } from '@angular/core';

import {MatSort, MatTableDataSource} from '@angular/material';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.css']
})
export class UsermanagementComponent implements OnInit {
  items: Observable<any[]>;
  displayedColumns: string[] = ['naam', 'lesgever','activeer']
  admin:boolean=false;
 uid: string = "";
  username : string ="";
  userobj = {} as any;
  nascholer: boolean = false;
 
  constructor(   
    public db: AngularFirestore,
    public afAuth: AngularFireAuth
    ) { 
this.afAuth.authState.subscribe(user => {
    if(user) 
    {
        this.uid = user.uid;
          if (this.uid === "OWoPVmQ3kRQ5f2EJW8B9GzZUTCU2")
            {
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

  ngOnInit() {
    
    this.items = this.db.collection('users',ref => ref.orderBy('nascholer')).valueChanges();
   
  }
  toggleGebruiker(uid,currentstate) {
    console.log(uid +" > naar > " + !currentstate)
    this.db.collection('users').doc(uid).update({nascholer:!currentstate});
  }
}