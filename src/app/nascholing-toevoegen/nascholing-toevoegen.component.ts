import { Component, OnInit } from '@angular/core';
import { NewNascholing } from './new-nascholing';
import { AngularFirestore } from '@angular/fire/firestore';
import { NewTag } from './new-tag';
import {MatSnackBar} from '@angular/material';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
@Component({
  selector: 'app-nascholing-toevoegen',
  templateUrl: './nascholing-toevoegen.component.html',
  styleUrls: ['./nascholing-toevoegen.component.css']
})
export class NascholingToevoegenComponent implements OnInit {
  items: Observable<any[]>;
  tags: [];
  selectedTags: [];
  submitted: boolean = false;
  admin:boolean=false;
 uid: string = "";
  username : string ="";
  userobj = {} as any;
  nascholer: boolean = false;
  constructor(public db: AngularFirestore, 
              public snackBar:MatSnackBar,
              public afAuth: AngularFireAuth) {
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
  tagModel = new NewTag();
  formModel = new NewNascholing()
  
  ngOnInit() {
    this.items = this.db.collection('nascholingen-tags').valueChanges();
    this.items.subscribe(val => {this.tags = val})

  this.selectedTags = [];

  }
  selectTag(tag) {
    console.log("just clicked " + tag)
    if (this.selectedTags.indexOf(tag)> -1)
      {
        this.selectedTags.splice(this.selectedTags.indexOf(tag),1);
      }
      else
      {
        this.selectedTags.push(tag);
      }
      console.log(this.selectedTags)

  }
  addNewTag() {
      console.log(this.tagModel)
      if (!this.tagModel.tagName)
      {
        this.snackBar.open("Vul een goede titel in voor een tag","X",{duration:6000});
        return false;
      }
      this.db.collection('nascholingen-tags').add({name:this.tagModel.tagName})
      this.selectedTags.push(this.tagModel.tagName)
      console.log("added!")
      this.snackBar.open("Nieuwe tag toegevoegd!","X",{duration:6000});
    }


      addNewNascholing() {
      console.log(this.formModel)
      var tags = {};
      for (var i = 0; i < this.selectedTags.length; i++)
        {
          tags[this.selectedTags[i]] = true;
        }
      this.db.collection('nascholingen').add({text:this.formModel.text,
                                              titel:this.formModel.title,
                                              tags:tags,
                                              location:this.formModel.location,
                                              teacher:this.formModel.teacher,
                                              numberParticipants: 0,
                                              date:this.formModel.date})
      
      this.selectedTags = [];
      this.snackBar.open("Nascholing toegevoegd!","X",{duration:6000});
      this.submitted= true;
      console.log("added!")
    }
}