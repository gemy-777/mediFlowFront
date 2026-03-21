import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { DoctorsService } from '../../services/doctors-service';
import { JsonPipe, SlicePipe } from '@angular/common';
import { Idoctor } from '../../interfaces/idoctor';
import { AppointmentService } from '../../services/appointment-service';
import { ToastrService } from 'ngx-toastr';
import { Iappointmets } from '../../interfaces/appointmets';

@Component({
  selector: 'app-my-appointment',
  imports: [],
  templateUrl: './my-appointment.html',
  styleUrl: './my-appointment.css',
})
export class MyAppointment implements OnInit {
  appointments = signal<Iappointmets[]>([]);
  constructor(
    private doctorsService: DoctorsService,
    private apointtmentsService: AppointmentService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.getUserAppointemants();
    this.cdr.detectChanges();
  }
  getUserAppointemants() {
    this.apointtmentsService.getUserAppointemants().subscribe({
      next: (res) => {
        console.log('getUserAppointemants', res);
        if (res.success && res.appointments) {
          this.appointments.set(res.appointments as Iappointmets[]);
          console.log('this.appointments', this.appointments());
        }
      },
      error: (err) => {
        this.toastr.error(err.message);
      },
    });
  }
}
