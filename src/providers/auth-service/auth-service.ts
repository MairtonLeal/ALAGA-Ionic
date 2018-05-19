import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { User } from './user';



@Injectable()
export class AuthServiceProvider {
  user: Observable<firebase.User>;
  constructor(private angularFireAuth: AngularFireAuth) {
    this.user = angularFireAuth.authState;


  }



  createUser(user: User) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
  }
  signOut() {
    return this.angularFireAuth.auth.signOut();
  }
  signIn(user: User) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  resetPassword(email: string) {
    return this.angularFireAuth.auth.sendPasswordResetEmail(email);
  }
}
