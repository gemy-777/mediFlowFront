import { Component, inject } from '@angular/core';
import { DoctorsService } from '../../services/doctors-service';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-my-appointment',
  imports: [SlicePipe],
  templateUrl: './my-appointment.html',
  styleUrl: './my-appointment.css',
})
export class MyAppointment {
  doctorsService = inject(DoctorsService);
  allDoctors = this.doctorsService.doctors();
}
