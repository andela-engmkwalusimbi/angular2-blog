import { Injectable } from '@angular/core';
import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import * as firebase from 'firebase';


@Injectable()
export class UserService implements CanActivate {
    userLoggedIn: boolean = false;
    loggedInUser: string;
    authUser: any;

    constructor(private router: Router) {
        firebase.initializeApp({
            apiKey: "AIzaSyA2lvB-vDFvK3ybWMNUlYwHlN0Ozqp6d9I",
            authDomain: "angular-2-blog.firebaseapp.com",
            databaseURL: "https://angular-2-blog.firebaseio.com",
            projectId: "angular-2-blog",
            storageBucket: "angular-2-blog.appspot.com",
            messagingSenderId: "943079467188"
        });
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const url: string = state.url;
        return this.verifyLogin(url);
    }

    verifyLogin(url: string): boolean {
        if (this.userLoggedIn) return true;
        this.router.navigate(['/admin/login'])
        return false;
    }

    register(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(error => alert(`${error.message} Please Try Again`));
    }

    verifyUser() {
        this.authUser = firebase.auth().currentUser;
        if (this.authUser) {
            alert(`Welcome ${this.authUser.email}`);
            this.loggedInUser = this.authUser.email;
            this.userLoggedIn = true;
            this.router.navigate(['/admin']);
        }
    }

    login(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .catch(error => alert(`${error.message} Unable to login. Try again`));
    }

    logout() {
        firebase.auth().signOut()
            .then(() => {
                this.userLoggedIn = false;
                alert('Logged out');
            })
            .catch(error => alert(`${error.message} Unable to logout. Try again`));
    }
}
