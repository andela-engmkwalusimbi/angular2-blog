import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../adminShared/user.service';

@Component({
    templateUrl: './admin-menu.component.html',
    styleUrls: ['./admin-menu.component.css']
})

export class AdminMenuComponent implements OnInit {
    user: string;

    constructor(private userSVC: UserService, private router: Router) {}

    ngOnInit() {
        this.user = this.userSVC.loggedInUser;
    }

    logout() {
        this.userSVC.logout();
        this.router.navigate(['']);
    }
}
