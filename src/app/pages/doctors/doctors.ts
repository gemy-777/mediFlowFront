import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DoctorsService } from '../../services/doctors-service';
import { Idoctor } from '../../interfaces/idoctor';
import { JsonPipe, NgClass } from '@angular/common';

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
  filteredDoc!: Idoctor[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private doctorsService: DoctorsService,
    private cdr: ChangeDetectorRef,
  ) {
    this.specialityArray = [
      'General physician',
      'Gynecologist',
      'Dermatologist',
      'Pediatricians',
      'Neurologist',
      'Gastroenterologist',
    ];

    this.doctorsService.getDoctorsData().subscribe({
      next: (res) => {
        this.filteredDoc = res.doctors as Idoctor[];
        this.cdr.detectChanges();
      },
    });
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
      console.log('from doctor.ts', this.doctorsService.doctors());
      this.filteredDoc = this.doctorsService
        .doctors()
        .filter((doc) => doc.speciality === this.specialityParam);
    } else {
      this.doctorsService.getDoctorsData().subscribe({
        next: (res) => {
          console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhh', res.doctors);
          this.filteredDoc = res.doctors as Idoctor[];
        },
      });
      // this.filteredDoc = this.doctorsService.doctors();
    }
  }
  setShowFilter() {
    this.showFilter.update((state) => !state);
  }
}
