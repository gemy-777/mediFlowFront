import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Idoctor } from '../../interfaces/idoctor';
import { DoctorsService } from '../../services/doctors-service';
import { PhotosService } from '../../services/photos-service';
import { CommonModule, CurrencyPipe, LowerCasePipe } from '@angular/common';
import { RelatedDoctors } from '../../components/related-doctors/related-doctors';
import { Authservice } from '../../services/authservice';
import { ToastrService } from 'ngx-toastr';
import { AppointmentService } from '../../services/appointment-service';

@Component({
  selector: 'app-appointment',
  imports: [CurrencyPipe, LowerCasePipe, CommonModule, RelatedDoctors],
  templateUrl: './appointment.html',
  styleUrl: './appointment.css',
})
export class Appointment implements OnInit {
  docId!: string | null;
  docInfo!: Idoctor | null;
  verifiedIcon: string;
  infoIcon: string;
  token!: string | boolean;

  daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  docSlots: any[][] = []; // مصفوفة فيها أيام، وكل يوم جواه مواعيد
  slotIndex: number = 0; // اليوم المختار حالياً
  slotTime: string = ''; // الميعاد المختار حالياً

  constructor(
    private activatedRoute: ActivatedRoute,
    private photosService: PhotosService,
    private auth: Authservice,
    private toastr: ToastrService,
    private router: Router,
    private appointmentService: AppointmentService,
    private doctorService: DoctorsService,
    private cdr: ChangeDetectorRef,
  ) {
    this.verifiedIcon = this.photosService.icons().verifiedIcon;
    this.infoIcon = this.photosService.icons().infoIcon;
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (paramMap) => {
        this.docId = paramMap.get('docId');
        //to avoid empty page
        this.doctorService.allDoctors.subscribe((docs) => {
          if (docs && docs.length > 0) {
            this.doctor();
            if (this.docInfo) {
              this.getAvailableSlots();
              this.cdr.detectChanges();
            }
          } else {
            this.doctorService.getDoctorsData().subscribe();
          }
        });
      },
    });
    this.token = this.auth.token.value;
  }
  doctor(): void {
    if (this.docId) {
      this.docInfo = this.doctorService.doctor(this.docId);
    }
  }

  getAvailableSlots() {
    this.docSlots = [];
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      // ضبط وقت البداية
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10, 0, 0, 0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });
        //  start 10:50
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + '_' + month + '_' + year;
        const slotTime = formattedTime;
        const isSlotAvailable =
          this.docInfo?.slots_booked?.[slotDate] &&
          this.docInfo.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;

        if (isSlotAvailable) {
          //add slot to array
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }
        //  end 10:50
        //increment current time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      this.docSlots.push(timeSlots);
    }
  }

  bookAppointment() {
    if (!this.token) {
      this.toastr.warning('Login to book appointment');
      this.router.navigateByUrl('/login');
      return;
    }

    // التأكد من اختيار وقت
    if (!this.slotTime) {
      this.toastr.info('Please select a time slot');
      return;
    }
    const date = this.docSlots[this.slotIndex][0].datetime;
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    const slotDate = day + '_' + month + '_' + year;
    console.log(slotDate);
    if (this.docId && slotDate && this.slotTime) {
      this.appointmentService
        .bookAppointment({ docId: this.docId, slotDate, slotTime: this.slotTime })
        .subscribe({
          next: (res) => {
            if (res.success) {
              this.toastr.success(res.message);
              this.doctorService.getDoctorsData().subscribe();
              this.router.navigate(['/my-appointments']);
            } else {
              this.toastr.error(res.message);
            }
          },
          error: (error) => {
            console.log(error);
            this.toastr.error(error.message);
          },
        });
    }
  }
}
