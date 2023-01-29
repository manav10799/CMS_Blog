import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { AddPostModel, AddTags, PostsModel } from "./posts.model";
import { environment } from "src/environments/environments";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  apiUrl = environment.apiUrl;
  getPosts():Observable<any> {
    return this.http.get(`${this.apiUrl}/posts`);
  }

  addPosts(posts: AddPostModel):Observable<any> {
    return this.http.post(`${this.apiUrl}/posts`, posts)
  }

  getIndividualPost(id:number):Observable<any> {
    return this.http.get(`${this.apiUrl}/posts/${id}`);
  }

  updateLikeCount(post:AddPostModel,id:number): Observable<any> {
    return this.http.put(`${this.apiUrl}/posts/${id}`,post);
  }

}
