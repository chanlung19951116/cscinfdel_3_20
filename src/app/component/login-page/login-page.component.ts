import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {ApiService} from '../../service/api.service';
import {CommonService} from '../../service/common.service';
import {HttpErrorResponse} from '@angular/common/http';
import {NavService} from '../../service/nav.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {


  constructor(
    private api: ApiService,
    private common: CommonService,
    private navService: NavService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService) {
  }

  username = 'admin';
  password = 'admin';
  return = '';

  ngOnInit() {
    if (this.common.isLoggedIn) {
      this.router.navigate(['/main/Dashboard']);
    }
    this
      .route
      .queryParams
      .subscribe(params => this.return = params['return'] || '/main/Dashboard');
  }

  signup() {
    this.router.navigate(['/auth/signup']);
  }

  login(): void {
    this.spinner.show();

    this.api.auth.login({
      usuarioNmbre: this.username,
      usuarioContrasena: this.password
    }).subscribe(
      (response: any) => {

        if (response.status === 1) {


          this.toastr.success('Login success.<br>Loading modules...', 'Success');
          this.common.isLoggedIn = true;
          this.api.token = response.token;
          this.router.navigate([this.return]);

          this.common.loginData = response;
          this.common.loginData.menuRolList.push({menu: {url: 'Dashboard'}});

          this.navService.updateNavItemsWithMenuListInfo();


        } else {
          this.toastr.error('Invalid username or password.', 'Error');
        }
        this.spinner.hide();
      },
      (err: HttpErrorResponse) => {
        console.log(err);
        this.spinner.hide();
        this.toastr.error('Ha ocurrido un error');
      });
  }

}
