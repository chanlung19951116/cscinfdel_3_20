import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../service/api.service';
import {CommonService} from '../../service/common.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  constructor(
    private api: ApiService,
    private common: CommonService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService) {
  }

  username = '';
  password = '';
  confirmPassword = '';

  ngOnInit() {
  }

  signup() {

    if (this.username.length < 3) {
      this.toastr.warning('Username is too short');
      return;
    }

    if (this.password.length < 5) {
      this.toastr.warning('Password is too short');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.toastr.warning('Please enter valid confirm password');
      return;
    }

    this.spinner.show();

    this.api.auth.signup({
      usuarioNmbre: this.username,
      usuarioContrasena: this.password
    }).subscribe(
      (response: any) => {
        this.spinner.hide();
        if (response.status === 1) {
          this.toastr.success('Signup success.', 'Success');
          this.router.navigate(['/auth/login']);
        } else {
          this.toastr.error('Signup error.', 'Error');
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err);
        this.spinner.hide();
        this.toastr.error('Ha ocurrido un error');
      });

  }

  login() {
    this.router.navigate(['/auth/login']);
  }
}
