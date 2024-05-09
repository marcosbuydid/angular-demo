import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Auth } from '../models/auth';
import { CoreService } from './core.service';
import { Token } from '../models/token';

@Injectable()
export class AuthService extends CoreService {
  protected readonly basePath = 'session';

  constructor(http: HttpClient, toastr: ToastrService, router: Router) {
    super(http, toastr, router);
  }

  auth(auth: Auth): Observable<Token> {
    return this.post<Auth, Token>(this.basePath, auth);
  }
}
