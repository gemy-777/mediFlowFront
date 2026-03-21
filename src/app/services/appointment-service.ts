import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Authservice } from './authservice';
import { Observable } from 'rxjs';
import { Iresponse } from '../interfaces/idoctor-response';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  constructor(
    private _http: HttpClient,
    private auth: Authservice,
  ) {}
  bookAppointment(bookingData: {}): Observable<Iresponse> {
    const currentToket = this.auth.token.value;
    return this._http.post<Iresponse>(
      `${environment.BACKEND_URL}/api/user/book-appointment`,
      bookingData,
      {
        headers: new HttpHeaders({
          token: String(currentToket),
        }),
      },
    );
  }
  getUserAppointemants(): Observable<Iresponse> {
    const currentToken = this.auth.token.value;
    return this._http.get<Iresponse>(`${environment.BACKEND_URL}/api/user/appointment`, {
      headers: new HttpHeaders({
        token: String(currentToken),
      }),
    });
  }
}
