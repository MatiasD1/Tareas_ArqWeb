import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword,signInWithPopup } from '@angular/fire/auth';

export interface user{
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _auth = inject(Auth); 
  
  singUp(user: user){
    return createUserWithEmailAndPassword(this._auth,user.email,user.password);
  }
  singIn(user: user){
    return signInWithEmailAndPassword(this._auth, user.email, user.password); 
  }
  signInWithGoogle(){

    const provider = new GoogleAuthProvider();

    provider.setCustomParameters({prompt: 'select_account'})

    return signInWithPopup(this._auth, provider);
  }
}
