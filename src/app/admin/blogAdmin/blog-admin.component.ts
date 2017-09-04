import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { UserService } from '../adminShared/user.service';
import { Blog } from '../adminShared/blog';
import { BlogAdminService } from '../adminShared/blog-admin.service';

@Component({
    templateUrl: './blog-admin.component.html',
    styleUrls: ['./blog-admin.component.css']
})

export class BlogAdminComponent implements OnInit {
    user: string;
    menuChoice: string;
    posts: Blog[];
    formDisplay: boolean = true;
    singlePost: Blog;

    constructor(
        private userSVC: UserService,
        private router: Router,
        private blogAdminSVC: BlogAdminService
    ) {}

    ngOnInit() {
        this.user = this.userSVC.loggedInUser;
        this.getPosts();
    }

    logout() {
        this.userSVC.logout();
        this.router.navigate(['']);
    }

    chooseMode(mode: string) {
        this.menuChoice = mode;
    }

    getPosts() {
        const dbRef = firebase.database().ref('blogPosts/');
        dbRef.once('value')
            .then((snapshot) => {
                if (!snapshot.val()) return;
                const tmp: string[] = snapshot.val();
                this.posts = Object.keys(tmp).map(key => tmp[key]);
            })
    }

    editPost(post: Blog) {
        this.singlePost = post;
        this.formDisplay = false;
    }

    cancelEdit() {
        this.formDisplay = true;
    }

    updatePost(post: Blog) {
        this.blogAdminSVC.editPost(post);
        this.formDisplay = true;
    }

    deletePost(post: Blog) {
        if (confirm('Are you sure you want to delete this post?')) {
            this.blogAdminSVC.removePost(post);
            this.router.navigate(['/admin/']);
        }
    }
}
