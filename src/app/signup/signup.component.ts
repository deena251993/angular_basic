import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm      !:FormGroup;
  constructor(private formBuilder:FormBuilder,private http : HttpClient, private router:Router){}
    ngOnInit(): void {
      this.signupForm = this.formBuilder.group({
        name    : ['', Validators.required],
        email : ['', Validators.required],
        pwd   : ['', Validators.required],
      
      })
    }

  signUp(){
  this.http.post<any>("http://localhost:3000/signup",this.signupForm.value).subscribe(res=>{
    alert("Registered successfully");
    this.signupForm.reset();
    this.router.navigate(['login'])
  },err=>{
    alert("Something went wrong");
  })
  }
}
