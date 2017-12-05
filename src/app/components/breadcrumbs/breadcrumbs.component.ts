import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import 'rxjs/add/operator/filter';
import {BreadcrumbService} from '../../services/breadcrumbService';
import {BreadModel} from '../../models/breadModel';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css'],
  providers: [BreadcrumbService]
})
export class BreadcrumbsComponent implements OnInit {
  public breadCrumbs: BreadModel[];


  constructor(private router: Router) {

  }

  ngOnInit() {
    const url = window.location.pathname;
    const splited = url.split('/');
    console.log(splited);
    let tempPath = '/';

    for (let i = 0; i < splited.length; i++) {
      const crumb: BreadModel = {
        name: splited[i],
        url: tempPath + splited[i],

      };
      console.log(crumb);
    }


    }

    // console.log(this.breadCrumbs);
  }

}
