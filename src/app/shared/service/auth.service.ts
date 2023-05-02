import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) {
  }

  login(email: string, password: string) {
    console.log("fasz")
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  logout() {
    return this.auth.signOut()
  }

  is_loggedIn() {
    return this.auth.user
  }

  signUp(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password)
  }

  currentUserObservable(): any {
    return this.auth.authState;
  }
}
