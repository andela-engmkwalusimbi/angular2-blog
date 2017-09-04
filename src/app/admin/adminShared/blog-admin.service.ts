import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Blog } from './blog';

@Injectable()
export class BlogAdminService {
    createPost(post: Blog) {
        const storageRef = firebase.storage().ref();
        return storageRef.child(`images/${post.imgTitle}`).putString(post.img, 'base64')
            .then((snapshot) => {
                const url = snapshot.metadata.downloadURLs[0];
                const dbRef = firebase.database().ref('blogPosts/');
                const newPost = dbRef.push();
                newPost.set({
                    title: post.title,
                    content: post.content,
                    imgTitle: post.imgTitle,
                    img: url,
                    id: newPost.key
                });
            })
            .catch(error => alert(`${error.message} failed upload`));
    }

    editPost(post: Blog) {
        firebase.database().ref('blogPosts/').child(post.id)
            .update({
                title: post.title,
                content: post.content
            });
        alert('post updated');
    }

    removePost(post: Blog) {
        firebase.database().ref('blogPosts/').child(post.id).remove();
        firebase.storage().ref().child(`images/${post.imgTitle}`)
            .delete()
            .then(() => alert(`${post.title} deleted from storage`))
            .catch(() => alert(`Error - unable to delete ${post.title}`));
    }
}