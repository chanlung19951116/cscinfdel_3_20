import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public isLoggedIn = false;
  public loginData: any = null;

  constructor() { }
}
