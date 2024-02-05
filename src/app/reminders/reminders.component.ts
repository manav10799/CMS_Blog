import { Component } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { AddReminder } from '../services/posts.model';
import { FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
})
export class RemindersComponent {
  reminder: Array<any> = [];
  reminderForm: FormGroup;

  constructor (
  private postService: PostsService,
  private datePipe: DatePipe,
  ){}

  ngOnInit(){
    this.getReminders();
    this.initlizeForm();
  }

  getReminders() {
    this.postService.getReminder().subscribe(data => {
      console.log(data);
    })
  }

  initlizeForm() {
    this.reminderForm = new FormGroup({
      title: new FormControl(''),
      message: new FormControl(''),
      scheduleTime: new FormControl('')
    })
  }

  postReminder() {
    const newReminder = new AddReminder([]);
    newReminder.message = this.reminderForm.get('message')?.value;
    newReminder.title = this.reminderForm.get('title')?.value;
    const transFormTime = new Date(this.reminderForm.get('scheduleTime')?.value);
    newReminder.scheduledTime = this.datePipe.transform(transFormTime,'m H * * *')?.toString();
    this.postService.postReminder(newReminder).subscribe(data => {
      if(data) {
        console.log('Added');
      }
    })
  }

}
