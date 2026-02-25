import { Component } from '@angular/core';
import { PhotosService } from '../../services/photos-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-banner',
  imports: [RouterLink],
  templateUrl: './banner.html',
  styleUrl: './banner.css',
})
export class Banner {
  appointmentImg: string;
  constructor(private photosService: PhotosService) {
    this.appointmentImg = this.photosService.pages().appointmentImg;
    console.log(this.appointmentImg);
  }
}
