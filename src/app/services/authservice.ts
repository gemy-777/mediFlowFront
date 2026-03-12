//authservice
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Ilogin, Iregister } from '../interfaces/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { IdoctorResponse } from '../interfaces/idoctor-response';
@Injectable({
  providedIn: 'root',
})
export class Authservice {
  token: BehaviorSubject<string | boolean>;
  constructor(private _http: HttpClient) {
    this.token = new BehaviorSubject<string | boolean>(localStorage.getItem('token') ?? false);
  }

  register(registerData: Iregister): Observable<IdoctorResponse> {
    return this._http.post<IdoctorResponse>(
      `${environment.BACKEND_URL}/api/user/register`,
      registerData,
    );
  }

  login(loginData: Ilogin): Observable<IdoctorResponse> {
    return this._http.post<IdoctorResponse>(`${environment.BACKEND_URL}/api/user/login`, loginData);
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
}
