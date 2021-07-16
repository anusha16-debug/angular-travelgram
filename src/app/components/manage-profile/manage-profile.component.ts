import { Component, OnInit } from '@angular/core';
import { ToastrService } from "ngx-toastr";
//services
import { AuthService } from "src/app/services/auth.service";

//angular form
import { NgForm } from "@angular/forms";
import { AngularFireDatabase } from "@angular/fire/database";
@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.component.html',
  styleUrls: ['./manage-profile.component.css']
})
export class ManageProfileComponent implements OnInit {

  userId = null;
  userInfo = null;
  instaName: string;
  country: string;
  instaBio: string;

  constructor(private auth: AuthService,
    private db: AngularFireDatabase,
    private toastr: ToastrService,) {
      this.auth.getUser().subscribe((user) => {
        if(user){
          this.userId = user.uid;
          this.db.object(`/users/${this.userId}`).valueChanges().subscribe((val)=> {
            if(val){
              this.userInfo = val
            }
          })
        }
        
      })
      
     }

  ngOnInit(): void {
  }

  editInfo(){
   this.db.object(`/users/${this.userId}`).update({
    instaUserName: this.userInfo.instaUserName,
    country: this.userInfo.country,
    bio:this.userInfo.bio
   }).then(() => {
     this.toastr.success('Editted Successfully', '', {
       closeButton: true
     })
   }).catch((err)=>{
    this.toastr.error('Failed to update', '', {
      closeButton: true
    })
   })
  }

}
