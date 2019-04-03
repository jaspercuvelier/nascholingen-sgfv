import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-app-overzicht-nascholingen',
  templateUrl: './app-overzicht-nascholingen.component.html',
  styleUrls: ['./app-overzicht-nascholingen.component.css']
})
export class AppOverzichtNascholingenComponent implements OnInit {
  items: Observable<any[]>;
  itemsingeschreven: Observable<any[]>;
  inschrijvingen: any[] = [''];
  ref: Observable<any[]>;
  toggleTags: Observable<any[]>;
  filterableTags: Observable<any[]>;
  displayedColumns: string[] = ['titel', 'inschrijven']
  uid: string = "";
   displayname: string = "";
     nascholer: boolean = false;
  constructor(public db: AngularFirestore, public afAuth: AngularFireAuth, ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.uid = user.uid;
        this.displayname = user.displayName;
           const inschrijfref = this.db.collection('users-inschrijvingen').doc(this.uid).valueChanges()
   
            inschrijfref.subscribe(
                          val => { 
                        if (val) {
                           const keys = Object.keys(val);
                           for (var i = 0; i < keys.length; i++ )
                            {
                              if (val[keys[i]] == true)
                                {
                                  this.inschrijvingen.push(keys[i])
                                }
                            }
                                                      
                          } 
                          else 
                          { this.inschrijvingen = [];}}
                        );
            user.getIdTokenResult().then((idTokenResult)=> {
         
          this.nascholer = idTokenResult.claims.nascholer
        });            
      }
      else {
        // Empty the value when user signs out
        this.uid = null;
        this.displayname = null;
      }
    })

  }

  ngOnInit() {
    this.ref = this.db.collection('nascholingen', ref => ref.orderBy('titel'))

    this.items = this.ref.snapshotChanges()
 

    this.toggleTags = [];
    this.filterableTags = this.db.collection('nascholingen-tags', ref => ref).valueChanges();
  }
  toggleTag(tag) {
    if (this.toggleTags.indexOf(tag) > -1) {
      this.toggleTags.splice(this.toggleTags.indexOf(tag), 1)
    }
    else {
      this.toggleTags.push(tag)
    }
    console.log(this.toggleTags)
    this.items = this.db.collection('nascholingen', ref => {
      let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
      for (var i = 0; i < this.toggleTags.length; i++) {
        query = query.where('tags.' + this.toggleTags[i], '==', true)
      }

      return query;
    }).snapshotChanges()


  }
  inschrijven(nascholingsid) {
    console.log(this.itemsingeschreven)
    const uid = this.uid;
    const obj = {}
     obj[uid+"-"+nascholingsid] = true

    console.log("adding " + this.uid + " to this " + JSON.stringify(nascholingsid))
    this.db.collection('users-inschrijvingen').doc(uid).set(obj,{merge:true});


  }



  uitschrijven(nascholingsid) {
    console.log(this.itemsingeschreven)
    const uid = this.uid;
    const obj = {}
     obj[uid+"-"+nascholingsid] = firebase.firestore.FieldValue.delete();
    console.log("adding " + this.uid + " to this " + JSON.stringify(nascholingsid))
//     const cityRef = this.firestore.doc(`cities/BJ`);
// cityRef.update({
//   capital: this.firestore.FieldValue.delete()
// });
this.db.collection('users-inschrijvingen').doc(uid).update(obj)
   // this.db.collection('users-inschrijvingen').doc(uid).set(obj,{merge:true});
    this.inschrijvingen.splice(this.inschrijvingen.indexOf(this.uid+'-'+nascholingsid),1)

  }


}