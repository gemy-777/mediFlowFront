import { Component, Input } from '@angular/core';
import { Idoctor } from '../../interfaces/idoctor';
import { DoctorsService } from '../../services/doctors-service';
import { RelatedDoctorsPipe } from '../../../pipes/related-doctors-pipe';
import { CommonModule, SlicePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-related-doctors',
  imports: [RelatedDoctorsPipe, SlicePipe, RouterLink, CommonModule],
  templateUrl: './related-doctors.html',
  styleUrl: './related-doctors.css',
})
export class RelatedDoctors {
  @Input({ required: true }) docId!: string;
  @Input({ required: true }) speciality!: string;
  doctors: Idoctor[];
  constructor(private doctorService: DoctorsService) {
    this.doctors = this.doctorService.doctors();
  }
}
