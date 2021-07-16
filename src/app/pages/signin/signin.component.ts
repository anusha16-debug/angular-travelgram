import { Component, OnInit } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
//services
import { AuthService } from "src/app/services/auth.service";

//angular form
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor( private auth: AuthService,
    private router: Router,private toastr: ToastrService,) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm){
   const {email, password} = f.form.value;
   this.auth.signIn(email, password).then((res)=>{
    this.toastr.success("Logged in Successfully", '', {
      closeButton:true
    })
    this.router.navigateByUrl("/")
   }).catch((err) => {
     this.toastr.error(err.message, '', {
       closeButton:true
     })
   })
  }

}
