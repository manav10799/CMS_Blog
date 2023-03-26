import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddPostModel} from '../services/posts.model';
import { PostsService } from '../services/posts.service';
import io from 'socket.io-client';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
})
export class PostsComponent implements OnInit {
  
  isPostSubmitted: boolean;
  date = new Date();
  hideAddTagsMenu: boolean;
  tags: Array<any> = [];
  categories: Array<any> = [];
  file:any;
  user:any;
  socket:any;
  apiUrl = environment.apiUrl;

  constructor(private postsService: PostsService,
    private socialAuthService: SocialAuthService) {
  }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe(user => {
      if(user) {
        this.user = user;
      }
    });
    this.socket = io(`${this.apiUrl}`);
  }

  postsForm = new FormGroup({
    title: new FormControl(null, Validators.required),
    author: new FormControl(null),
    description: new FormControl(null,Validators.required),
    date: new FormControl(null),
  });
 
  addPosts() {
    let posts = new AddPostModel(this.postsForm.value);
    posts.date = new Date();
    posts.tags.push(...this.tags);
    posts.author = this.user.name;
    posts.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + (new Date()).getTime().toString(36);

      if(this.postsForm.valid) {
      this.postsService.addPosts(posts).subscribe(result => {
        if(result) {
          this.postsForm.reset();
          this.socket.emit('connection',posts);
        }
      })
      // if(!localStorage.getItem('posts')) {
      //   localStorage.setItem('posts', JSON.stringify([posts]));
      //   this.postsForm.reset();
      // }
      // else {
      //   let retrievedArray = JSON.parse(localStorage.getItem('posts') || '{}');
      //   retrievedArray.push(posts);
      //   localStorage.setItem('posts', JSON.stringify(retrievedArray));
      //   this.postsForm.reset();
      // }
    }
  }

  addTags(e:any) {
    if(e.target.value) {
      this.tags.push(e.target.value);
      e.target.value = '';
    }
  } 

  addCategory (e:any) {
    if(e.target.value) {
      this.categories.push(e.target.value);
      e.target.value = '';
    }
  }
}
