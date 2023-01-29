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
    return this.http.get('https://json-server-mauve.vercel.app/posts');
  }

  addPosts(posts: AddPostModel):Observable<any> {
    return this.http.post('https://json-server-mauve.vercel.app/posts', posts)
  }

  getIndividualPost(id:number):Observable<any> {
    return this.http.get(`https://json-server-mauve.vercel.app/posts/${id}`);
  }

  updateLikeCount(post:AddPostModel,id:number): Observable<any> {
    return this.http.put(`https://json-server-mauve.vercel.app/posts/${id}`,post);
  }

}
