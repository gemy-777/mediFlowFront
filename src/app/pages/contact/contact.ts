import { Component } from '@angular/core';
import { PhotosService } from '../../services/photos-service';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  contactImg: string;

  constructor(private photosService: PhotosService) {
    this.contactImg = this.photosService.pages().contactImg;
  }
}
