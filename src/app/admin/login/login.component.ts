import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../adminShared/user.service';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {
    email: string;
    password: string;

    constructor(private userSVC: UserService, private router: Router) {}

    login() {
        this.userSVC.login(this.email, this.password);
        this.userSVC.verifyUser();
    }

    signUp() {
        this.router.navigate(['/admin/signup']);
    }

    cancel() {
        this.router.navigate(['']);
    }
}
