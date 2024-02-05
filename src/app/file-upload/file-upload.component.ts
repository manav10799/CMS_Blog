import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { FileContents } from '../services/posts.model';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  constructor(private fileService: PostsService){}

  ngOnInit(): void {
    this.getFiles();
  }

  selectedFile: File | null = null;
  files: FileContents[] = [];

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    if (this.selectedFile) {
      this.fileService.fileUpload(this.selectedFile).subscribe(res => {
        console.log('Uploaded Successfully');
      }, (error) => { 
        console.log('Upload Failed');
      }
      )
    } else {
      console.error('No file selected');
    }
  }

  getFiles() {
    this.fileService.getFiles().subscribe(res => {
      this.files = res.fileContents.map((res:any) => res.filename);
    });
  }
}
