import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../service/auth.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  currentUser?: firebase.default.User | null;

  constructor(private router: Router, public authService: AuthService) {
  }

  ngOnDestroy(): void {
    this.logout()
  }

  ngOnInit(): void {
    this.authService.is_loggedIn().subscribe(user=>{
      this.currentUser = user;
      localStorage.setItem('user', JSON.stringify(this.currentUser));
    }, error => {
      console.error(error)
      localStorage.setItem('user', JSON.stringify('null'))
    })
  }

  login() {
    this.router.navigateByUrl("login")
  }

  home() {
    this.router.navigateByUrl("home")
  }

  logout() {
    this.authService.logout().then(() => this.login()).catch(error => console.error(error))
  }

  signup() {
    this.router.navigateByUrl("signup")
  }
}
