import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostsModel } from '../services/posts.model';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  posts: Array<PostsModel> = [];
  filteredPosts: Array<PostsModel> = [];

  constructor(private postsService: PostsService,
    private router: Router,
    ) {}
  
  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.postsService.getPosts().subscribe((result) => {
      this.filteredPosts = this.posts = result;
    });
  }

  filterPosts(value:any) {
    if(this.filteredPosts) {
      this.filteredPosts = this.posts.filter(p => p.tags.filter(t=> t.match(new RegExp(value.target.value, 'i'))).length || p.title.match(new RegExp(value.target.value, 'i')))
    }
    else {
      this.filteredPosts = this.posts;
    }
  }

}
