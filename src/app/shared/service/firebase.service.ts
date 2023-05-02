import { Injectable } from '@angular/core';
import {Blog} from "../model/blog";
import {AngularFirestore, Query} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";
import firebase from "firebase/compat";
import CollectionReference = firebase.firestore.CollectionReference;

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: AngularFirestore) { }

  async add(collectionName: string, data: Blog, id?: string): Promise<string> {
    const uid = id ? id : this.firestore.createId();
    data.id = uid;
    await this.firestore.collection(collectionName).doc(uid).set(data);
    return uid;
  }

  getBlogs(): Observable<Blog[]> {
    return this.firestore.collection("Blogs", ref => {
      let query: CollectionReference | Query = ref;
      query = query.orderBy("title", "asc")
      return query;
    }).valueChanges() as Observable<Blog[]>;
  }

  update(collectionName: string, id: string, data: Blog) {
    return this.firestore.collection(collectionName).doc(id).update(data);
  }

  delete(collectionName: string, id: string) {
    return this.firestore.collection(collectionName).doc(id).delete();
  }
}
