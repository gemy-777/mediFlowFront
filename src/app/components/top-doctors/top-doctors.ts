import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DoctorsService } from '../../services/doctors-service';
import { Idoctor } from '../../interfaces/idoctor';
import { SlicePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-top-doctors',
  imports: [SlicePipe, RouterLink],
  templateUrl: './top-doctors.html',
  styleUrl: './top-doctors.css',
})
export class TopDoctors implements OnInit {
  doctors!: Idoctor[];
  constructor(
    private doctorsService: DoctorsService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
  ) {
    // this.doctors = this.doctorsService.doctors();
  }
  ngOnInit(): void {
    this.doctorsService.getDoctorsData().subscribe({
      next: (res) => {
        if (res.success && res.doctors) {
          console.log('form top doctors');
          // console.log(res.doctors);
          this.doctors = res.doctors;
          this.cdr.detectChanges();
        } else {
          this.toastr.error(res.message);
        }
      },
      error: (error) => {
        this.toastr.error(error.message);
      },
    });
  }
}
