import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AddComment, AddPostModel } from 'src/app/services/posts.model';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-individual-post',
  templateUrl: './individual-post.component.html',
})
export class IndividualPostComponent implements OnInit,OnDestroy {

  post: AddPostModel;
  // posts: Array<any> = [];
  user: SocialUser = new SocialUser;
  routeId: any;
  modalRef?: BsModalRef;
  comments: Array<AddComment> = [];
  comment:any;

  constructor(private route: ActivatedRoute,
    private modalService: BsModalService,
    private authService: SocialAuthService,
    private postService: PostsService) {
  }
  
  ngOnInit(): void {
    this.routeId = this.route.snapshot.paramMap.get('id');
    this.postService.getIndividualPost(this.routeId).subscribe(res => {
      this.post = res[0];
      if(this.post) {
        this.getComments(this.post.id);
      }
    });
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

  getComments(id:any) {
    this.postService.getComments(id).subscribe(res => {
        this.comments = res.sort((a:any,b:any) => moment(b.date).valueOf() - moment(a.date).valueOf());
    })
  }

  addComment() {
    const comment = new AddComment({});
    comment.id = this.post.id;
    comment.comments = this.comment;
    comment.author = this.user.name;
    comment.date = new Date();
    comment.profileImage = this.user.photoUrl;
    comment.email = this.user.email;
    comment.identifier =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + (new Date()).getTime().toString(36);
    this.comments.push(comment);
    this.postService.addComments(comment).subscribe(res => {
        if(res) {
          this.comment = '';
        }
    })
  } 

  getDateTimeDiff(current:Date) {
    let date1 = moment(current);
    let date2 = moment(new Date());
    return date2.diff(date1, 'days') === 0 ? date2.diff(date1,'minutes') > 60 ? date2.diff(date1,'hours') + " hours ago": date2.diff(date1,'minutes') + " minutes ago"  : date2.diff(date1, 'days') + " days ago";
  }

  notificationService(type:any, text:any) {
    const toasts = document.querySelector('#toasts') as HTMLElement;
    const notificationService = document.createElement('div');
    notificationService.classList.add('notificationService', type);
    notificationService.innerText = text;
    toasts.appendChild(notificationService);
    notificationService.addEventListener('click',()=> {
      notificationService.remove();
    })
        
    setTimeout(() => {
      notificationService.remove()
    }, 3000);
  }

  copyUrl() {
    let url = window.location.href;
    navigator.clipboard.writeText(url).then(
      () => {
        this.notificationService('success','Text Copied Successfuly');
      }
    );
  }

  deleteComment(id:any) {
    this.postService.deleteComments(id).subscribe(res => {
      if (res) {
        this.notificationService('success','Comment Deleted Successfully');
        this.comments = this.comments.filter(ide => ide.identifier != id);
      }
    });
  }

  ngOnDestroy(){
    this.postService.updateLikeCount(this.post.id, this.post).subscribe(res => {
      if(res) {

      }
    })
  }
  
}
