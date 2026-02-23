import { Component } from '@angular/core';
import { Ispeciality } from '../../interfaces/ispeciality';
import { RouterLink } from '@angular/router';
import { Photos } from '../../services/photos';

@Component({
  selector: 'app-speciality-menu',
  imports: [RouterLink],
  templateUrl: './speciality-menu.html',
  styleUrl: './speciality-menu.css',
})
export class SpecialityMenu {
  specialityData: Ispeciality[];
  constructor(private photos: Photos) {
    this.specialityData = this.photos.specialityData();
  }
}
