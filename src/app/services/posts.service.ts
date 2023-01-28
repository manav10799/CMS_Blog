import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { AddPostModel, AddTags, PostsModel } from "./posts.model";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  getPosts():Observable<any> {
    return this.http.get('http://localhost:3000/posts');
  }

  addPosts(posts: AddPostModel):Observable<any> {
    return this.http.post('http://localhost:3000/posts', posts)
  }
}
