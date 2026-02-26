import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Idoctor } from '../../interfaces/idoctor';
import { DoctorsService } from '../../services/doctors-service';
import { PhotosService } from '../../services/photos-service';
import { CommonModule, CurrencyPipe, LowerCasePipe } from '@angular/common';
import { RelatedDoctors } from '../../components/related-doctors/related-doctors';

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

  daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  docSlots: any[][] = []; // مصفوفة فيها أيام، وكل يوم جواه مواعيد
  slotIndex: number = 0; // اليوم المختار حالياً
  slotTime: string = ''; // الميعاد المختار حالياً

  constructor(
    private activatedRoute: ActivatedRoute,
    private doctorsService: DoctorsService,
    private photosService: PhotosService,
  ) {
    this.verifiedIcon = this.photosService.icons().verifiedIcon;
    this.infoIcon = this.photosService.icons().infoIcon;
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (paramMap) => {
        this.docId = paramMap.get('docId');
        this.doctor();
        console.log(this.docInfo);
      },
    });

    this.getAvailableSlots();
  }
  doctor(): void {
    if (this.docId) {
      this.docInfo = this.doctorsService.doctor(this.docId);
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

        timeSlots.push({
          dateTime: new Date(currentDate),
          time: formattedTime,
        });

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      this.docSlots.push(timeSlots);
    }
  }
}
