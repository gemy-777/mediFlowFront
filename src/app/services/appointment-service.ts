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
  // استخدم رابط الـ ngrok بتاعك هنا للباك إند
  private backendUrl = 'https://unfeeding-congenially-ardella.ngrok-free.dev';
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
  cancelAppointment(appointmentId: string): Observable<Iresponse> {
    const currentToken = this.auth.token.value;
    return this._http.post<Iresponse>(
      `${environment.BACKEND_URL}/api/user/cancel-appointment`,
      { appointmentId },
      {
        headers: new HttpHeaders({ token: String(currentToken) }),
      },
    );
  }

  payOnline(appointmentId: string, token: string) {
    const headers = new HttpHeaders().set('token', token);
    return this._http.post<any>(
      `${this.backendUrl}/api/user/payment-paymob`,
      { appointmentId },
      { headers },
    );
  }

  // response from node is text

  verifyPayment(success: boolean, paymobOrderId: string, token: string) {
    const headers = new HttpHeaders().set('token', token);

    return this._http.post<any>(
      `${this.backendUrl}/api/user/verify`,
      { success, order: paymobOrderId },
      {
        headers,
        responseType: 'text' as 'json', // <--- السطر ده هو "الضربة القاضية"
      },
    );
  }

  // verifyPayment(success: boolean, appointmentId: string, token: string) {
  //   const headers = new HttpHeaders().set('token', token);
  //   return this._http.post<any>(
  //     `${this.backendUrl}/api/user/verifyPaymob`,
  //     { success, appointmentId },
  //     { headers },
  //   );
  // }

  // verifyPayment(success: boolean, paymobOrderId: string, token: string) {
  //   const headers = new HttpHeaders().set('token', token);
  //   // بنبعت رقم الأوردر اللي سحبناه من الـ URL باسم "order" عشان الـ Controller يلقطه
  //   return this._http.post<any>(
  //     `${this.backendUrl}/api/user/verify`,
  //     { success, order: paymobOrderId },
  //     { headers },
  //   );
  // }
}
