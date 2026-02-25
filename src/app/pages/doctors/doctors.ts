import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DoctorsService } from '../../services/doctors-service';
import { Idoctor } from '../../interfaces/idoctor';

@Component({
  selector: 'app-doctors',
  imports: [RouterLink],
  templateUrl: './doctors.html',
  styleUrl: './doctors.css',
})
export class Doctors implements OnInit {
  speciality: string | null = null;
  filteredDoc: Idoctor[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private doctorsService: DoctorsService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (paramMap) => {
        this.speciality = paramMap.get('speciality');
        this.setFiltrerDoc();
      },
    });
  }
  setFiltrerDoc(): void {
    if (this.speciality) {
      this.filteredDoc = this.doctorsService
        .doctors()
        .filter((doc) => doc.speciality === this.speciality);
    } else {
      this.filteredDoc = this.doctorsService.doctors();
    }
  }
}
