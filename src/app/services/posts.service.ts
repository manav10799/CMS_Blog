import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { AddComment, AddPostModel } from "./posts.model";
import { environment } from "src/environments/environments";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  apiUrl = environment.apiUrl;
  getPosts():Observable<any> {
    return this.http.get(`${this.apiUrl}/blogs/posts`);
  }

  addPosts(posts: AddPostModel):Observable<any> {
    return this.http.post(`${this.apiUrl}/blogs/posts`, posts)
  }

  getIndividualPost(id:any):Observable<any> {
    return this.http.get(`${this.apiUrl}/blogs/posts/${id}`);
  }

  addComments(comment:AddComment):Observable<any> {
    return this.http.post(`${this.apiUrl}/blogs/comments`,comment);
  }

  getComments(id:any):Observable<any> {
    return this.http.get(`${this.apiUrl}/blogs/comments/${id}`);
  }

  updateLikeCount(id:any, post:AddPostModel): Observable<any> {
    return this.http.put(`${this.apiUrl}/blogs/posts/${id}`,post);
  }

}
