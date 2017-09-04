import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Blog } from '../adminShared/blog';
import { BlogAdminService } from '../adminShared/blog-admin.service';

@Component({
    selector: 'add-menu',
    templateUrl: './blog-add.component.html',
    styleUrls: ['./blog-add.component.css']
})

export class BlogAddComponent {
    imgTitle: string;
    imgSrc: string;
    postTitle: string;
    content: string;
    post: Blog;

    constructor(private blogAdminSCV: BlogAdminService, private router: Router) {}

    fileLoad($event: any) {
        const myReader: FileReader = new FileReader();
        const file: File = $event.target.files[0];
        this.imgTitle = file.name;
        myReader.readAsDataURL(file);

        myReader.onload = (e: any) => {
            this.imgSrc = e.target.result;
        }
    }

    createPost() {
        this.post = new Blog(
            this.postTitle,
            this.content,
            this.imgTitle,
            this.imgSrc.substring(22)
        );
        this.blogAdminSCV.createPost(this.post);
        alert(`${this.postTitle} added to posts`);
        this.router.navigate(['/admin']);
    }

    cancel() {
        this.router.navigate(['/admin']);
    }
}
