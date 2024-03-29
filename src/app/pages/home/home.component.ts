import { Component, OnInit } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { AngularFireDatabase } from "@angular/fire/database";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users = [];
  posts = [];
  isLoading = false;

  constructor(private db: AngularFireDatabase,
    private toastr: ToastrService) {
     this.isLoading = true;
     this.db.object('/users').valueChanges().subscribe((obj) => {
       if(obj){
        this.users = Object.values(obj);
        this.isLoading = false;
       } else{
          this.toastr.error("No users found")
          this.users = [];
          this.isLoading = false;
       }
     })

     this.db.object('/posts').valueChanges().subscribe((obj) => {
       if(obj){
         this.posts = Object.values(obj).sort((a, b) => b.date-a.date);  // sort((a, b) => b.date-a.date)
         this.isLoading = false;
       } else{
        this.toastr.error("No posts to display");
        this.posts = [];
        this.isLoading = false;
       }
     })
     }

  ngOnInit(): void {
  }

}
