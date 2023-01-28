import { Component, OnInit } from '@angular/core';
import { PostsModel } from '../services/posts.model';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  posts: Array<PostsModel> = [];

  constructor(private postsService: PostsService) {}
  
  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.postsService.getPosts().subscribe((result) => {
      this.posts = result;
    });
  }
}
