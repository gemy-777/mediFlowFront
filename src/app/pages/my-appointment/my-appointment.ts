import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { DoctorsService } from '../../services/doctors-service';
import { JsonPipe, SlicePipe } from '@angular/common';
import { Idoctor } from '../../interfaces/idoctor';
import { AppointmentService } from '../../services/appointment-service';
import { ToastrService } from 'ngx-toastr';
import { Iappointmets } from '../../interfaces/appointmets';
import { Authservice } from '../../services/authservice';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-my-appointment',
  imports: [],
  templateUrl: './my-appointment.html',
  styleUrl: './my-appointment.css',
})
export class MyAppointment implements OnInit {
  appointments = signal<Iappointmets[]>([]);

  months = [
    '',
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  constructor(
    private doctorsService: DoctorsService,
    private apointtmentsService: AppointmentService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private auth: Authservice,
  ) {}
  ngOnInit(): void {
    this.getUserAppointemants();
  }
  slotDateFormat(slotDate: string): string {
    console.log('slotDate', slotDate);
    const dateArray = slotDate.split('_');
    return dateArray[0] + ' ' + this.months[Number(dateArray[1])] + ' ' + dateArray[2];
  }

  getUserAppointemants() {
    this.apointtmentsService.getUserAppointemants().subscribe({
      next: (res) => {
        console.log('getUserAppointemants', res);
        if (res.success && res.appointments) {
          this.appointments.set(res.appointments.reverse() as Iappointmets[]);
          this.cdr.detectChanges();
          console.log('this.appointments', this.appointments());
        }
      },
      error: (err) => {
        this.toastr.error(err.message);
      },
    });
  }

  cancelAppointment(appointmentsId: string) {
    this.apointtmentsService.cancelAppointment(appointmentsId).subscribe({
      next: (res) => {
        this.toastr.success(res.message);
        this.getUserAppointemants();
      },
      error: (error) => {
        this.toastr.error(error.message);
      },
    });
  }

  payOnline(appointmentId: string) {
    this.apointtmentsService.payOnline(appointmentId, String(this.auth.token.value)).subscribe({
      next: (res) => {
        if (res.success) {
          const iframeId = environment.PAYMOB_IFRAME_ID;
          const iframeUrl = `https://accept.paymob.com/api/acceptance/iframes/${iframeId}?payment_token=${res.paymentToken}`;

          const paymentWindow = window.open(iframeUrl, '_blank', 'width=600,height=800');

          // --- الحل الجديد: اسمع الرسالة من الـ Popup ---
          const messageListener = (event: MessageEvent) => {
            // تأكد إن الرسالة جاية من الـ ngrok بتاعك للأمان
            if (event.data.type === 'PAYMENT_DONE') {
              console.log('لقطت الرسالة، بقفل النافذة وبأكد الحجز...');

              if (paymentWindow) paymentWindow.close(); // اقفل النافذة
              window.removeEventListener('message', messageListener); // شيل السامع

              this.verifyStatus(event.data.success, event.data.orderId); // أكد في الباك إند
            }
          };

          window.addEventListener('message', messageListener);
        }
      },
    });
  }

  verifyStatus(success: boolean, paymobOrderId: string) {
    this.apointtmentsService
      .verifyPayment(success, paymobOrderId, String(this.auth.token.value))
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.toastr.success('Payment Verified Successfully! ✅');
            this.getUserAppointments(); // تحديث القائمة
          }
        },
      });
  }

  getUserAppointments() {
    /* كود تحديث اللستة */
  }
}
