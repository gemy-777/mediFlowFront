import { Component } from '@angular/core';
import { PhotosService } from '../../services/photos-service';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  aboutImage: string;
  constructor(private photosService: PhotosService) {
    this.aboutImage = this.photosService.pages().aboutImage;
  }
}
