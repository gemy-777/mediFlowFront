import { Component } from '@angular/core';
import { Ispeciality } from '../../interfaces/ispeciality';
import { RouterLink } from '@angular/router';
import { PhotosService } from '../../services/photos-service';

@Component({
  selector: 'app-speciality-menu',
  imports: [RouterLink],
  templateUrl: './speciality-menu.html',
  styleUrl: './speciality-menu.css',
})
export class SpecialityMenu {
  specialityData: Ispeciality[];
  constructor(private photosService: PhotosService) {
    this.specialityData = this.photosService.specialityData();
  }
}
