import {Component, EventEmitter, OnInit} from '@angular/core';
import {FileForDisplay} from '../../models/fileForDisplay';
import {FormBuilder} from '@angular/forms';
import {FileService} from '../../services/fileService';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {humanizeBytes, UploadFile, UploadInput, UploadOutput} from 'ngx-uploader';
import {AuthService} from '../../services/authService';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {

  fileImg = '../assets/img/file.png';
  files: FileForDisplay[];
  errors: any;
  repositoryId: string;
  versionId: string;
  filesUpload: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;
  userId: string;

  constructor(private fileService: FileService, private fb: FormBuilder, private router: Router, private authService: AuthService) {
    const splitedUrl = this.router.url.split('/');
    this.repositoryId = splitedUrl[2];
    this.versionId = splitedUrl[4];
    this.filesUpload = [];
    this.uploadInput = new EventEmitter<UploadInput>();
    this.humanizeBytes = humanizeBytes;
    this.userId = authService.getUserId();
  }

  ngOnInit() {
    this.getFiles();
  }

  getFiles() {
    this.fileService.getFiles(this.repositoryId, this.versionId).subscribe(data => {
      this.files = data.body;
    });
  }


  deleteFile(fileId: string) {
    this.fileService.deleteFile(this.repositoryId, this.versionId, fileId).subscribe(
      resp => {
        this.ngOnInit();
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
      }
    );
  }

  onUploadOutput(output: UploadOutput): void {
    if (output.type === 'allAddedToQueue') {
      const event: UploadInput = {
        type: 'uploadAll',
        url: 'http://localhost:44986/api/users/' + this.userId + '/repositories/' + this.repositoryId + '/versions/' + this.versionId + '/files/',
        headers: {'Authorization': 'Bearer ' + this.authService.getToken()},
        method: 'POST',
        data: {foo: 'bar'}
      };
      this.uploadInput.emit(event);
      this.getFiles();
    }
  }

  downloadFile(fileId: string) {

  }
}
