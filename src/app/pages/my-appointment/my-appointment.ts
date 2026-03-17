import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { DoctorsService } from '../../services/doctors-service';
import { SlicePipe } from '@angular/common';
import { Idoctor } from '../../interfaces/idoctor';

@Component({
  selector: 'app-my-appointment',
  imports: [SlicePipe],
  templateUrl: './my-appointment.html',
  styleUrl: './my-appointment.css',
})
export class MyAppointment implements OnInit {
  doctorsService = inject(DoctorsService);
  cdr = inject(ChangeDetectorRef);
  allDoctors!: Idoctor[];
  ngOnInit(): void {
    this.doctorsService.getDoctorsData().subscribe((res) => {
      if (res.success && res.doctors) {
        this.allDoctors = res.doctors;
        this.cdr.detectChanges();
      }
    });
  }
}
