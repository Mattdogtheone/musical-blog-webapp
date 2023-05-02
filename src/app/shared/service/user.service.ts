import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  collection_name: string = 'Users'
  constructor(private afs: AngularFirestore) {

  }

  create(user: User){
    return this.afs.collection<User>(this.collection_name).doc(user.id).set(user);
  }

  get_all(){
    return this.afs.collection<User>(this.collection_name).valueChanges()
  }

  get_by_username(username: string){
    return this.afs.collection<User>(this.collection_name, ref => ref.where("username", "==", username).limit(1)).valueChanges()
  }

  get_by_id(id: string){
    return this.afs.collection<User>(this.collection_name).doc(id).valueChanges()
  }

}
