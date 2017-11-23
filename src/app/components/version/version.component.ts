import { Component, OnInit } from '@angular/core';
import {VersionForDisplay} from '../../models/versionForDisplay';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {VersionService} from '../../services/versionService';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.css']
})
export class VersionComponent implements OnInit {

  emptyFolder = '../assets/img/folder.png';
  fullFolder = '../assets/img/fullFolder.png';
  versions: VersionForDisplay[];
  versionForm: FormGroup;
  errors: any;

  constructor(private versionService: VersionService, private fb: FormBuilder) {
  }

  ngOnInit() {
    // this.getVersions();
    this.createForm();
  }

  getVersions(repositoryId: string) {
    this.versionService.getVersionsForUser(repositoryId).subscribe(data => {
      this.versions = data.body;
    });
  }

  createForm() {
    this.versionForm = this.fb.group({
      'name': new FormControl('', [Validators.minLength(3), Validators.required, Validators.maxLength(30)])
    });
  }

  addRepository() {
    const data = this.versionForm.value;
    this.versionService.addVersionForUser(data, repositoryId).subscribe(resp => {
        this.ngOnInit();
      },
      (err: HttpErrorResponse) => {
        this.errors = err.error;
        console.log(this.errors);
      }
    );
  }

  deleteRepository(versionId: string) {
    this.versionService.deleteRepositoryForUser(versionId, repositoryId).subscribe(
      resp => {
        this.ngOnInit();
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
      }
    );
  }

}
