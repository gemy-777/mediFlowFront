import { Component } from '@angular/core';
import { DoctorsService } from '../../services/doctors-service';
import { Idoctor } from '../../interfaces/idoctor';
import { SlicePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-top-doctors',
  imports: [SlicePipe, RouterLink],
  templateUrl: './top-doctors.html',
  styleUrl: './top-doctors.css',
})
export class TopDoctors {
  doctors: Idoctor[];
  constructor(private doctorsService: DoctorsService) {
    this.doctors = this.doctorsService.doctors();
  }
}
