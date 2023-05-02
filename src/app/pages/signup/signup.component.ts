import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/service/auth.service";
import {User} from "../../shared/model/user";
import {UserService} from "../../shared/service/user.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm: FormGroup = new FormGroup({
    username: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
    password2: new FormControl("", [Validators.required]),
  });

  constructor(private authservice: AuthService, private userService: UserService) {

  }

  signUp() {
    if (this.signupForm.controls["password"].value !== this.signupForm.controls["password2"].value) {
      console.log("Elkurtuk, nem kicsit nagyon")
      return;
    }
    this.authservice.signUp(this.signupForm.controls["email"].value, this.signupForm.controls["password"].value).then(cred => {
      const user: User = {
        id: cred.user?.uid as string,
        email: this.signupForm.controls["email"].value,
        username: this.signupForm.controls["username"].value,
        access: 0
      }
      this.userService.create(user).then(() => console.log("Hozzá lettél adva")).catch(error => console.error(error))
    }).catch(error => console.error(error))
  }
}
