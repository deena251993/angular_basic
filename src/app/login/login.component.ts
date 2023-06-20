import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

loginForm      !:FormGroup;
constructor(private formBuilder:FormBuilder,private http : HttpClient, private router:Router){}

ngOnInit(): void {
     this.loginForm = this.formBuilder.group({
        email : ['', Validators.required],
        pwd   : ['', Validators.required] 
     })
}

 logIn(){
    this.http.get<any>("http://localhost:3000/signup").subscribe(res=>{
  //match Email and Password
      const user = res.find((a:any)=>{
        return a.email === this.loginForm.value.email && a.pwd === this.loginForm.value.pwd
      })
  //condition for Login
      if(user){
        alert('Logged in successfully' );
        this.loginForm.reset();
        this.router.navigate(['student']);
      }else{
        alert('Email & password mismatch' );
      }
    },err=>{
      alert("Something went wrong");
    })
   
}

}
