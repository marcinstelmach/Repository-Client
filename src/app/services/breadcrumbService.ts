import {Injectable} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BreadModel} from '../models/breadModel';

@Injectable()
export class BreadcrumbService {
  public breadCrumbs: BreadModel[];
  public test: any;
  constructor(private activatedRoute: ActivatedRoute) {
    this.breadCrumbs = [];
  }

  private createCrumbs() {
    this.test = this.activatedRoute.url;
  }

}
