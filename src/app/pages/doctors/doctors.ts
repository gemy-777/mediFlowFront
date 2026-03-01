import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DoctorsService } from '../../services/doctors-service';
import { Idoctor } from '../../interfaces/idoctor';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-doctors',
  imports: [RouterLink, NgClass],
  templateUrl: './doctors.html',
  styleUrl: './doctors.css',
})
export class Doctors implements OnInit {
  showFilter = signal(false);
  specialityParam: string | null = null;
  specialityArray: string[];
  filteredDoc: Idoctor[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private doctorsService: DoctorsService,
  ) {
    this.specialityArray = [
      'General physician',
      'Gynecologist',
      'Dermatologist',
      'Pediatricians',
      'Neurologist',
      'Gastroenterologist',
    ];
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (paramMap) => {
        this.specialityParam = paramMap.get('speciality');
        this.setFiltrerDoc();
      },
    });
  }
  setFiltrerDoc(): void {
    if (this.specialityParam) {
      this.filteredDoc = this.doctorsService
        .doctors()
        .filter((doc) => doc.speciality === this.specialityParam);
    } else {
      this.filteredDoc = this.doctorsService.doctors();
    }
  }
  setShowFilter() {
    this.showFilter.update((state) => !state);
  }
}
