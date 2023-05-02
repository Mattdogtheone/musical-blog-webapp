import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/service/auth.service";
import {Blog} from "../../shared/model/blog";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  constructor(private router: Router, private auth: AuthService){

  }

  login(){
    this.auth.login(this.loginForm.controls["email"].value, this.loginForm.controls["password"].value).then((result) => {
      console.log(result)
      this.router.navigate(['/blog'])
    })
  }


}
