//authservice
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Ilogin, Iregister } from '../interfaces/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { Iresponse } from '../interfaces/idoctor-response';
import { IuserProfile } from '../interfaces/iuser-profile';
@Injectable({
  providedIn: 'root',
})
export class Authservice {
  token: BehaviorSubject<string | boolean>;

  userData: BehaviorSubject<IuserProfile | false>;
  constructor(private _http: HttpClient) {
    this.token = new BehaviorSubject<string | boolean>(localStorage.getItem('token') ?? false);

    this.userData = new BehaviorSubject<IuserProfile | false>(false);
  }

  register(registerData: Iregister): Observable<Iresponse> {
    return this._http.post<Iresponse>(`${environment.BACKEND_URL}/api/user/register`, registerData);
  }

  login(loginData: Ilogin): Observable<Iresponse> {
    return this._http.post<Iresponse>(`${environment.BACKEND_URL}/api/user/login`, loginData);
  }

  setToken(token: string | boolean): void {
    if (typeof token === 'string') {
      localStorage.setItem('token', token);
      this.token.next(token);
    } else {
      localStorage.removeItem('token');
      this.token.next(false);
    }
  }

  loadUserProfileData(): Observable<Iresponse> {
    const currentToken = this.token.value;
    return this._http.get<Iresponse>(`${environment.BACKEND_URL}/api/user/get-profile`, {
      headers: new HttpHeaders({
        token: String(currentToken),
      }),
    });
  }
}
