import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { AddComment, AddPostModel } from "./posts.model";
import { environment } from "src/environments/environments";
// import io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  apiUrl = environment.apiUrl;
  // socket = io(`${this.apiUrl}`,{withCredentials: true});

  getPosts():Observable<any> {
    return this.http.get(`${this.apiUrl}/blogs/posts`);
  }

  // getSocketPosts():Observable<any> {
  //   const obs = new Observable<any>(observer => {
  //     this.socket.on('connection', (data:Observable<any>) => {
  //       observer.next(data);
  //     });
  //   });
  //   return obs;
  // }

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

  deleteComments(id:any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/blogs/comments/${id}`);
  }

}
