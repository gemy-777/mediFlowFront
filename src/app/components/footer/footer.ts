import { Component } from '@angular/core';
import { PhotosService } from '../../services/photos-service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  logo: string;
  constructor(private photosService: PhotosService) {
    this.logo = this.photosService.logos().logo;
  }
}
