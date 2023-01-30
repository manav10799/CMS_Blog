import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AddPostModel } from 'src/app/services/posts.model';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-individual-post',
  templateUrl: './individual-post.component.html',
})
export class IndividualPostComponent implements OnInit,OnDestroy {

  post: AddPostModel;
  posts: Array<any> = [];
  user: SocialUser = new SocialUser;
  routeId: number;
  modalRef?: BsModalRef;
  comments: Array<any> = [];
  comment:any;

  constructor(private route: ActivatedRoute,
    private modalService: BsModalService,
    private authService: SocialAuthService,
    private postService: PostsService) {
  }
  
  ngOnInit(): void {
    this.posts = JSON.parse(localStorage.getItem('posts') || '{}');
    this.routeId = Number(this.route.snapshot.paramMap.get('id'));
    // this.postService.getIndividualPost(this.routeId).subscribe(res => this.post = res);
    this.post = this.posts.filter((e: any) => e.id === this.routeId)[0];
    this.authService.authState.subscribe(user => {
      this.user = user;
    });
  }

  likeCount() {
    this.post.likeCount++;
  }
 
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,Object.assign({}, { class: 'right-modal-400' }));
  }

  addComment() {
    this.comments.push(this.comment);
    this.posts.filter((e:any) => e.id === this.routeId)[0].comments.push(this.comment);
    this.comment = '';
  }

  ngOnDestroy(){
    localStorage.setItem('posts', JSON.stringify(this.posts));
  }
  
}
