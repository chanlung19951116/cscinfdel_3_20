import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CommonService} from '../../service/common.service';
import {ApiService} from '../../service/api.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(
    public router: Router,
    public common: CommonService,
    public api: ApiService
  ) {
  }

  ngOnInit() {
  }

  onLogout() {
    this.common.isLoggedIn = false;
    this.api.token = '';
    this.router.navigate(['/auth/login']);
  }
}
